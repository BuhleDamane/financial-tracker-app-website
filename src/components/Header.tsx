import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

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
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm" style={{ height: '70px' }}>
      <Container fluid>
        <div className="d-flex align-items-center">
          <Button
            onClick={toggleSidebar}
            className="me-3 btn-custom"
            aria-label="Toggle sidebar"
            style={{
              backgroundColor: sidebarOpen ? '#e0f7f4' : 'transparent',
              border: '1.5px solid #dee2e6',
              color: '#2c3e50',
            }}
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </Button>

          <Navbar.Brand
            href="/"
            className="ubuntu-font d-flex align-items-center"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="d-flex align-items-center justify-content-center me-2 rounded-circle"
              style={{ width: '40px', height: '40px', backgroundColor: '#17a2b8' }}
            >
              <span className="text-white fw-bold ubuntu-font">FT</span>
            </div>
            <span className="fw-bold" style={{ color: '#2c3e50' }}>
              Financial Tracker
            </span>
          </Navbar.Brand>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button
            className="position-relative btn-custom"
            style={{
              backgroundColor: 'transparent',
              border: '1.5px solid #dee2e6',
              color: '#2c3e50',
            }}
          >
            <FiBell size={20} />
            <span
              className="position-absolute top-0 start-100 translate-middle rounded-pill"
              style={{
                fontSize: '0.6rem',
                padding: '2px 5px',
                backgroundColor: '#ff6b6b',
                color: '#fff',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              3
            </span>
          </Button>

          {isLoggedIn ? (
            <div className="dropdown">
              <Button
                id="userDropdown"
                className="btn-custom d-flex align-items-center roboto-font"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: '#e0f7f4',
                  border: '1.5px solid #b2ebf2',
                  color: '#17a2b8',
                }}
              >
                <FiUser className="me-2" />
                <span className="d-none d-md-inline">John Doe</span>
              </Button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown">
                <li>
                  <button
                    className="dropdown-item roboto-font d-flex align-items-center py-2"
                    onClick={() => navigate('/settings')}
                  >
                    <FiSettings className="me-2" style={{ color: '#17a2b8' }} />
                    Settings
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item roboto-font d-flex align-items-center py-2"
                    style={{ color: '#ff6b6b' }}
                    onClick={onLogout}
                  >
                    <FiLogOut className="me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Button
              className="btn-custom btn-primary-custom text-white roboto-font"
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