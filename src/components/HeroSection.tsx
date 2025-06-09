
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            International Journal of<br />
            <span className="text-blue-200">Medical and Molecular Sciences</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Advancing Scientific Knowledge Through Rigorous Peer Review and Open Access Publishing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/submit"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Submit Your Research
            </Link>
            <Link
              to="/archives"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Browse Articles
            </Link>
          </div>

          {/* Current Issue Banner */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-primary-foreground/80 mb-2">Current Issue</p>
            <h3 className="text-2xl font-semibold mb-2">Volume 12, Issue 3 (2024)</h3>
            <p className="text-primary-foreground/90">
              Latest research in molecular diagnostics, therapeutic innovations, and clinical studies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
