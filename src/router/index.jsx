import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import Services from '../pages/Services/Services';
import ContactUs from '../pages/ContactUs/ContactUs';
import Team from '../pages/Team/Team';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
};

export default AppRouter;
