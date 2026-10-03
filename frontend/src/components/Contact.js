import React, { useState } from 'react';
import api from '../services/api';

const CONTACT_CARDS = [
  {
    icon: '✉',
    label: 'Email Me',
    value: 'rishisrivastava201199@gmail.com',
    href: 'mailto:rishisrivastava201199@gmail.com',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'linkedin.com/in/rishi-srivastava',
    href: 'https://linkedin.com/in/rishi-srivastava',
  },
  {
    icon: '⌥',
    label: 'GitHub',
    value: 'github.com/rishisrivastava11',
    href: 'https://github.com/rishisrivastava11',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await api.submitMessage(form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-glow" />
      <div className="container">
        <div className="contact-header">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>GET IN TOUCH</div>
          <h2>
            Let's Build Something Amazing{' '}
            <span className="gradient-text">Together!</span>
          </h2>
          <p>I'm currently open to new opportunities. My inbox is always open.</p>
        </div>

        <div className="contact-layout">
          {/* Small astronaut on the seam between the two columns */}
          <div className="contact-astronaut-float">🧑‍🚀</div>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="contact-cards">
              {CONTACT_CARDS.map((card, i) => (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  key={i}
                >
                  <div className="contact-card-icon">{card.icon}</div>
                  <div className="contact-card-text">
                    <h4>{card.label}</h4>
                    <p>{card.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-card">
            {success ? (
              <div className="form-success">
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                  Thanks for reaching out! I'll get back to you soon.
                </p>
                <button className="btn-outline" onClick={() => setSuccess(false)} style={{ marginTop: 20 }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 24 }}>
                  Send a Message
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text" name="name" className="form-input"
                      placeholder="Your name" value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email" name="email" className="form-input"
                      placeholder="your@email.com" value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Subject</label>
                  <input
                    type="text" name="subject" className="form-input"
                    placeholder="What's this about?" value={form.subject} onChange={handleChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message" className="form-textarea"
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {error && (
                  <p style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: 12 }}>{error}</p>
                )}

                <button className="form-submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;