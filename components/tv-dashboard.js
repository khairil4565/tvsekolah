"use client";

import { useEffect, useState } from "react";
import { dashboardContent, mosqueSlides } from "../lib/dashboard-content";

const SLIDE_DURATION_MS = 12_000;
const CARD_ROTATION_MS = 30_000;

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
  const [activeCard, setActiveCard] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % mosqueSlides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const cardTimer = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % 2);
    }, CARD_ROTATION_MS);

    return () => window.clearInterval(cardTimer);
  }, []);

  const slide = mosqueSlides[activeSlide];
  const isPrayerCard = activeCard === 0;
  const tickerText = isPrayerCard
    ? dashboardContent.tickerText
    : dashboardContent.announcement.tickerText;

  return (
    <main className="screen-shell">
      <section className="screen-frame">
        <article className={`display-card ${isPrayerCard ? "card-prayer" : "card-announcement"}`}>
          <div className="display-visual">
            {mosqueSlides.map((item, index) => (
              <div
                aria-hidden={index !== activeSlide}
                className={`visual-slide ${index === activeSlide ? "active" : ""}`}
                key={item.id}
              >
                <img
                  alt={item.alt}
                  className="visual-image"
                  draggable="false"
                  src={item.image}
                />
              </div>
            ))}

            <div className="visual-overlay" />

            <div className="display-header">
              <div className="school-block">
                <p className="school-label">Paparan TV Sekolah</p>
                <h1>{dashboardContent.schoolName}</h1>
              </div>

              <div className="time-block">
                <strong>{formatClock(now)}</strong>
                <span>{formatDate(now)}</span>
              </div>
            </div>

            <div className="visual-caption">
              <div className="caption-card">
                {isPrayerCard ? (
                  <>
                    <span>{slide.caption}</span>
                    <small>{slide.credit}</small>
                  </>
                ) : (
                  <>
                    <span>{dashboardContent.announcement.label}</span>
                    <strong className="announcement-title">
                      {dashboardContent.announcement.title}
                    </strong>
                    <small>{dashboardContent.announcement.description}</small>
                  </>
                )}
              </div>
            </div>
          </div>

          {isPrayerCard ? (
            <div className="prayer-strip">
              {dashboardContent.prayerTimes.map((prayer) => (
                <div className="prayer-tile" key={prayer.name}>
                  <span>{prayer.name}</span>
                  <strong>{prayer.time}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="prayer-strip announcement-strip">
              {dashboardContent.announcement.details.map((detail) => (
                <div className="prayer-tile" key={detail.name}>
                  <span>{detail.name}</span>
                  <strong>{detail.value}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="ticker-bar">
            <div className="ticker-track">
              <span>{tickerText}</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
