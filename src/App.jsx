// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter>
      <PreLoader />
      <Cursor />
      <div className="relative z-0">
        <div>
          <Navbar />
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
    </BrowserRouter>
  );
};

export default App;