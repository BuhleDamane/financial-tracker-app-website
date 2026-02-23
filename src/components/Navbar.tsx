import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';

interface NavbarProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 0'
      }}
    >
      <Container>
        <BootstrapNavbar.Brand href="#" className="d-flex align-items-center">
          <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ width: '40px', height: '40px', backgroundColor: '#17a2b8', boxShadow: '0 2px 8px rgba(23, 162, 184, 0.3)' }}>
            <span className="text-white fw-bold">FT</span>
          </div>
          <span className="fw-bold fs-5" style={{ color: '#2c3e50', letterSpacing: '-0.5px' }}>
            Financial Tracker
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" style={{ borderColor: '#17a2b8' }} />

        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="#home" style={{ color: '#2c3e50', fontWeight: 500, padding: '0.5rem 1rem' }}>Home</Nav.Link>
            <Nav.Link href="#features" style={{ color: '#2c3e50', fontWeight: 500, padding: '0.5rem 1rem' }}>Features</Nav.Link>
            <Nav.Link href="#how-it-works" style={{ color: '#2c3e50', fontWeight: 500, padding: '0.5rem 1rem' }}>How It Works</Nav.Link>
            <Nav.Link href="#testimonials" style={{ color: '#2c3e50', fontWeight: 500, padding: '0.5rem 1rem' }}>Testimonials</Nav.Link>

            <div className="ms-lg-3 mt-3 mt-lg-0">
              <Button
                size="sm"
                style={{
                  backgroundColor: '#17a2b8',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(23, 162, 184, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;