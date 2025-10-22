import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HamburgerButton from './components/HamburgerButton';
import SideMenu from './components/SideMenu';
import Home from './pages/Home';
import CareerPathwayMain from './pages/CareerPathwayMain';
import ResumeConfirm from './pages/ResumeConfirm';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import './styles/App.css';
import SingleInputPopup from './components/SingleInputPopup';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    targetJob: '',
    summary: '',
    experiences: '',
    skills: '',
    educations: ''
  });
  const [currentJob, setCurrentJob] = useState({
    title: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  // popupStage: 0 = none, 1 = ask current job, 2 = ask target job
  const [popupStage, setPopupStage] = useState(0);

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

  // Handle a single-input popup save. 'type' indicates what is saved. 
  // type = 'currentJob' or type = 'targetJob'
  function handleSingleInputSave(type, value) {
    // Update React state and localStorage together
    try {
      if (type === 'currentJob') {
        var updatedCurrent = { title: value };
        setCurrentJob(updatedCurrent);
        localStorage.setItem('currentJob', JSON.stringify(updatedCurrent));
      }
      else {
        // update userInfo locally
        var updatedUser = Object.assign({}, userInfo);
        if (type === 'targetJob') {
          updatedUser.targetJob = value;
        }
        setUserInfo(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }
    } catch (e) {
      // ignore storage errors
    }
    if (type === 'targetJob') {
      try {
        // notify other components that a single-input was saved
        window.dispatchEvent(new CustomEvent('singleInputSaved', { detail: { type: type, value: value } }));
      } catch (e) {}
      console.log('Saved single input', type, value);
    }
  }

  // func for side menu
  function openMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }

  // when user navigates to CareerPathwayMain, start the popup sequence
  useEffect(function () {
    if (location && location.pathname === '/CareerPathwayMain') {
      setPopupStage(1);
    }
  }, [location]);


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
          <Route path="/ResumeConfirm" element={<ResumeConfirm onFormSubmit={handleFormSubmit} />} />
          <Route path="/ResumeAnalyzer" element={<ResumeAnalyzer />} />
          <Route path="/CareerPathwayMain" element={<CareerPathwayMain />} />
        </Routes>
      </main>
      {/* Sequential popups for CareerPathway flow */}
      <SingleInputPopup
        isOpen={popupStage === 1}
        title="What's your current job?"
        label="Current job"
        initialValue={(currentJob && currentJob.title) || ''}
        storageType={'currentJob'}
        onSaved={function (type, value) {
          handleSingleInputSave(type, value);
          // advance to asking target
          setPopupStage(2);
        }}
      />

      <SingleInputPopup
        isOpen={popupStage === 2}
        title="What's your target job?"
        label="Target job"
        initialValue={(userInfo && userInfo.targetJob) || ''}
        storageType={'targetJob'}
        onSaved={function (type, value) {
          handleSingleInputSave(type, value);
          setPopupStage(0);
        }}
      />
    </div>
  );
}

export default App;
