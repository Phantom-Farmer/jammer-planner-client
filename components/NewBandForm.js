import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createBand, updateBand } from '../utils/data/bandData';

const initialState = {
  id: '',
  name: '',
  author: '',
};

export default function NewBandForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const { user } = useAuth();
  console.warn(user);

  useEffect(() => {
    if (obj.id)setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bandObj = {
      id: formInput.id,
      name: formInput.name,
      author: user.id,
    };

    if (obj.id) {
      updateBand(bandObj, obj.id)
        .then(() => router.push('/'));
    } else {
      createBand(bandObj).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'update' : 'create'} band</h2>
      <FloatingLabel controlId="floatingInput1" label="name" className="mb-3">
        <Form.Control type="text" placeholder="what is your band name?" name="name" value={formInput.name} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>

      <Button type="submit">{obj.id ? 'update' : 'create'} new band</Button>
    </Form>
  );
}

NewBandForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    author: PropTypes.number,
  }),
};

NewBandForm.defaultProps = {
  obj: initialState,
};
