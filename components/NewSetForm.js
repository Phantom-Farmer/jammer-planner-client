/* eslint-disable no-lone-blocks */
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
  const selectBarData = Array(5).fill(songs);
  const arrayOfSongIds = Array(5).fill(null);

  const { user } = useAuth();

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
  }, [bandNumber, songs]);

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
      title: formInput.title,
      note: formInput.note,
      author: user.id,
      band: bandNumber,
    };
    if (obj.id) {
      updateSet(setObj, obj.id)
        .then(() => router.push(`/setlist/band/${bandNumber}`));
    } else {
      console.log("we're posting a setisst");
      const payload = {
        author: bandCard.author.id, band: bandCard.id, note: formInput.note, title: formInput.title, songs: arrayOfSongIds,
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
        <FloatingLabel controlId="floatingInput2" label="note" className="mb-3">
          <Form.Control type="text" placeholder="NOTE" name="note" value={formInput.note} onChange={handleChange} as="textarea" aria-label="With textarea" required />
        </FloatingLabel>
        <div>
          {/* map over the array of song arrays, keeping track of the index position
        of the select bar we're creating each time
        */}
          {selectBarData.map((sbd, index) => {
            { /* map over the array of song arrays, keeping track of the index position
        of the select bar we're creating each time
        */ }
            const changeHandler = (e) => {
              arrayOfSongIds[index] = parseInt(e.target.value, 10);
              console.log(arrayOfSongIds);
            };
            return (
              <select onChange={changeHandler}>
                <option value="">Choose a song</option>
                {sbd.map((sbo) => (
                  <option value={sbo.id}>{sbo.title}</option>
                ))}
              </select>
            );
          })}
        </div>
        <Button className="m-4" type="submit">{obj.id ? 'update' : 'create'} setlist</Button>
      </Form>
    </>
  );
}

NewSetForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
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
