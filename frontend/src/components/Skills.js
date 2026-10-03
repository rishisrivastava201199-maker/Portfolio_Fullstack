import React, { useEffect, useState } from 'react';
import api from '../services/api';

// Fallback skill icons using devicons CDN
const SKILL_ICONS = [
  { name: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', invert: true },
  { name: 'FastAPI',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'PostgreSQL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Docker',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'AWS',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'LangChain',    icon: '🦜', emoji: true },
  { name: 'Redis',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
];

const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    color: '#60a5fa',
    items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    color: '#34d399',
    items: ['Django', 'FastAPI', 'REST API', 'Python', 'Celery', 'Jinja2'],
  },
  {
    title: 'Database',
    color: '#f59e0b',
    items: ['MySQL', 'PostgreSQL', 'ChromaDB', 'SQLAlchemy', 'SQLite', 'Redis'],
  },
  {
    title: 'Tools & DevOps',
    color: '#c084fc',
    items: ['Docker', 'Git & GitHub', 'Linux', 'Postman', 'JIRA', 'GitHub Actions'],
  },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.getSkills().then(d => setSkills(d)).catch(() => {});
  }, []);

  const displayIcons = showAll ? SKILL_ICONS : SKILL_ICONS.slice(0, 12);

  return (
    <section id="skills">
      <div className="container">
        {/* Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>WHAT I WORK WITH</div>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
        </div>

        {/* Icon Grid */}
        <div className="skills-icon-grid fade-in-up">
          {displayIcons.map((skill, i) => (
            <div className="skill-icon-card" key={i}>
              {skill.emoji ? (
                <span style={{ fontSize: '2.5rem' }}>{skill.icon}</span>
              ) : (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-icon-img"
                  style={skill.invert ? { filter: 'invert(1) drop-shadow(0 0 8px rgba(139,92,246,0.3))' } : {}}
                />
              )}
              <span className="skill-icon-name">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* View All Toggle */}
        <div className="skills-view-btn">
          <button className="btn-outline" onClick={() => setShowAll(p => !p)}>
            {showAll ? 'Show Less' : 'View All Skills'}
          </button>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="tech-stack-section">
          <div className="section-header centered" style={{ marginBottom: 0 }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>TECH STACK</div>
            <h2 className="section-title">
              Technologies <span className="gradient-text">I Use</span>
            </h2>
          </div>

          <div className="tech-categories">
            {TECH_CATEGORIES.map((cat, i) => (
              <div className="tech-category fade-in-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div
                  className="tech-category-title"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </div>
                <div className="tech-list">
                  {cat.items.map((item, j) => (
                    <div className="tech-list-item" key={j}>
                      <div className="tech-list-item-dot" style={{ background: cat.color }}></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
