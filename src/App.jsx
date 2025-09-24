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

  return (
    <div className="App">
      <header className="app-header">
        <HamburgerButton onClick={() => setMenuOpen(true)} />
        <h1>PathFolio</h1>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career-pathway" element={<CareerPathway />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
