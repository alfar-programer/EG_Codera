import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <Link to="/" className="footer-logo">
          <img src={logo} alt="EG Codera Logo" className="footer-logo-img" />
        </Link>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about-us">About</Link>
          <Link to="/team">Team</Link>
          <Link to="/contact">Contact</Link>
          <a href="#">Privacy &amp; Cookie Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
        <div className="footer-copy">© 2024 EG Codera. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
