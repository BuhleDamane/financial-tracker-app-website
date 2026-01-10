import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FiMenu, FiBell, FiUser, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  toggleSidebar, 
  isLoggedIn, 
  onLogin, 
  onLogout 
}) => {
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm" style={{ height: '70px' }}>
      <Container fluid>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            onClick={toggleSidebar}
            className="me-3"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </Button>
          
          <Navbar.Brand href="/" className="ubuntu-font d-flex align-items-center">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ width: '40px', height: '40px' }}>
              <span className="text-white fw-bold">FT</span>
            </div>
            <span className="fw-bold" style={{ color: '#2c3e50' }}>
              Financial Tracker
            </span>
          </Navbar.Brand>
        </div>

        <div className="d-flex align-items-center">
          <Button variant="outline-secondary" className="me-2 position-relative">
            <FiBell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                  style={{ fontSize: '0.6rem', padding: '2px 4px' }}>
              3
            </span>
          </Button>
          
          {isLoggedIn ? (
            <>
              <div className="dropdown">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center"
                  id="userDropdown"
                  onClick={onLogin}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiUser className="me-2" />
                  <span className="d-none d-md-inline">John Doe</span>
                </Button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><a className="dropdown-item" href="/settings">Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={onLogout}>
                      <FiLogOut className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Button 
              variant="primary" 
              className="btn-primary-custom"
              onClick={onLogin}
            >
              Login / Sign Up
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;