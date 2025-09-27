
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, BookOpen, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Journal Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/ef468316-24e7-4192-832f-0d60bd4c22e8.png" 
                alt="IJMMS Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">
                  Integrated Journal of Medicine and Medical Sciences
                </h3>
                <p className="text-primary-foreground/80 text-sm">LAUTECH Teaching Hospital, Ogbomoso</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 mb-6 leading-relaxed">
              IJMMS is a bi-annual medical journal dedicated to publishing original research, 
              case reports, and systematic reviews in clinical medicine, laboratory medicine, 
              and allied health sciences. Our mission is to advance medical knowledge and 
              improve healthcare delivery through scholarly excellence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>ijmmslth@yahoo.com</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+234 802 416 5579</span>
              </div>
              <div className="flex items-center space-x-3 text-primary-foreground/90">
                <Globe className="h-5 w-5 flex-shrink-0" />
                <span>www.ijmmslth.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About IJMMS
                </Link>
              </li>
              <li>
                <Link to="/https://ijmmslth.com/ojs/index.php/ijmms/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link to="/https://ijmmslth.com/ojs/index.php/ijmms/issue/current" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Current Issue
                </Link>
              </li>
              <li>
                <Link to="/editorial-board" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Editorial Board
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Author Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Publication Ethics
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Editorial Office
            </h4>
            <div className="text-primary-foreground/90 space-y-3">
              <p className="leading-relaxed">
                Opposite CMAC's Office<br />
                Fourth Floor, Administrative Building<br />
                PMB 4007, Ogbomoso<br />
                Oyo State, Nigeria
              </p>
              
              <div className="pt-4">
                <h5 className="font-medium mb-2">Publication Fees</h5>
                <div className="text-sm space-y-1">
                  <p>Domestic Authors: ₦30,000</p>
                  <p>International: $100 / €70</p>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="font-medium mb-2">Banking Details</h5>
                <div className="text-sm space-y-1">
                  <p><strong>Bank:</strong> Access Bank</p>
                  <p><strong>Account:</strong> 0726206782</p>
                  <p><strong>Name:</strong> Integrated Journal of Medicine and Medical Sciences</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-primary-foreground/80 text-sm">
                © 2024 Integrated Journal of Medicine and Medical Sciences. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-primary-foreground/80 text-sm">
                e-ISSN: 3026-8192
              </span>
              <div className="flex space-x-4">
                <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
