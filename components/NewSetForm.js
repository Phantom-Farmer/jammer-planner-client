/* eslint-disable react/forbid-prop-types */
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
  id: '',
  title: '',
  note: '',
  band: '',
  author: '',
};

export default function NewSetForm({ obj, bcId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bandCard, setBandCard] = useState({});
  const [bandNumber, setbandNumber] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectBarData, setSelectBarData] = useState([]);
  const [chosenSetlistSongIds, setChosenSetlistSongIds] = useState([]);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    // edit mode
    if (obj.id) {
      setFormInput(obj);
      setbandNumber(obj.band.id);
      getSongsByBand(obj.band.id).then((bandSongs) => {
        setSongs(bandSongs);
      }).then(() => {
        const existingSetlistSongIds = obj?.songs?.map((s) => s.id);
        setChosenSetlistSongIds(existingSetlistSongIds);
      });
      // create mode
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
    setSelectBarData(Array(5).fill(songs));
  }, [songs]);

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
    console.warn('ddddddddddddd', chosenSetlistSongIds);

    const songIdsToSend = chosenSetlistSongIds.flter((id) => id !== '');
    if (obj.id) {
      setObj.songs = songIdsToSend;
      updateSet(setObj, obj.id)
        .then(() => router.push(`/setlist/band/${bandNumber}`));
    } else {
      const payload = {
        author: bandCard.author.id, band: bandCard.id, note: formInput.note, title: formInput.title, songs: chosenSetlistSongIds,
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
          {selectBarData.map((sbd, index) => {
            const initialValue = chosenSetlistSongIds?.length ? chosenSetlistSongIds[index] : '';
            const changeHandler = (e) => {
              const copyOfChosenSetlistSongIds = chosenSetlistSongIds.slice();
              copyOfChosenSetlistSongIds[index] = e.target.value;
              setChosenSetlistSongIds(copyOfChosenSetlistSongIds);
            };

            return (
              <select onChange={changeHandler} value={initialValue}>
                <option value="">Choose a song</option>
                {sbd.map((sbObj) => (
                  <option value={sbObj.id}>{sbObj.title}</option>
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
    songs: PropTypes.array,
  }),
  bcId: PropTypes.string,
};

NewSetForm.defaultProps = {
  obj: initialState,
  bcId: '',
};
