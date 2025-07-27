import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="size-full mask-wrapper">
        <img
          src="/images/hero-bg.webp"
          alt="background"
          className="scale-out"
        />
        <img
          src="/images/hero-text.webp"
          alt="hero-logo"
          className="fade-out"
        />
      </div>
    </section>
  );
};

export default Hero;
