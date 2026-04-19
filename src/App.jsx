// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  About,
  Contact,
  Hero,
  Navbar,
  Services,
} from './components';
import PreLoader from './components/PreLoader';
import Cursor from './components/other/Cursor';
import Blog from './pages/Blog';
import { setPageMetadata } from './utils/seo';
import BlogPost from './pages/BlogPost';
import { useI18n } from './i18n.jsx';

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
  const { lang } = useI18n();

  useEffect(() => {
    setPageMetadata({
      title:
        lang === 'ar'
          ? 'ANU | أودو ERP وبرامج المحاسبة وإدارة الأعمال في العراق'
          : 'ANU | Odoo ERP, Accounting Software, and Business Systems in Iraq',
      description:
        lang === 'ar'
          ? 'ANU تقدم خدمات أودو ERP وبرامج المحاسبة وإدارة المخزون والموارد البشرية وأتمتة الأعمال والتطبيقات المخصصة للشركات في العراق.'
          : 'ANU delivers Odoo ERP, accounting software, inventory, HR, automation, and custom business applications for companies in Iraq.',
      path: '/',
      type: 'website',
      locale: lang === 'ar' ? 'ar_IQ' : 'en_US',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://www.anu.ltd/#organization',
            name: 'ANU',
            url: 'https://www.anu.ltd/',
            logo: 'https://www.anu.ltd/anulogopng-.png',
            email: 'info@anu.ltd',
            telephone: '+9647867007030',
          },
          {
            '@type': 'ProfessionalService',
            '@id': 'https://www.anu.ltd/#service',
            name: 'ANU',
            url: 'https://www.anu.ltd/',
            image: 'https://www.anu.ltd/anulogopng-.png',
            areaServed: 'IQ',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Baghdad',
              addressCountry: 'IQ',
              streetAddress: 'Iraq - Baghdad - Alkarradh - Arrasat',
            },
            makesOffer: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Odoo ERP Implementation' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accounting Software' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inventory Management Systems' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HR Systems' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Business Applications' } },
            ],
          },
        ],
      },
    });
  }, [lang]);

  return (
    <div className="relative z-0">
      <div>
        <Hero />
      </div>

      <div className="bg-white">
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
