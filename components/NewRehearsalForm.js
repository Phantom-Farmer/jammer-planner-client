import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createRehearsal, updateRehearsal } from '../utils/data/rehearsalData';
import { getSingleBand } from '../utils/data/bandData';
import { getSetsByBand } from '../utils/data/setData';

const initialState = {
  id: '',
  date: '',
  time: '',
  location: '',
  show: '',
  message: '',
  band: '',
  set: '',
  author: '',
};

export default function NewRehearsalForm({ rObj, bcId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [bandCard, setBandCard] = useState({});
  const [bandNumber, setbandNumber] = useState(null);
  const [sets, setSets] = useState([]);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (rObj.id) {
      setFormInput(rObj);
      setbandNumber(rObj.band.id);
    } else {
      getSingleBand(bcId).then((bc) => {
        setBandCard(bc);
      });
      getSetsByBand(bcId).then((bandSets) => {
        setSets(bandSets);
      });
    }
  }, [rObj]);

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

    const rehObj = {
      id: formInput.id,
      date: formInput.date,
      time: formInput.time,
      location: formInput.location,
      show: formInput.show,
      message: formInput.message,
      author: user.id,
      set: formInput.set.id,
      band: bandNumber,
    };
    if (rObj.id) {
      updateRehearsal(rehObj, rObj.id)
        .then(() => router.push(`/rehearsal/band/${bandNumber}`));
    } else {
      const payload = {
        ...formInput, author: bandCard.author.id, band: bandCard.id,
      };
      createRehearsal(payload).then(() => {
        router.push(`/rehearsal/band/${bandCard.id}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ padding: '80px' }}>
      <h2 className="text-black mt-5">{rObj.id ? 'update' : 'create'} rehearsal</h2>
      <FloatingLabel controlId="floatingInput2" label="date" className="mb-3">
        <Form.Control type="text" placeholder="DATE" name="date" value={formInput.date} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="time" className="mb-3">
        <Form.Control type="text" placeholder="TIME" name="time" value={formInput.time} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="location" className="mb-3">
        <Form.Control type="text" placeholder="LOCATION" name="location" value={formInput.location} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="show" className="mb-3">
        <Form.Control type="text" placeholder="SHOW" name="show" value={formInput.show} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="add set">
        <Form.Select name="set" value={formInput.set} onChange={handleChange} className="mb-3" required>
          <option disabled value="">
            select a set list
          </option>
          {sets.map((s) => <option key={s.id} value={s.id} display={s.title}>{s.title}</option>)}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="message" className="mb-3">
        <Form.Control type="text" placeholder="message" name="message" value={formInput.message} onChange={handleChange} as="textarea" aria-label="With textarea" required />
      </FloatingLabel>
      <Button className="m-4" type="submit">{rObj.id ? 'update' : 'create'} rehearsal</Button>
    </Form>
  );
}

NewRehearsalForm.propTypes = {
  rObj: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    show: PropTypes.string,
    message: PropTypes.string,
    author: PropTypes.number,
    set: PropTypes.number,
    band: PropTypes.number,
  }),
  bcId: PropTypes.number,
};

NewRehearsalForm.defaultProps = {
  rObj: initialState,
  bcId: '',
};
