import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

function formatName(rawName: string | null | undefined): string {
  if (!rawName) return 'User';
  return rawName
    .replace(/[.,]/g, '')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
  isLoggedIn,
  onLogin,
  onLogout
}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useAuth();

  const displayName = formatName(currentUser?.displayName);
  const firstName = displayName.split(' ')[0];

  return (
    <>
      <style>{`
        .header-navbar {
          height: 70px;
          border-bottom: 1px solid #e9ecef;
          z-index: 1030;
        }

        .sidebar-toggle-btn {
          background-color: transparent;
          border: 1.5px solid #dee2e6;
          color: #2c3e50;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.2s, border-color 0.2s;
          padding: 0;
        }
        .sidebar-toggle-btn.active,
        .sidebar-toggle-btn:hover {
          background-color: #e0f7f4;
          border-color: #b2ebf2;
          color: #17a2b8;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 10px;
          min-width: 0;
        }
        .brand-logo-circle {
          width: 36px;
          height: 36px;
          min-width: 36px;
          background-color: #17a2b8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-logo-text {
          font-weight: 700;
          color: #2c3e50;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 360px) {
          .brand-logo-text {
            display: none;
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .user-btn {
          background-color: #e0f7f4;
          border: 1.5px solid #b2ebf2;
          color: #17a2b8;
          border-radius: 8px;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          font-weight: 500;
          white-space: nowrap;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .user-btn:hover {
          background-color: #b2ebf2;
        }

        @media (max-width: 575px) {
          .user-btn-label {
            display: none;
          }
          .user-btn {
            padding: 0;
            width: 40px;
            justify-content: center;
          }
        }

        .login-btn {
          height: 40px;
          border-radius: 8px;
          font-weight: 500;
          white-space: nowrap;
          padding: 0 16px;
        }
        @media (max-width: 400px) {
          .login-btn {
            font-size: 0.8rem;
            padding: 0 10px;
          }
        }

        .header-dropdown {
          position: relative;
        }
        .header-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 180px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          border: 1px solid #e9ecef;
          padding: 6px;
          z-index: 2000;
          animation: dropdownFadeIn 0.15s ease;
        }
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .header-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 7px;
          font-size: 0.9rem;
          color: #2c3e50;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          transition: background-color 0.15s;
        }
        .header-dropdown-item:hover {
          background-color: #f0fdfe;
        }
        .header-dropdown-item.danger {
          color: #ff6b6b;
        }
        .header-dropdown-item.danger:hover {
          background-color: #fff5f5;
        }
        .header-dropdown-divider {
          height: 1px;
          background-color: #e9ecef;
          margin: 4px 0;
        }
      `}</style>

      <Navbar
        bg="white"
        expand="lg"
        fixed="top"
        className="shadow-sm header-navbar"
      >
        <Container fluid className="px-3 px-md-4">
          <div className="d-flex align-items-center gap-2 gap-sm-3" style={{ minWidth: 0, flex: 1 }}>
            <button
              className={`sidebar-toggle-btn ${sidebarOpen ? 'active' : ''}`}
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>

            <a href="/" className="brand-logo">
              <div className="brand-logo-circle">
                <span className="text-white fw-bold ubuntu-font" style={{ fontSize: '0.8rem' }}>FT</span>
              </div>
              <span className="brand-logo-text ubuntu-font">Financial Tracker</span>
            </a>
          </div>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="header-dropdown">
                <button
                  className="user-btn roboto-font"
                  onClick={() => setDropdownOpen(prev => !prev)}
                  aria-label="User menu"
                >
                  <FiUser size={17} />
                  <span className="user-btn-label">{firstName}</span>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 1999 }}
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="header-dropdown-menu">
                      <div className="px-3 py-2 mb-1" style={{ 
                        borderBottom: '1px solid #e9ecef',
                        color: '#6c757d',
                        fontSize: '0.85rem'
                      }}>
                        {displayName}
                      </div>
                      <button
                        className="header-dropdown-item roboto-font"
                        onClick={() => { navigate('/settings'); setDropdownOpen(false); }}
                      >
                        <FiSettings size={15} style={{ color: '#17a2b8' }} />
                        Settings
                      </button>
                      <div className="header-dropdown-divider" />
                      <button
                        className="header-dropdown-item danger roboto-font"
                        onClick={() => { onLogout(); setDropdownOpen(false); }}
                      >
                        <FiLogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button
                className="btn-custom btn-primary-custom text-white roboto-font login-btn"
                onClick={onLogin}
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;