import React from 'react';
import { Nav } from 'react-bootstrap';
import { 
  FiHome, 
  FiTrendingUp, 
  FiDollarSign, 
  FiPieChart, 
  FiTarget, 
  FiBook, 
  FiPercent,
  FiSettings 
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'investments', label: 'Investments', icon: <FiTrendingUp /> },
    { id: 'income', label: 'Income Streams', icon: <FiDollarSign /> },
    { id: 'budget', label: 'Monthly Budget', icon: <FiPieChart /> },
    { id: 'goals', label: 'Goals & Progress', icon: <FiTarget /> },
    { id: 'education', label: 'Financial Education', icon: <FiBook /> },
    { id: 'tax', label: 'Tax Calculator', icon: <FiPercent /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div 
      className={`sidebar bg-white shadow-lg position-fixed top-0 start-0 h-100 overflow-y-auto`}
      style={{ 
        width: '280px',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 1000,
        paddingTop: '70px'
      }}
    >
      <div className="sidebar-header p-4 border-bottom">
        <h5 className="ubuntu-font fw-bold mb-0" style={{ color: '#2c3e50' }}>
          Financial Tools
        </h5>
        <p className="text-muted small mt-1 mb-0">Track, Plan, Grow</p>
      </div>

      <Nav className="flex-column p-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.id}
            href={`/${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
            className={`d-flex align-items-center py-3 px-3 rounded mb-2 ${
              activeSection === item.id 
                ? 'bg-primary text-white' 
                : 'text-dark hover-bg-light'
            }`}
            style={{
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            <span className="me-3" style={{ fontSize: '1.2rem' }}>
              {item.icon}
            </span>
            <span className="fw-medium">{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>

      <div className="sidebar-footer p-4 border-top mt-auto">
        <div className="text-center">
          <small className="text-muted">Version 1.0.0</small>
          <p className="small mt-2">Your financial journey starts here</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;