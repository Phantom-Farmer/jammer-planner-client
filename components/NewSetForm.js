import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createSet, updateSet } from '../utils/data/setData';
import { getSingleBand } from '../utils/data/bandData';

const initialState = {
  id: '',
  title: '',
  song: '',
  note: '',
  band: '',
  author: '',
};

export default function NewSetForm({ obj, bcId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bandCard, setBandCard] = useState({});
  const [bandNumber, setbandNumber] = useState(null);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
      setbandNumber(obj.band.id);
    } else {
      getSingleBand(bcId).then((bc) => {
        setBandCard(bc);
      });
    }
  }, [obj]);

  useEffect(() => {
    console.warn(bandNumber);
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
    <Form onSubmit={handleSubmit} style={{ padding: '80px' }}>
      <h2 className="text-black mt-5">{obj.id ? 'update' : 'create'} setlist</h2>
      <FloatingLabel controlId="floatingInput2" label="title" className="mb-3">
        <Form.Control type="text" placeholder="TITLE" name="title" value={formInput.title} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="song" className="mb-3">
        <Form.Control type="text" placeholder="SONG" name="song" value={formInput.song} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="note" className="mb-3">
        <Form.Control type="text" placeholder="NOTE" name="note" value={formInput.note} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'update' : 'create'} setlist</Button>
    </Form>
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
  bcId: PropTypes.number,
};

NewSetForm.defaultProps = {
  obj: initialState,
  bcId: '',
};
