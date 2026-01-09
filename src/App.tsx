import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <Router>
      <div className="app-container">
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

        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investments" element={<InvestmentSection />} />
            <Route path="/income" element={<IncomeSection />} />
            <Route path="/budget" element={<BudgetSection />} />
            <Route path="/goals" element={<GoalsSection />} />
            <Route path="/education" element={<EducationSection />} />
            <Route path="/tax" element={<TaxSection />} />
            <Route path="/settings" element={<SettingsSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;