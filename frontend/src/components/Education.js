import React, { useEffect, useState } from 'react';
import api from '../services/api';

// ---- Fallback data (used until the backend data is available) -------------
const FALLBACK_EDUCATION = [
  {
    id: 'college',
    institution: 'Noida Institute of Engineering & Technology (NIET)',
    location: 'Greater Noida, Uttar Pradesh',
    degree: 'Bachelor of Technology (B.Tech)',
    stream: 'Computer Science and Engineering',
    cgpa: 7.6,
    max_cgpa: 10,
    start_year: 2019,
    end_year: 2023,
  },
];

const FALLBACK_SCHOOL = [
  {
    id: 'class12',
    level: '12',
    level_display: 'Class 12',
    school_name: 'Your School Name',
    board: 'CBSE',
    stream: 'PCM',
    percentage: 0,
    start_year: 0,
    end_year: 0,
  },
  {
    id: 'class10',
    level: '10',
    level_display: 'Class 10',
    school_name: 'Your School Name',
    board: 'CBSE',
    stream: '',
    percentage: 0,
    start_year: 0,
    end_year: 0,
  },
];

const FALLBACK_CERTIFICATIONS = [
  { id: 1, name: 'Python for Data Science', provider: 'Coursera', icon: '🐍' },
  { id: 2, name: 'Machine Learning', provider: 'Coursera', icon: '🤖' },
  { id: 3, name: 'AWS Cloud Practitioner', provider: 'AWS', icon: '☁️' },
  { id: 4, name: 'Deep Learning Specialization', provider: 'deeplearning.ai', icon: '🧠' },
];

const FALLBACK_ACHIEVEMENTS = [
  {
    id: 'hr', platform: 'HackerRank', username: 'rishisrivastava11',
    profile_url: '#', logo_text: 'HR', color: '#00ea64',
    stat: '5 Star', stat_label: 'Python', github_stats: [],
  },
  {
    id: 'lc', platform: 'LeetCode', username: 'rishisrivastava11',
    profile_url: '#', logo_text: 'LC', color: '#ffa116',
    stat: '1200+', stat_label: 'Problems Solved', github_stats: [],
  },
  {
    id: 'gh', platform: 'GitHub', username: 'rishisrivastava11',
    profile_url: 'https://github.com/rishisrivastava11', logo_text: 'GH', color: '#e6edf3',
    stat: 'Active', stat_label: 'Contributor',
    github_stats: [
      { id: 1, label: 'Repos', value: '24' },
      { id: 2, label: 'Followers', value: '12' },
      { id: 3, label: 'Following', value: '18' },
      { id: 4, label: 'Contributions', value: '300+' },
    ],
  },
  {
    id: 'cc', platform: 'CodeChef', username: 'rishisrivastava11',
    profile_url: '#', logo_text: 'CC', color: '#b8874a',
    stat: '3 Star', stat_label: 'Rating', github_stats: [],
  },
];

const Education = () => {
  const [education, setEducation] = useState(FALLBACK_EDUCATION);
  const [schools, setSchools] = useState(FALLBACK_SCHOOL);
  const [certifications, setCertifications] = useState(FALLBACK_CERTIFICATIONS);
  const [achievements, setAchievements] = useState(FALLBACK_ACHIEVEMENTS);

  useEffect(() => {
    api.getEducation?.()
      .then(d => { if (Array.isArray(d) && d.length) setEducation(d); })
      .catch(() => {});

    api.getSchoolEducation?.()
      .then(d => { if (Array.isArray(d) && d.length) setSchools(d); })
      .catch(() => {});

    api.getCertifications?.()
      .then(d => { if (Array.isArray(d) && d.length) setCertifications(d); })
      .catch(() => {});

    api.getAchievements?.()
      .then(d => { if (Array.isArray(d) && d.length) setAchievements(d); })
      .catch(() => {});
  }, []);

  return (
    <section id="education" style={{ paddingBottom: 0 }}>
      <div className="container">
        {/* Top row: Education + Certifications — equal width, scrollable */}
        <div className="edu-certs-row">

          {/* Education */}
          <div className="scroll-card fade-in-up">
            <div className="section-eyebrow">MY EDUCATION</div>
            <h2 className="extras-title">Education</h2>

            <div className="scroll-card-body">
              <div className="edu-list">
                {/* College / University */}
                {education.map((edu) => (
                  <div className="edu-entry" key={edu.id || edu.institution}>
                    <div className="edu-entry-icon">🎓</div>
                    <div className="edu-institution">{edu.institution}</div>
                    {edu.location && <div className="edu-location">{edu.location}</div>}
                    <div className="edu-degree">{edu.degree}</div>
                    {edu.stream && <div className="edu-stream">{edu.stream}</div>}
                    {(edu.start_year || edu.end_year) && (
                      <div className="edu-years">{edu.start_year || '—'} – {edu.end_year || 'Present'}</div>
                    )}
                    {edu.cgpa != null && (
                      <div className="edu-cgpa">
                        <span className="cgpa-label">CGPA</span>
                        <span className="cgpa-value">{edu.cgpa} <span>/ {edu.max_cgpa || 10}</span></span>
                      </div>
                    )}
                  </div>
                ))}

                {/* School (Class 10 / 12) */}
                {schools.map((sch) => (
                  <div className="edu-entry" key={sch.id || sch.level}>
                    <div className="edu-entry-icon">🏫</div>
                    <div className="edu-institution">{sch.school_name}</div>
                    <div className="edu-location">
                      {sch.level_display || `Class ${sch.level}`}{sch.board ? ` · ${sch.board}` : ''}
                    </div>
                    {sch.stream && <div className="edu-stream">{sch.stream}</div>}
                    <div className="edu-years">{sch.start_year} – {sch.end_year}</div>
                    <div className="edu-cgpa">
                      <span className="cgpa-label">Percentage</span>
                      <span className="cgpa-value">{sch.percentage}<span>%</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="scroll-card fade-in-up stagger-2">
            <div className="section-eyebrow">MY CERTIFICATIONS</div>
            <h2 className="extras-title">Certifications</h2>

            <div className="scroll-card-body">
              <div className="certs-grid">
                {certifications.map((cert) => (
                  <div className="cert-item" key={cert.id || cert.name}>
                    {cert.image ? (
                      <img src={cert.image} alt={cert.name} className="cert-image" />
                    ) : (
                      <div className="cert-image-placeholder">{cert.icon || '🏆'}</div>
                    )}
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-provider">{cert.provider}</div>
                  </div>
                ))}
              </div>

              <a href="#" className="certs-view-link">View All Certifications →</a>
            </div>
          </div>
        </div>

        {/* Achievements — full width, matches the combined width of the row above */}
        <div className="achievements-card-full fade-in-up stagger-3">
          <div className="section-eyebrow">MY ACHIEVEMENTS</div>
          <h2 className="extras-title">Achievements</h2>

          <div className="achievement-platforms">
            {achievements.map((a) => (
              <div className="achievement-platform" key={a.id || a.platform}>
                {a.github_stats && a.github_stats.length > 0 ? (
                  <div className="github-substats">
                    {a.github_stats.map((g) => (
                      <div className="github-substat" key={g.id || g.label}>
                        <div className="platform-stat">{g.value}</div>
                        <div className="platform-stat-label">{g.label}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="platform-logo" style={{ color: a.color }}>{a.logo_text}</div>
                    <div className="platform-stat">{a.stat}</div>
                    <div className="platform-stat-label">{a.stat_label}</div>
                  </>
                )}
                <div className="platform-name">{a.platform}</div>
                {a.profile_url && a.profile_url !== '#' && (
                  <a
                    href={a.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-username-link"
                  >
                    @{a.username}
                  </a>
                )}
              </div>
            ))}
          </div>

          <a href="#" className="certs-view-link">View All Achievements →</a>
        </div>
      </div>
    </section>
  );
};

export default Education;