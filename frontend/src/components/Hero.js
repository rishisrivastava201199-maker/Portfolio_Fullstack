import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import api from '../services/api';

const Hero = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.getAbout()
      .then(d => setAbout(Array.isArray(d) ? d[0] : d))
      .catch(() => {});
  }, []);

  const stats = [
    { number: about?.experience_years ? `${about.experience_years}+` : '2+', label: 'Years Experience' },
    { number: about?.projects_completed ? `${about.projects_completed}+` : '10+', label: 'Projects Completed' },
    { number: about?.technologies_count ? `${about.technologies_count}+` : '15+', label: 'Technologies' },
    { number: '1', label: 'Ongoing Project' },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>

      <div className="hero-content">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-greeting">
            👋 Hello, I'm
          </div>

          <h1 className="hero-name">
            Rishi <span>Srivastava</span>
          </h1>

          <h2 className="hero-title">
            <span className="role">Full Stack</span> Developer
          </h2>

          <p className="hero-bio">
            {about?.description ||
              'I build scalable web applications and AI-powered solutions using modern technologies. Passionate about clean code, system design, backend engineering, and solving real-world business problems.'}
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>

          {/* Social */}
          <div className="hero-social">
            <span className="hero-social-label">Connect with me</span>
            <div className="hero-social-links">
              <a
                href="https://linkedin.com/in/rishi-srivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/rishisrivastava11"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:rishisrivastava201199@gmail.com"
                className="social-icon-link"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — Profile Image */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="hero-image-ring"></div>
            <div className="hero-image-ring-2"></div>
            <div className="hero-image-container">
              {about?.profile_image ? (
                <img src={about.profile_image} alt="Rishi Srivastava" />
              ) : (
                <div className="hero-image-placeholder">👨‍💻</div>
              )}
            </div>
            <div className="hero-dot hero-dot-1"></div>
            <div className="hero-dot hero-dot-2"></div>
          </div>
        </div>

        {/* Stats Bar — full width, below both columns */}
        <div className="hero-stats">
          {stats.map((s, i) => (
            <div className="hero-stat" key={i}>
              <span className="hero-stat-number">{s.number}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;