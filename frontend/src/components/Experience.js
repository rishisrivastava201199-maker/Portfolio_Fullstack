import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';

const FALLBACK_EXPERIENCE = [
  {
    id: 1,
    company: 'AnuBrain Technology Noida',
    position: 'Full-stack Developer',
    start_date: '2025-12-01',
    end_date: null,
    current: true,
    description:
      'Developing a centralized GST management platform for CA firms and businesses.\nBuilding scalable backend modules using Django and React.js.\nImplementing GST return handling, document management and secure file processing.\nDeveloping dashboards and report generation features to simplify operations.',
  },
  {
    id: 2,
    company: 'Cogent E Services Noida',
    position: 'Executive Software Engineer',
    start_date: '2024-12-01',
    end_date: '2025-12-01',
    current: false,
    description:
      'Built AI-powered voice analytics and document intelligence applications.\nIntegrated Deepgram and Azure AI Speech Services for STT and diarization.\nImplemented LLaMA3.2-powered summarization and contextual search.\nBuilt scalable APIs and data pipelines using asyncio and Celery.',
  },
  {
    id: 3,
    company: 'NovoStack Noida',
    position: 'Backend Developer (Internship)',
    start_date: '2023-12-01',
    end_date: '2024-09-01',
    current: false,
    description:
      'Developed REST APIs using FastAPI & SQLAlchemy for loan management.\nBuilt OCR system using PyTesseract for document data extraction.\nImproved backend performance and API structure.',
  },
];

const getInitials = (company) =>
  company.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

const formatDate = (dateStr, current) => {
  if (current) return 'Present';
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Safety net: if the same company+position combo exists more than once
// (e.g. accidental duplicate entries added in Django admin), keep only
// the one with the longest/most detailed description.
const dedupeExperiences = (list) => {
  const map = new Map();
  list.forEach(exp => {
    const key = `${(exp.company || '').trim().toLowerCase()}__${(exp.position || '').trim().toLowerCase()}`;
    const existing = map.get(key);
    const currentLen = (exp.description || '').length;
    const existingLen = existing ? (existing.description || '').length : -1;
    if (!existing || currentLen > existingLen) {
      map.set(key, exp);
    }
  });
  return Array.from(map.values());
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.getExperience()
      .then(d => setExperiences(d.length ? dedupeExperiences(d) : FALLBACK_EXPERIENCE))
      .catch(() => setExperiences(FALLBACK_EXPERIENCE));
  }, []);

  // Run the fade-in observer AFTER the experience items are actually
  // rendered (data loads asynchronously, so the global Home.js observer
  // runs too early and never sees these elements).
  useEffect(() => {
    if (!sectionRef.current || experiences.length === 0) return;

    const elements = sectionRef.current.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [experiences]);

  const sorted = [...experiences].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

  return (
    <section id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">MY JOURNEY</div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="experience-timeline">
          {sorted.map((exp, idx) => {
            const bullets = exp.description.split('\n').map(s => s.trim()).filter(Boolean);
            const dateRange = `${formatDate(exp.start_date, false)} – ${exp.current ? 'Present' : formatDate(exp.end_date, false)}`;

            return (
              <div className={`exp-item fade-in-up stagger-${(idx % 4) + 1}`} key={exp.id}>
                <div className="exp-dot-wrapper">
                  <div className="exp-avatar">{getInitials(exp.company)}</div>
                </div>
                <div className="exp-content">
                  <div className="exp-header">
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-date">{dateRange}</div>
                  </div>
                  <div className="exp-role">{exp.position}</div>
                  <ul className="exp-bullets">
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="exp-cta">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
            View Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;