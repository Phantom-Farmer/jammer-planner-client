import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createSet, updateSet } from '../utils/data/setData';
import { getSingleBand } from '../utils/data/bandData';
import { getSongsByBand } from '../utils/data/songData';

const initialState = {
  id: 0,
  title: '',
  song: '',
  note: '',
  band: 0,
  author: 0,
};

export default function NewSetForm({ obj, bcId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bandCard, setBandCard] = useState({});
  const [bandNumber, setbandNumber] = useState(null);
  const [songs, setSongs] = useState([]);
  // const [field, setField] = useState({});
  // const [songIds, setSongIds] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [songName, setSongName] = useState('');
  // const [selectBars, setSelectBars] = useState([]);
  const router = useRouter();

  const { user } = useAuth();

  /* const handleSelectSong = (e) => {
    const songId = e.target.value;
    const songTitle = e.target.display;
    // console.warn(e.target.text);
    const selectedOption = { songId, songTitle };
    const currentSelectedOptions = [...selectedOptions];
    setSelectedOptions([...currentSelectedOptions, selectedOption]);
    // const currentSelectedOptions = [...selectedOptions];
    setSongName(songTitle);
  };
  useEffect(() => { console.warn('selectedOptions', selectedOptions); }, [selectedOptions]); */

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
      setbandNumber(obj.band.id);
    } else {
      getSingleBand(bcId).then((bc) => {
        setBandCard(bc);
      });
      getSongsByBand(bcId).then((bandSongs) => {
        setSongs(bandSongs);
      });
    }
  }, [obj]);

  useEffect(() => {
  }, [bandNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const setObj = {
      id: formInput.id,
      title: formInput.title,
      song: formInput.song,
      note: formInput.note,
      author: user.id,
      band: bandNumber,
    };
    if (obj.id) {
      updateSet(setObj, obj.id)
        .then(() => router.push(`/setlist/band/${bandNumber}`));
    } else {
      const payload = {
        ...formInput, author: bandCard.author.id, band: bandCard.id,
      };
      createSet(payload).then(() => {
        router.push(`/setlist/band/${bandCard.id}`);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ padding: '80px' }}>
        <h2 className="text-black mt-5">{obj.id ? 'update' : 'create'} setlist</h2>
        <FloatingLabel controlId="floatingInput2" label="title" className="mb-3">
          <Form.Control type="text" placeholder="TITLE" name="title" value={formInput.title} onChange={handleChange} as="textarea" aria-label="With textarea" required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="add song">
          <Form.Select name="song" value={formInput.song} onChange={handleChange} className="mb-3" required>
            <option disabled value="">
              select a song
            </option>
            {songs.map((s) => <option key={s.id} value={s.title} display={s.title}>{s.title}</option>)}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="note" className="mb-3">
          <Form.Control type="text" placeholder="NOTE" name="note" value={formInput.note} onChange={handleChange} as="textarea" aria-label="With textarea" required />
        </FloatingLabel>
        <Button className="m-4" type="submit">{obj.id ? 'update' : 'create'} setlist</Button>
      </Form>
      {songs.map((s) => <h1 key={s.id} value={s.title}>{s.title}</h1>)}
    </>
  );
}

NewSetForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    song: PropTypes.string,
    note: PropTypes.string,
    author: PropTypes.number,
    band: PropTypes.number,
  }),
  bcId: PropTypes.string,
};

NewSetForm.defaultProps = {
  obj: initialState,
  bcId: '',
};
