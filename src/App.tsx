import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import InvestmentSection from './components/investments/InvestmentSection';
import IncomeSection from './components/income/IncomeSection';
import BudgetSection from './components/budget/BudgetSection';
import GoalsSection from './components/goals/GoalsSection';
import EducationSection from './components/education/EducationSection';
import TaxSection from './components/tax/TaxSection';
import SettingsSection from './components/settings/SettingsSection';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start with false for landing page

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="app-container">
        {/* Only show Header and Sidebar when logged in */}
        {isLoggedIn ? (
          <>
            <Header 
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
            
            <Sidebar 
              isOpen={sidebarOpen}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </>
        ) : null}

        <main className={isLoggedIn ? `main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}` : ''}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Routes - Only accessible when logged in */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/investments" element={
              <ProtectedRoute>
                <InvestmentSection />
              </ProtectedRoute>
            } />
            <Route path="/income" element={
              <ProtectedRoute>
                <IncomeSection />
              </ProtectedRoute>
            } />
            <Route path="/budget" element={
              <ProtectedRoute>
                <BudgetSection />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <GoalsSection />
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <EducationSection />
              </ProtectedRoute>
            } />
            <Route path="/tax" element={
              <ProtectedRoute>
                <TaxSection />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsSection />
              </ProtectedRoute>
            } />
            
            {/* Redirect any unknown route to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;