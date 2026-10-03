import React from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'Web Development',
  'Backend Development',
  'AI Solutions',
  'API Development',
  'Database Design',
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      padding: '60px 0 0',
    }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="footer-logo">R<span>S</span></div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Building scalable solutions and digital experiences that make an impact.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://linkedin.com/in/rishi-srivastava" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/rishisrivastava11" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                <FaGithub />
              </a>
              <a href="mailto:rishisrivastava201199@gmail.com" className="social-icon-link">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s, i) => (
                <li key={i}><a href="#contact">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact-col">
            <h4>Let's Connect</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <FaEnvelope style={{ color: 'var(--purple-light)', flexShrink: 0 }} />
                <a href="mailto:rishisrivastava201199@gmail.com">rishisrivastava201199@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <FaPhone style={{ color: 'var(--purple-light)', flexShrink: 0 }} />
                <a href="tel:6392517523">6392517523</a>
              </div>
              <div className="footer-contact-item">
                <FaMapMarkerAlt style={{ color: 'var(--purple-light)', flexShrink: 0 }} />
                <span>Gurugram, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>© {new Date().getFullYear()} Rishi Srivastava. All rights reserved.</span>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top <FaArrowUp style={{ fontSize: '0.7rem' }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
