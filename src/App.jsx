import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HamburgerButton from './components/HamburgerButton';
import SideMenu from './SideMenu';
import Home from './home';
import CareerPathway from './CareerPathway';
import ResumeAnalyzer from './ResumeAnalyzer';
import './App.css';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    targetJob: '',
    summary: '',
    experiences: [],
    skills: [],
    educations: []
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    const newUserInfo = Object.fromEntries(new FormData(event.target));
    setUserInfo(prev => ({
      ...prev,
      ...newUserInfo
    }));
    console.log('Form submitted:', newUserInfo);
  }


  return (
    <div className="App">
      <header className="appHeader">
        <HamburgerButton onClick={() => setMenuOpen(true)} />
        <h1>PathFolio</h1>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumeAnalyzer" element={<ResumeAnalyzer onFormSubmit={handleFormSubmit} />} />
          <Route path="/careerPathway" element={<CareerPathway />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
