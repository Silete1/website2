// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  About,
  Contact,
  // Experience, // Remove this import
  Hero,
  Navbar,
  // Tech, // Remove this import
  Services,
} from './components';
import PreLoader from './components/PreLoader';
import Cursor from './components/other/Cursor';
import Blog from './pages/Blog';
import { setPageMetadata } from './utils/seo';
import BlogPost from './pages/BlogPost';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
};

const HomePage = () => {
  useEffect(() => {
    setPageMetadata(
      'Anu Software Solutions',
      'Custom web and mobile apps, integrations, and ERP systems built for how your business works.'
    );
  }, []);

  return (
    <div className="relative z-0">
      <div>
        <Hero />
      </div>

      <div className="bg-about bg-cover bg-center bg-no-repeat">
        <About />
      </div>

      {/* <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
        <Tech />
      </div>
      */}

      <Services />

      {/*
      <div
        className="bg-experience bg-cover bg-center bg-no-repeat 
          rounded-tl-[150px] rounded-br-[150px]">
        <div
          className="bg-experienceLight bg-cover bg-center 
          bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
          <Experience />
        </div>
      </div>
      */}
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <PreLoader />
      <Cursor />
      <ScrollToHash />
      <div className="relative z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
