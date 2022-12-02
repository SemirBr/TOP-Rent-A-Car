import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser, logout } from '../../utils/http-utils/user-request';
import './Header.scss';
import logo from './logo.png' 

export function Header() {
  const loggedUser = getLoggedUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout().then(() => {
      navigate('/login');
    });
  };

  const redirectToEditUser = () => {
    navigate(`/user/editUser/${loggedUser.id}`);
  };

  return (
    <div className="header">
      <Navbar  expand="lg">
        <Container>
          <Navbar.Brand>
            
            <Link className="nav-link" to="/">
              
           
            <img src={logo} width="130" height="70" /> 
           
            </Link> 
        

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
            <div class="btn-group">
              
            
              <Link className="nav-link" to="/">
              <button class="button"><b>Home</b></button>

              </Link>
               
              {loggedUser.isAdmin && (
                <Link className="nav-link" to="/users-list">
                  <button class="button"><b>Users</b></button>
                </Link>
              )}

            
              {loggedUser.isAdmin && (
                <Link className="nav-link" to="/user/create">
                  <button class="button"><b>Create User</b></button>
                </Link>
              )}

            
              <Link className="nav-link" to="/vehicles-list">
              <button class="button"><b>Vehicles</b></button>
              </Link>
         
            
              {loggedUser.isAdmin && (
                <Link className="nav-link" to="/vehicle/create">
                  <button class="button"><b>Create Vehicle</b></button>
                </Link>
              )}
            
          

              
              <Link className="nav-link" to="/rents-list">
              <button class="button"><b>{loggedUser.isAdmin ? 'All Rents' : 'Your Rents'}</b></button> 
              </Link>
              {/* /rents-list */}
               

               
              {!loggedUser.isAdmin && (
                <Link
                  className="nav-link"
                  to={'/user/editUser/' + loggedUser.id}
                >
                  <button class="button"> <b>Edit Your User</b></button>
                </Link>
              )}   
              
               </div>    
            </Nav>
            {loggedUser && (
              <span className="nav-link logout-btn" onClick={logoutHandler}>
                <button class="button">LOGOUT</button>
              </span>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
