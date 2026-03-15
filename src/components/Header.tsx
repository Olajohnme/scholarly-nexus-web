
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, BookOpen } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Editorial Board', href: '/editorial-board' },
    { name: 'Current Issue', href: 'https://ijmmslth.com/ojs/index.php/ijmms/issue/archive', external: true },
    { name: 'Submit Article', href: 'https://ojs.ijmmslth.com/index.php/ijmms/submission', external: true },
    { name: 'Author Guidelines', href: '/author-guidelines' },
    { name: 'Publication Ethics', href: '/publication-ethics' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with journal info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-border/50">
          <div className="text-muted-foreground">
            e-ISSN: 3026-8192
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-muted-foreground">
              ijmmslth@yahoo.com • +234 802 416 5579
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ef468316-24e7-4192-832f-0d60bd4c22e8.png" 
              alt="IJMMS Logo" 
              className="h-20 w-180" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map(item => (
              item.external ? (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </a>
              ) : (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              )
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-accent">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                item.external ? (
                  <a 
                    key={item.name} 
                    href={item.href}
                    className="block px-3 py-3 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-200" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link 
                    key={item.name} 
                    to={item.href} 
                    className="block px-3 py-3 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-200" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
