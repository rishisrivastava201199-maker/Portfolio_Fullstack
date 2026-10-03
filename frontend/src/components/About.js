import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TRAITS = [
  { icon: '⚡', label: 'Problem solver — breaks complex problems into elegant solutions' },
  { icon: '✦', label: 'Clean code advocate — readable, maintainable, and scalable' },
  { icon: '⬡', label: 'System design enthusiast — loves architecture and patterns' },
  { icon: '◎', label: 'Always learning — exploring AI, cloud, and new stacks' },
];

const About = () => {
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.getAbout().then(d => setAbout(Array.isArray(d) ? d[0] : d)).catch(() => {});
    api.getContact().then(d => setContact(Array.isArray(d) ? d[0] : d)).catch(() => {});
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          {/* LEFT — Text */}
          <div className="about-text fade-in-up">
            <div className="section-eyebrow">WHO I AM</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>
              About <span className="gradient-text">Me</span>
            </h2>

            <p>
              {about?.description ||
                'Software Engineer with 2+ years of experience building scalable backend systems and AI-powered applications. Proficient in Python, FastAPI, Django, and REST API development, with hands-on experience in RAG-based solutions and LLM integrations.'}
            </p>

            <p style={{ marginTop: -8 }}>
              Currently working at AnuBrain Technology, building a centralized GST management platform
              for CA firms. I love turning complex business requirements into clean, efficient code.
            </p>

            <div className="about-traits">
              {TRAITS.map((t, i) => (
                <div className="about-trait" key={i}>
                  <div className="about-trait-icon">{t.icon}</div>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>

            <div className="about-download">
              <a
                href={about?.cv_file || '/resume.pdf'}
                download
                className="btn-primary"
              >
                ↓ Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT — Profile Card + Info */}
          <div className="about-right fade-in-up stagger-2">
            <div className="about-profile-card">
              <div className="about-profile-image">
                {about?.profile_image ? (
                  <img src={about.profile_image} alt="Rishi Srivastava" />
                ) : (
                  <div className="about-profile-image-placeholder">👤</div>
                )}
              </div>
              <div className="about-signature">
                <div className="about-signature-name">{about?.name || 'Rishi Srivastava'}</div>
                <div className="about-signature-title">Full Stack Developer</div>
              </div>
            </div>

            <div className="about-info-cards">
              <div className="about-info-item">
                <div className="about-info-icon">📍</div>
                <div className="about-info-content">
                  <div className="about-info-label">Location</div>
                  <div className="about-info-value">Gurugram, India</div>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-info-icon">✉</div>
                <div className="about-info-content">
                  <div className="about-info-label">Email</div>
                  <div className="about-info-value">
                    {contact?.email || 'rishisrivastava201199@gmail.com'}
                  </div>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-info-icon">📞</div>
                <div className="about-info-content">
                  <div className="about-info-label">Phone</div>
                  <div className="about-info-value">{contact?.phone || '6392517523'}</div>
                </div>
              </div>

              <div className="about-info-item">
                <div className="about-info-icon">●</div>
                <div className="about-info-content">
                  <div className="about-info-label">Availability</div>
                  <div className="about-info-value">
                    <span className="availability-badge">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
