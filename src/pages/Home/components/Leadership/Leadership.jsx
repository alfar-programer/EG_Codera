/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import './Leadership.css';

const LEADERSHIP_MEMBERS = [
  {
    id: 1,
    name: "Alex Showrab",
    role: "Project Manager",
    description: "Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    flowerColor: "#4A5D3F"
  },
  {
    id: 2,
    name: "Alex Showrab",
    role: "Project Manager",
    description: "Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    flowerColor: "#D4E157",
    hasBadge: true
  },
  {
    id: 3,
    name: "Alex Showrab",
    role: "Project Manager",
    description: "Alex is a creator with a cause: making finance simple and accessible for all. A Brit with a European take on how to shake up the finance system.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    flowerColor: "#3D4A35"
  }
];

const FlowerMask = ({ color, image, hasBadge }) => {
  return (
    <div className="leadership-flower-wrapper" style={{ '--flower-color': color }}>
      {/* Flower Shape Background - 6 Elongated Petals */}
      <svg viewBox="0 0 200 200" className="leadership-flower-shape">
        <g transform="translate(100, 100)">
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <rect
              key={angle}
              x="-28"
              y="-85"
              width="56"
              height="100"
              rx="28"
              transform={`rotate(${angle})`}
              className="leadership-flower-petal"
            />
          ))}
          <circle cx="0" cy="0" r="45" className="leadership-flower-center" />
        </g>
      </svg>
      
      {/* Profile Image masked into circle */}
      <div className="leadership-flower-image-container">
        <div className="leadership-flower-image-wrapper">
          <img 
            src={image} 
            alt="Profile" 
            className="leadership-flower-image"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Let's Talk Badge */}
      {hasBadge && (
        <motion.button 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="leadership-badge"
          aria-label="Let's Talk"
        >
          <ArrowUpRight className="leadership-badge-icon" />
          <span className="leadership-badge-text">Let's Talk</span>
        </motion.button>
      )}
    </div>
  );
};

const Leadership = () => {
  return (
    <section className="leadership-section">
      <div className="leadership-container">
        
        {/* Left Column: Sticky Heading */}
        <aside className="leadership-sidebar">
          <div className="leadership-header">
            <div className="leadership-label">
              <span className="leadership-label-dot" />
              Leadership
            </div>
            <h1 className="leadership-title">
              Meet the <br />
              <span className="leadership-title-accent">
                <span className="leadership-title-line" />
                Leadership
              </span>
            </h1>
          </div>

          {/* Abstract 3D Spiral Animation */}
          <div className="leadership-spiral-wrapper">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="leadership-spiral"
            >
              <img 
                src="/src/assets/images/logo.png" 
                alt="Glass Spiral"
                className="leadership-spiral-image"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </aside>

        {/* Right Column: Members List */}
        <div className="leadership-members">
          {LEADERSHIP_MEMBERS.map((member, index) => (
            <motion.article 
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="leadership-member"
            >
              <div className="leadership-member-content">
                <div className="leadership-member-info">
                  <h2 className="leadership-member-name">
                    {member.name}
                  </h2>
                  <p className="leadership-member-role">
                    {member.role}
                  </p>
                </div>
                <p className="leadership-member-description">
                  {member.description}
                </p>
              </div>
              
              <FlowerMask 
                color={member.flowerColor} 
                image={member.image} 
                hasBadge={member.hasBadge} 
              />
            </motion.article>
          ))}
        </div>
      </div>

      {/* Background Visual Flair */}
      <div className="leadership-background-effects">
        <div className="leadership-bg-glow leadership-bg-glow--top" />
        <div className="leadership-bg-glow leadership-bg-glow--bottom" />
      </div>
    </section>
  );
};

export default Leadership;