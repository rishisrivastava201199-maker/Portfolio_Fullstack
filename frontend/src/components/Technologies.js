

import React from "react";
import "./TechStack.css";

export default function TechStack() {

  return (
    <section className="tech-stack card">

      <span className="section-tag">
        ⚙ TECH STACK
      </span>

      <h2>Technologies I Use</h2>

      <div className="tech-grid">

        <div className="tech-card">
          <h3>🎨 Frontend</h3>

          <p>⚛ React</p>
          <p>🟨 JavaScript</p>
          <p>🌐 HTML5</p>
          <p>🎨 CSS3</p>
          <p>💨 Tailwind</p>

        </div>

        <div className="tech-card">
          <h3>⚙ Backend</h3>

          <p>🐍 Django</p>
          <p>🚀 FastAPI</p>
          <p>🔌 REST API</p>
          <p>🐍 Python</p>

        </div>

        <div className="tech-card">
          <h3>🗄 Database</h3>

          <p>🐬 MySQL</p>
          <p>🐘 PostgreSQL</p>
          <p>🍃 MongoDB</p>

        </div>

        <div className="tech-card">
          <h3>☁ DevOps</h3>

          <p>🐳 Docker</p>
          <p>🌿 GitHub</p>
          <p>🐧 Linux</p>
          <p>☁ AWS</p>

        </div>

      </div>

    </section>
  );
}