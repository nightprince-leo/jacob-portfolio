import { useEffect, useRef } from 'react';
import { HERO, SITE } from '../content';
import styles from './Hero.module.css';

// Signature SVG — replace the path data below with your actual signature SVG path
function Signature() {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength?.() || 400;
    pathRef.current.style.strokeDasharray = length;
    pathRef.current.style.strokeDashoffset = length;
    setTimeout(() => {
      if (pathRef.current) {
        pathRef.current.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)';
        pathRef.current.style.strokeDashoffset = '0';
      }
    }, 1200);
  }, []);

  return (
    <svg
      className={styles.signature}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jacob Alley signature"
    >
      {/* REPLACE THIS PATH with your actual signature SVG path data */}
      <path
        ref={pathRef}
        d="M10 40 C20 10, 40 50, 60 30 C80 10, 90 45, 110 35 C130 25, 140 40, 160 35 C175 30, 185 38, 190 36"
        stroke="var(--color-steel)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  const wordsRef = useRef([]);

  useEffect(() => {
    wordsRef.current.forEach((word, i) => {
      if (!word) return;
      word.style.animationDelay = `${i * 0.08 + 0.2}s`;
      word.style.animation = 'wordReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards';
    });
  }, []);

  const allWords = HERO.headline.join(' ').split(' ');
  let wordIndex = 0;

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>

        {/* Name + title + signature */}
        <div className={styles.identity}>
          <div className={styles.nameBlock}>
            <span id="hero-site-name" className={styles.siteName}>{SITE.name}</span>
            <span className={styles.siteTitle}>{SITE.title}</span>
          </div>
          <Signature />
        </div>

        <hr className="divider" />

        {/* Headline */}
        <h1 className={`${styles.headline} t-display`}>
          {HERO.headline.map((line, li) => (
            <span key={li} className={styles.line}>
              {line.split(' ').map((word, wi) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={wi}
                    className={styles.word}
                    ref={el => wordsRef.current[idx] = el}
                    style={{ opacity: 0 }}
                  >
                    {word}{wi < line.split(' ').length - 1 ? '\u00A0' : ''}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          className={styles.sub}
          style={{ opacity: 0, animation: `wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${allWords.length * 0.08 + 0.4}s forwards` }}
        >
          {HERO.subheadline}
        </p>

        {/* Survey annotation mark */}
        <span className={styles.annotationMark} aria-hidden="true">○</span>

      </div>
    </section>
  );
}
