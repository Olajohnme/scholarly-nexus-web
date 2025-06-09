
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Journal Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              International Journal of Medical and Molecular Sciences
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              IJMMS is a peer-reviewed, open-access journal dedicated to advancing 
              medical and molecular sciences through high-quality research publications.
            </p>
            <div className="flex items-center space-x-2 text-primary-foreground/80">
              <Mail className="h-4 w-4" />
              <span>editor@ijmms.org</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About IJMMS
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Submit Article
                </Link>
              </li>
              <li>
                <Link to="/archives" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Archives
                </Link>
              </li>
              <li>
                <Link to="/editorial-board" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Editorial Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <div className="text-primary-foreground/80 space-y-2">
              <p>IJMMS Editorial Office</p>
              <p>Medical Sciences Building</p>
              <p>University Campus</p>
              <p>Email: editor@ijmms.org</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 International Journal of Medical and Molecular Sciences. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
