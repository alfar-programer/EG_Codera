import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './Navbar.css';

const navLinks = [
  { name: 'Home',     path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About',    path: '/about-us' },
  { name: 'Team',     path: '/team' },
  { name: 'Contact',  path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="EG Codera Logo" className="logo-img" />
        </Link>

        <div className="nav-links">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.name}
              {location.pathname === link.path && <span className="nav-active-dot" />}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <div className="lang-toggle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D9FF00" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>EN</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <Link to="/contact" className="btn-talk">Let's Talk</Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li key={index} className="mobile-nav-item">
                <Link 
                  to={link.path} 
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
