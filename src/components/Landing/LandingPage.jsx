import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import NavBar from './NavBar';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  return (
    <main>
      <NavBar />
      <Hero />
    </main>
  );
};

export default LandingPage;
