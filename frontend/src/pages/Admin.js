import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  const fetchMessages = async () => {
    try {
      const data = await api.getMessages();
      setMessages(data);
    } catch {
      setToken('');
      localStorage.removeItem('token');
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await api.login(username, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setLoginError('');
    } catch {
      setLoginError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessages([]);
  };

  if (!token) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg-primary)', padding: 24,
      }}>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)', padding: 40, width: '100%', maxWidth: 400,
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Admin Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 28 }}>
            Sign in to view messages
          </p>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Username</label>
            <input
              type="text" className="form-input" value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Password</label>
            <input
              type="password" className="form-input" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {loginError && (
            <p style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: 12 }}>{loginError}</p>
          )}

          <button className="form-submit" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)' }}>
            Messages <span className="gradient-text">({messages.length})</span>
          </h1>
          <button className="btn-outline" onClick={handleLogout}>Logout</button>
        </div>

        {messages.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: 60, color: 'var(--text-muted)',
            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
          }}>
            No messages yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${msg.read ? 'var(--border)' : 'rgba(139,92,246,0.3)'}`,
                borderRadius: 'var(--radius-lg)', padding: 24,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{msg.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 8, fontSize: '0.82rem' }}>
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(msg.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                {msg.subject && (
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--purple-light)', marginBottom: 8 }}>
                    {msg.subject}
                  </div>
                )}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {msg.message}
                </p>
                {!msg.read && (
                  <span style={{
                    display: 'inline-block', marginTop: 10, padding: '2px 10px',
                    background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)',
                    borderRadius: 20, fontSize: '0.7rem', color: 'var(--purple-light)', fontWeight: 600,
                  }}>
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
