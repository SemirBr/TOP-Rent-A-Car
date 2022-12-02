import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import {
  saveUser,
  getUserById,
  getLoggedUser,
} from '../../../utils/http-utils/user-request';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const [user, setUser] = useState({
    isAdmin: false,
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
    isVIP: false,
    totalRentedCars: 0,
  });

  useEffect(() => {
    if (params.id) {
      getUserById(params.id).then((user) => {
        setUser(user.data);
      });
    }
  }, [params.id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveUser(user).then(() => {
      navigate('/');
    });
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'isAdmin') {
      value = event.target.checked;
    }

    setUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });
  };

  return (
    <div className="userForm-wrapper">
      <Form onSubmit={onFormSubmit}>
        <h2>{user.id ? 'Edit User' : 'Create User'}</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h6>Full Name</h6></Form.Label>
          <Form.Control
            value={user.name}
            type="text"
            placeholder="Enter full name"
            onChange={onInputChange}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h6>Email address</h6></Form.Label>
          <Form.Control
            value={user.email}
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h6>Picture</h6></Form.Label>
          <Form.Control
            value={user.picture}
            type="text"
            onChange={onInputChange}
            name="picture"
            placeholder="Enter link of picture"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h6>Phone</h6></Form.Label>
          <Form.Control
            value={user.phone}
            onChange={onInputChange}
            name="phone"
            type="tel"
            placeholder="Enter phone"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><h6>Address</h6></Form.Label>
          <Form.Control
            value={user.address}
            onChange={onInputChange}
            name="address"
            type="text"
            placeholder="Enter address"
          />
        </Form.Group>

        {loggedUser.isAdmin && (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Admin"
              name="isAdmin"
              checked={user.isAdmin}
              onChange={onInputChange}
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {user.id ? 'Edit User' : 'Create User'}
        </Button>
      </Form>
    </div>
  );
}
