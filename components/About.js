import { useEffect, useRef } from 'react';
import { ABOUT, SITE } from '../content';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.fade-up').forEach((child, i) => {
            child.style.animationDelay = `${i * 0.1}s`;
            child.classList.add('visible');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">About</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        <div className={styles.grid}>
          <div className={styles.content}>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className={`${styles.para} fade-up`}>{p}</p>
            ))}
          </div>
          <div className={`${styles.aside} fade-up`}>
            <span className="t-label" style={{ display: 'block', marginBottom: '16px' }}>Currently</span>
            <p className={styles.asideItem}>
              <span className={styles.asideDot} aria-hidden="true">○</span>
              Open to senior / staff roles
            </p>
            <p className={styles.asideItem}>
              <span className={styles.asideDot} aria-hidden="true">○</span>
              Onsite preferred
            </p>
            <p className={styles.asideItem}>
              <span className={styles.asideDot} aria-hidden="true">○</span>
              Small teams, high ownership
            </p>
            <div className={styles.dividerSmall} />
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedIn}>
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
