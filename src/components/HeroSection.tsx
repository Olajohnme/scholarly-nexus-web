import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Globe, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hospital background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/73c27607-1a80-4adb-b1c0-36e81d790182.png')`
        }}
      ></div>
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Medical pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-white/20">
          <svg width="100" height="100" viewBox="0 0 100 100" className="animate-pulse">
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-32 right-32 text-white/20">
          <svg width="80" height="80" viewBox="0 0 100 100" className="animate-pulse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M30 50 L45 50 L50 35 L55 65 L70 50" fill="none" stroke="currentColor" strokeWidth="3"/>
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center text-white">
          {/* Main Title */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Integrated Journal of</span>
              <span className="block text-blue-200">Medicine and Medical Sciences</span>
            </h1>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">A Publication of LAUTECH Teaching Hospital, Ogbomoso</span>
            </div>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up stagger-1">
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Advancing medical knowledge through rigorous peer review and scholarly excellence. 
              A bi-annual publication dedicated to original research and clinical innovation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up stagger-2">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/submit"
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Submit Your Research</span>
              </Link>
              <Link
                to="/archives"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex items-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span>Browse Latest Issues</span>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="animate-fade-in-up stagger-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">e-ISSN: 3026-8192</div>
                <div className="text-white/80">International Standard</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">Bi-Annual</div>
                <div className="text-white/80">Publication Schedule</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">Peer Reviewed</div>
                <div className="text-white/80">Quality Assured</div>
              </div>
            </div>
          </div>

          {/* Current Issue Banner */}
          <div className="animate-fade-in-up stagger-3 mt-16">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto border border-white/30">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 mr-2" />
                <span className="text-white/90 font-medium">Latest Publication</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Current Issue</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Featuring cutting-edge research in clinical medicine, surgical innovations, 
                public health insights, and breakthrough studies in medical sciences.
              </p>
              <Link 
                to="/archives" 
                className="inline-flex items-center mt-6 text-blue-200 hover:text-white transition-colors font-medium"
              >
                Explore Current Issue →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
