import React from "react";
import "../style/home.scss";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <h1 className="hero-title">
          Create Your Custom <span>Interview Plan</span>
        </h1>
        <p className="hero-subtitle">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </section>

      <section className="interview-card">
        <div className="interview-grid">
          <div className="panel left-panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <span className="panel-icon">⌘</span>
                <h2>Target Job Description</h2>
              </div>
              <span className="pill">Required</span>
            </div>

            <label className="field-label" htmlFor="jobDescription">
              Paste the full job description here
            </label>

            <textarea
              id="jobDescription"
              name="jobDescription"
              className="textarea large-textarea"
              placeholder="e.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."
            />

            <div className="char-count">0 / 5000 chars</div>
          </div>

          <div className="panel right-panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <span className="panel-icon">◎</span>
                <h2>Your Profile</h2>
              </div>
            </div>

            <div className="sub-section">
              <div className="sub-section-header">
                <h3>Upload Resume</h3>
                <span className="pill soft-pill">Best Results</span>
              </div>

              <label className="upload-box" htmlFor="resume">
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                />
                <div className="upload-icon">⇪</div>
                <p>Click to upload or drag & drop</p>
                <span>PDF or DOCX (Max 5MB)</span>
              </label>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="sub-section">
              <label className="field-label" htmlFor="selfDescription">
                Quick Self-Description
              </label>
              <textarea
                id="selfDescription"
                name="selfDescription"
                className="textarea short-textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            <div className="info-box">
              <span className="info-dot" />
              <p>
                Either a <strong>Resume</strong> or a <strong>Self Description</strong>{" "}
                is required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <p>AI-Powered Strategy Generation • Approx 30s</p>
          <button className="generate-btn" type="button">
            ★ Generate My Interview Strategy
          </button>
        </div>
      </section>

      <footer className="page-footer">
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
        <a href="/">Help Center</a>
      </footer>
    </main>
  );
}

export default Home;