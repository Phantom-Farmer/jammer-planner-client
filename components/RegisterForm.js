import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    uid: user.uid,
    image_url: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData, user).then(() => updateUser(user.uid));
  };

  const handleChange = (e) => {
    // eslint-disable-next-line no-unused-vars
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      name: [value],
    }));
  };
  console.warn(user);
  return (
    <Form onSubmit={handleSubmit} style={{ padding: 80 }}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control as="textarea" required placeholder="Enter your Name" name="name" onChange={handleChange} />
        <Form.Text className="text-muted">Welcome to Jammer Planner</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
