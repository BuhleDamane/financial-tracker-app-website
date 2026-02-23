import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import InvestmentSection from './components/investments/InvestmentSection';
import IncomeSection from './components/income/IncomeSection';
import BudgetSection from './components/budget/BudgetSection';
import GoalsSection from './components/goals/GoalsSection';
import EducationSection from './components/education/EducationSection';
import TaxSection from './components/tax/TaxSection';
import SettingsSection from './components/settings/SettingsSection';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import './styles/App.css';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      {currentUser && (
        <>
          <Header
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            isLoggedIn={!!currentUser}
            onLogin={() => navigate('/login')}
            onLogout={handleLogout}
          />
          <Sidebar
            isOpen={sidebarOpen}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </>
      )}

      <main className={currentUser ? `main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}` : ''}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/investments" element={
            <ProtectedRoute><InvestmentSection /></ProtectedRoute>
          } />
          <Route path="/income" element={
            <ProtectedRoute><IncomeSection /></ProtectedRoute>
          } />
          <Route path="/budget" element={
            <ProtectedRoute><BudgetSection /></ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute><GoalsSection /></ProtectedRoute>
          } />
          <Route path="/education" element={
            <ProtectedRoute><EducationSection /></ProtectedRoute>
          } />
          <Route path="/tax" element={
            <ProtectedRoute><TaxSection /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><SettingsSection /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;