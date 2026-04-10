"use client";

import { useEffect, useState } from "react";
import { dashboardContent, slides } from "../lib/dashboard-content";

const ROTATION_MS = 30_000;

function formatClock(date) {
  return new Intl.DateTimeFormat("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ms-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function TVDashboard() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [cycleStartedAt, setCycleStartedAt] = useState(Date.now());

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
      setCycleStartedAt(Date.now());
    }, ROTATION_MS);

    return () => window.clearInterval(slideTimer);
  }, []);

  const activePoster = slides[activeSlide];
  const remainingMs = Math.max(0, ROTATION_MS - (Date.now() - cycleStartedAt));
  const progress = (remainingMs / ROTATION_MS) * 100;

  return (
    <main className="screen-shell">
      <section className="screen-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard TV Sekolah</p>
            <h1>{dashboardContent.schoolName}</h1>
          </div>
          <div className="clock-card">
            <span className="clock-time">{formatClock(now)}</span>
            <span className="clock-date">{formatDate(now)}</span>
          </div>
        </header>

        <section className="hero-grid">
          <article
            className={`poster-card poster-${activePoster.theme}`}
            key={activePoster.id}
          >
            <div className="poster-glow" />
            <div className="poster-content">
              <div className="poster-label-row">
                <span className="poster-label">{activePoster.label}</span>
                <span className="poster-interval">Auto rotate 30 saat</span>
              </div>

              <div className="poster-body">
                <div>
                  <p className="poster-kicker">{activePoster.kicker}</p>
                  <h2>{activePoster.title}</h2>
                  <p className="poster-description">{activePoster.description}</p>
                </div>

                {activePoster.type === "announcement" ? (
                  <div className="announcement-layout">
                    <div className="highlight-box">
                      <span className="highlight-caption">Perhatian</span>
                      <strong>{activePoster.highlight}</strong>
                    </div>
                    <div className="info-list">
                      {activePoster.items.map((item) => (
                        <div className="info-item" key={item.title}>
                          <span>{item.title}</span>
                          <strong>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="prayer-layout">
                    <div className="prayer-grid">
                      {activePoster.prayerTimes.map((prayer) => (
                        <div className="prayer-card" key={prayer.name}>
                          <span>{prayer.name}</span>
                          <strong>{prayer.time}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="info-list compact">
                      {activePoster.notes.map((note) => (
                        <div className="info-item" key={note.title}>
                          <span>{note.title}</span>
                          <strong>{note.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>

          <aside className="side-panel">
            <div className="mini-card">
              <p className="eyebrow">Sedang Dipaparkan</p>
              <h3>{activePoster.label}</h3>
              <p>{activePoster.sideNote}</p>
            </div>

            <div className="mini-card">
              <p className="eyebrow">Seterusnya</p>
              <div className="queue-list">
                {slides.map((slide, index) => (
                  <div
                    className={`queue-item ${index === activeSlide ? "active" : ""}`}
                    key={slide.id}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{slide.label}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="mini-card">
              <p className="eyebrow">Maklumat Ringkas</p>
              <div className="ticker-list">
                {dashboardContent.quickInfo.map((item) => (
                  <div className="ticker-item" key={item.title}>
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <footer className="bottombar">
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
          <div className="footer-meta">
            <span>{dashboardContent.tagline}</span>
            <span>{dashboardContent.location}</span>
          </div>
        </footer>
      </section>
    </main>
  );
}
