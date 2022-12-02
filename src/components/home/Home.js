import './Home.scss';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const toAllVehicles = () => {
    navigate('/vehicles-list');
  };

  return (
    <div className="wrapper">
      <div className="text-top">
        
        <h2>National car rental company</h2>
        <Button variant="primary" onClick={toAllVehicles}>
          Rent a car
        </Button>
      </div>
    </div>
  );
}
