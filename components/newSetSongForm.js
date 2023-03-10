import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';
import { createSetSong, updateSetSong } from '../utils/data/setSongData';
import { getSingleBand } from '../utils/data/bandData';
import { getSongsByBand } from '../utils/data/songData';
// import { getSetsByBand } from '../utils/data/setData';

const initialState = {
  id: 0,
  order: '',
  band: 0,
  set: 0,
  song: 0,
};

export default function NewSetSongForm({ obj, bcId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bandCard, setBandCard] = useState({});
  const [bandNumber, setbandNumber] = useState(null);
  // const [setNumber, setSetNumber] = useState(null);
  const [songs, setSongs] = useState([]);
  // const [sets, setSets] = useState([]);
  const router = useRouter();

  // const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
      setbandNumber(obj.band.id);
      // setSetNumber(obj.set.id);
    } else {
      getSingleBand(bcId).then((bc) => {
        setBandCard(bc);
      });
      getSongsByBand(bcId).then((bandSongs) => {
        setSongs(bandSongs);
      });
      /* getSetsByBand(bcId).then((bandSets) => {
        setSets(bandSets);
      }); */
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

    const setSongObj = {
      id: formInput.id,
      order: formInput.order,
      song: formInput.song,
      set: formInput.set,
      band: bandNumber,
    };
    if (obj.id) {
      updateSetSong(setSongObj, obj.id)
        .then(() => router.push(`/setSong/band/${bandNumber}`));
    } else {
      const payload = {
        ...formInput, band: bandCard.id,
      };
      createSetSong(payload).then(() => {
        router.push(`/setlist/band/${bandCard.id}`);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ padding: '80px' }}>
        <h2 className="text-black mt-5">{obj.id ? 'update' : 'choose'} song for this set</h2>
        <FloatingLabel controlId="floatingSelect" label="add song">
          <Form.Select name="song" value={formInput.song} onChange={handleChange} className="mb-3" required>
            <option disabled value="">
              select a song
            </option>
            {songs.map((s) => <option key={s.id} value={s.id} display={s.title}>{s.title}</option>)}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="order number" className="mb-3">
          <Form.Control type="text" placeholder="ORDER" name="order" value={formInput.order} onChange={handleChange} as="textarea" aria-label="With textarea" required />
        </FloatingLabel>
        <Button className="m-4" type="submit">{obj.id ? 'update' : 'add'} song</Button>
      </Form>
    </>
  );
}

NewSetSongForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    order: PropTypes.string,
    set: PropTypes.number,
    song: PropTypes.number,
    band: PropTypes.number,
  }),
  bcId: PropTypes.string,
};

NewSetSongForm.defaultProps = {
  obj: initialState,
  bcId: '',
};

/* <FloatingLabel controlId="floatingSelect" label="add song">
          <Form.Select name="song" value={formInput.song} onChange={handleChange} className="mb-3" required>
            <option disabled value="">
              select a song
            </option>
            {songs.map((s) => <option key={s.id} value={s.title} display={s.title}>{s.title}</option>)}
          </Form.Select>
        </FloatingLabel> */
