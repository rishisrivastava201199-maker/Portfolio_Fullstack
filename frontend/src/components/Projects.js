import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'GST Management Platform',
    description: 'A centralized GST management platform for CA firms and businesses with return handling, document management and dynamic dashboards.',
    technologies: 'Django,React,MySQL,REST API',
    category: 'Full Stack',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: true,
  },
  {
    id: 2,
    title: 'AI Voice Analytics Platform',
    description: 'AI-powered voice analytics and document intelligence using LLM, RAG and speech technologies with real-time diarization.',
    technologies: 'FastAPI,LLM,RAG,Python,Deepgram',
    category: 'AI / ML',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Banking System',
    description: 'A secure and scalable banking system with user management, transactions, and admin dashboards built with Django.',
    technologies: 'Django,Python,MySQL,Bootstrap',
    category: 'Full Stack',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Medical Management System',
    description: 'Hospital management system with patient records, appointments, billing and analytics built with React and Django.',
    technologies: 'Django,MySQL,JavaScript,React',
    category: 'Full Stack',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Flight Booking Platform',
    description: 'Flight search, booking, payment integration and real-time seat management system with Django backend.',
    technologies: 'Django,JavaScript,MySQL,Bootstrap',
    category: 'Backend',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: false,
  },
  {
    id: 6,
    title: 'AI Chatbot Analytics Dashboard',
    description: 'Analytics dashboard for chatbot insights with charts, reports and conversation tracking using Python and Chart.js.',
    technologies: 'Python,Django,Chart.js,PostgreSQL',
    category: 'AI / ML',
    github_link: 'https://github.com/rishisrivastava11',
    live_link: null,
    featured: false,
  },
];

const BADGE_MAP = {
  'Full Stack': 'badge-fullstack',
  'AI / ML': 'badge-ai',
  'Backend': 'badge-backend',
};

const EMOJI_MAP = {
  'Full Stack': '🖥️',
  'AI / ML': '🤖',
  'Backend': '⚙️',
};

const FILTERS = ['All', 'Full Stack', 'AI / ML', 'Backend'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.getProjects()
      .then(d => setProjects(d.length ? d : FALLBACK_PROJECTS))
      .catch(() => setProjects(FALLBACK_PROJECTS));
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  // Run the fade-in observer AFTER the project cards are actually
  // rendered (data loads asynchronously, and the list changes whenever
  // the filter or "show all" toggle changes). The global Home.js observer
  // runs once on mount and never sees these dynamically-added cards.
  useEffect(() => {
    if (!sectionRef.current || displayed.length === 0) return;

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
  }, [displayed]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">MY WORK</div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="projects-filter">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => { setFilter(f); setShowAll(false); }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {displayed.map((project, idx) => {
            const techs = (project.technologies || '').split(',').map(t => t.trim()).filter(Boolean);
            const badge = BADGE_MAP[project.category] || 'badge-fullstack';
            const emoji = EMOJI_MAP[project.category] || '💻';

            return (
              <div className="project-card fade-in-up" key={project.id}
                style={{ animationDelay: `${(idx % 3) * 0.1}s` }}>
                {/* Thumbnail */}
                <div className="project-thumbnail">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="project-thumbnail-placeholder">{emoji}</div>
                  )}
                </div>

                {/* Body */}
                <div className="project-body">
                  <span className={`project-category-badge ${badge}`}>
                    {project.category || 'Full Stack'}
                  </span>
                  <div className="project-title">{project.title}</div>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-tech">
                    {techs.map((t, i) => (
                      <span className="tech-tag" key={i}>{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                        title="GitHub"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        {filtered.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-outline" onClick={() => setShowAll(p => !p)}>
              {showAll ? 'Show Less' : `View All Projects →`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;