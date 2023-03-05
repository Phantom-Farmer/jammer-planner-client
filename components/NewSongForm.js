import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createSong, updateSong } from '../utils/data/songData';
import { getSingleBand } from '../utils/data/bandData';

const initialState = {
  id: '',
  title: '',
  key: '',
  signature: '',
  vibe: '',
  lyric: '',
  band: '',
  author: '',
};

export default function NewSongForm({ obj, bcId }) {
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

    const songObj = {
      id: formInput.id,
      title: formInput.title,
      key: formInput.key,
      signature: formInput.signature,
      vibe: formInput.vibe,
      lyric: formInput.lyric,
      author: user.id,
      band: bandNumber,
    };
    if (obj.id) {
      updateSong(songObj, obj.id)
        .then(() => router.push(`/song/band/${bandNumber}`));
    } else {
      const payload = {
        ...formInput, author: bandCard.author.id, band: bandCard.id,
      };
      createSong(payload).then(() => {
        router.push(`/song/band/${bandCard.id}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ padding: '80px' }}>
      <h2 className="text-black mt-5">{obj.id ? 'update' : 'create'} song</h2>
      <FloatingLabel controlId="floatingInput2" label="title" className="mb-3">
        <Form.Control type="text" placeholder="TITLE" name="title" value={formInput.title} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="key" className="mb-3">
        <Form.Control type="text" placeholder="KEY" name="key" value={formInput.key} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="signature" className="mb-3">
        <Form.Control type="text" placeholder="SIGNATURE" name="signature" value={formInput.signature} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="vibe" className="mb-3">
        <Form.Control type="text" placeholder="VIBE" name="vibe" value={formInput.vibe} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="lyric" className="mb-3">
        <Form.Control type="text" placeholder="LYRIC" name="lyric" value={formInput.lyric} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <Button className="m-4" type="submit">{obj.id ? 'update' : 'create'} song</Button>
    </Form>
  );
}

NewSongForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    key: PropTypes.string,
    signature: PropTypes.string,
    vibe: PropTypes.string,
    lyric: PropTypes.string,
    author: PropTypes.number,
    band: PropTypes.number,
  }),
  bcId: PropTypes.number,
};

NewSongForm.defaultProps = {
  obj: initialState,
  bcId: '',
};
