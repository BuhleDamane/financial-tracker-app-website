import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';

interface NavbarProps {
  onLogin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSignIn = () => {
    if (onLogin) {
      onLogin();
    }
  };

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
        <BootstrapNavbar.Brand 
          href="#" 
          className="d-flex align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2" 
            style={{ 
              width: '40px', 
              height: '40px',
              backgroundColor: '#17a2b8',
              boxShadow: '0 2px 8px rgba(23, 162, 184, 0.3)'
            }}
          >
            <span className="text-white fw-bold">FT</span>
          </div>
          <span 
            className="fw-bold fs-5" 
            style={{ 
              color: scrolled ? '#2c3e50' : '#2c3e50',
              letterSpacing: '-0.5px'
            }}
          >
            Financial Tracker
          </span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="navbar-nav"
          style={{
            borderColor: '#17a2b8'
          }}
        />
        
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link 
              href="#home"
              style={{ 
                color: scrolled ? '#2c3e50' : '#2c3e50',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease'
              }}
              className="nav-link-hover"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#features"
              style={{ 
                color: scrolled ? '#2c3e50' : '#2c3e50',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease'
              }}
              className="nav-link-hover"
            >
              Features
            </Nav.Link>
            <Nav.Link 
              href="#how-it-works"
              style={{ 
                color: scrolled ? '#2c3e50' : '#2c3e50',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease'
              }}
              className="nav-link-hover"
            >
              How It Works
            </Nav.Link>
            <Nav.Link 
              href="#testimonials"
              style={{ 
                color: scrolled ? '#2c3e50' : '#2c3e50',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease'
              }}
              className="nav-link-hover"
            >
              Testimonials
            </Nav.Link>
            
            <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
              <Button
                variant="outline"
                size="sm"
                style={{
                  border: '2px solid #17a2b8',
                  color: '#17a2b8',
                  fontWeight: 600,
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease'
                }}
                className="signin-btn"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                style={{
                  backgroundColor: '#17a2b8',
                  border: 'none',
                  fontWeight: 600,
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(23, 162, 184, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                className="signup-btn"
                onClick={handleSignIn}
              >
                Get Started
              </Button>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;