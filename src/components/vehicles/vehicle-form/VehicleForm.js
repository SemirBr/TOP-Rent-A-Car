import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { useEffect, useState } from 'react';
import {
  saveVehicle,
  getVehicleById,
} from '../../../utils/http-utils/vehicle-request';
import { useNavigate, useParams } from 'react-router-dom';

export function VehicleForm() {
  const VehicleFuelTypes = {
    ELECTRIC: 'Electric',
    HYBRID: 'Hybrid',
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
  };

  const VehicleTypes = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury',
    SUV: 'SUV',
    CARGO: 'Cargo',
  };

  const params = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    isActive: false,
    picture: '',
    brand: '',
    model: '',
    year: '',
    type: '',
    fuel: '',
    numberOfSeats: '',
    pricePerDay: '',
    carCount: '',
  });

  useEffect(() => {
    if (params.id) {
      getVehicleById(params.id).then((vehicle) => {
        setVehicle(vehicle.data);
      });
    }
  }, [params.id]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveVehicle(vehicle).then(() => {
      navigate('/vehicles-list');
    });
  };

  const onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'isActive') {
      value = event.target.checked;
    }

    setVehicle((prevState) => {
      return {
        ...prevState,
        [event.target.name]: value,
      };
    });
  };

  return (
    <div className="vehicle-form-wrapper">
      <div className="form">
        <Form onSubmit={onFormSubmit}>
          <h2> {vehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Brand Name</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.brand}
              type="text"
              placeholder="Enter brand name"
              onChange={onInputChange}
              name="brand"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Model</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.model}
              type="text"
              placeholder="Enter model"
              onChange={onInputChange}
              name="model"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Picture</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.picture}
              type="text"
              onChange={onInputChange}
              name="picture"
              placeholder="Enter link of picture"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Year</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.year}
              onChange={onInputChange}
              name="year"
              type="number"
              min="1900"
              max="2099"
              step="1"
              placeholder="Enter year"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Type</h6></Form.Label>
            <Form.Select
              required
              aria-label="Car type"
              placeholder="Select Car Type"
              name="type"
              value={vehicle.type}
              onChange={onInputChange}
            >
              {Object.keys(VehicleTypes).map((type) => (
                <option key={type} value={VehicleTypes[type]}>
                  {VehicleTypes[type]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label><h6>Fuel type</h6></Form.Label>
            <Form.Select
              required
              aria-label="Fuel type"
              placeholder="Select Fuel Type"
              name="fuel"
              value={vehicle.fuel}
              onChange={onInputChange}
            >
              {Object.keys(VehicleFuelTypes).map((type) => (
                <option key={type} value={VehicleFuelTypes[type]}>
                  {VehicleFuelTypes[type]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Number Of Seats</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.numberOfSeats}
              onChange={onInputChange}
              name="numberOfSeats"
              type="number"
              min="1"
              max="8"
              step="1"
              placeholder="Enter Number Of Seats"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Number of Cars</h6></Form.Label>
            <Form.Control
              required
              value={vehicle.carCount}
              onChange={onInputChange}
              name="carCount"
              type="number"
              step="0"
              placeholder="Enter Number of cars"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h6>Price Per Day</h6></Form.Label>
            <Form.Control
              required
              step="0.01"
              value={vehicle.pricePerDay}
              onChange={onInputChange}
              name="pricePerDay"
              type="number"
              placeholder="Enter Price Per Day"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Active"
              name="isActive"
              checked={vehicle.isActive}
              onChange={onInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {vehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
