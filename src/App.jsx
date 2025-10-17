import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HamburgerButton from './components/HamburgerButton';
import SideMenu from './components/SideMenu';
import Home from './pages/Home';
import CareerPathwayMain from './pages/CareerPathwayMain';
import ResumeConfirm from './pages/ResumeConfirm';
import ResumePreview from './pages/ResumePreview';
import './styles/App.css';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    targetJob: '',
    summary: '',
    experiences: [],
    skills: [],
    educations: []
  });
  const navigate = useNavigate();

  function handleFormSubmit(newUserInfo) {
    setUserInfo(prev => ({
      ...prev,
      ...newUserInfo
    }));
    console.log('Form submitted:', newUserInfo);
    // Navigate to the preview page after submission
    navigate('/ResumePreview');
  }


  return (
    <div className="App">
      <header className="appHeader">
        <div className='header1'>
          <HamburgerButton onClick={() => setMenuOpen(true)} />
          <h1>PathFolio</h1>
        </div>
        <div className='header2'>
          
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CareerPathwayMain" element={<CareerPathwayMain />} />
          <Route path="/ResumeConfirm" element={<ResumeConfirm onFormSubmit={handleFormSubmit} userInfo={userInfo} />} />
          <Route path="/ResumePreview" element={<ResumePreview userInfo={userInfo} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
