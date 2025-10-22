import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HamburgerButton from './components/HamburgerButton';
import SideMenu from './components/SideMenu';
import Home from './pages/Home';
import CareerPathwayMain from './pages/CareerPathwayMain';
import ResumeConfirm from './pages/ResumeConfirm';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import './styles/App.css';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    targetJob: '',
    summary: '',
    experiences: '',
    skills: '',
    educations: ''
  });
  const navigate = useNavigate();

  // func for form submission which update info and navigate to preview page
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUserInfo = {
      targetJob: formData.get('targetJob'),
      summary: formData.get('summary'),
      experiences: formData.get('experiences'),
      skills: formData.get('skills'),
      educations: formData.get('educations'),
    };
    setUserInfo(prev => ({
      ...prev,
      ...newUserInfo
    }));
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    console.log('Form submitted with new data:', newUserInfo);
    navigate('/ResumeAnalyzer');
  }

  // func for side menu
  function openMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }


  return (
    <div className="App">
      <header className="appHeader">
        <div className='header1'>
          <HamburgerButton onClick={openMenu} />
          <h1>PathFolio</h1>
        </div>
        <div className='header2'>
          {/* for avatar (update later) */}
        </div>
      </header>

  <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ResumeConfirm" element={<ResumeConfirm onFormSubmit={handleFormSubmit} initialData={userInfo} />} />
          <Route path="/ResumeAnalyzer" element={<ResumeAnalyzer />} />
          <Route path="/CareerPathwayMain" element={<CareerPathwayMain />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
