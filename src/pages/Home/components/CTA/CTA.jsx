import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-box">
        <div className="cta-gradient"></div>
        <h2 className="cta-h2">Elevate the way you source design</h2>
        <p className="cta-sub">Get ready to start producing stunning, efficient design work without the hassles of hiring. Soon available.</p>
        <div className="cta-form">
          <input type="email" placeholder="johndoe@email.com" />
          <button className="btn-notify">Get notified</button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
