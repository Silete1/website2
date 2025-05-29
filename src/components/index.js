// src/components/index.js
// import { BallCanvas } from './canvas'; // Commented out: BallCanvas was primarily used in Tech.jsx. If not used elsewhere, it can be removed.
import Hero from './Hero';
import Navbar from './Navbar';
import About from './About';
// import Tech from './Tech'; // Removed: Tech section is no longer used
// import Experience from './Experience'; // Removed: Experience section is no longer used
import Services from './Services'; // Changed 'Projects' to 'Services' to match component name
import Contact from './Contact';

export {
  Hero,
  Navbar,
  About,
  // Tech, // Removed
  // Experience, // Removed
  Services, // Changed 'Projects' to 'Services'
  Contact,
  // BallCanvas, // Commented out, remove if no longer needed
};