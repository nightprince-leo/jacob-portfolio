import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { CASE_STUDIES, CASE_STUDY_CARDS } from '../content';
import styles from './CaseStudyCards.module.css';

function CaseCard({ cs, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 0.12}s`;
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const inner = (
    <article className={`${styles.card} case-card fade-up`} ref={cardRef}>
      {/* Annotation mark */}
      <span className={styles.mark} aria-hidden="true">○</span>

      {/* Image area */}
      <div className={styles.imageWrap}>
        {cs.heroImage && !cs.comingSoon ? (
          <div className="img-placeholder" style={{ height: '260px' }}>
            <span>Insert: {cs.client} hero screen</span>
          </div>
        ) : (
          <div className={`img-placeholder ${styles.comingSoonImg}`} style={{ height: '260px' }}>
            <span>Coming soon</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <span className={`${styles.label} t-label`}>{cs.label}</span>
        <div className={styles.tags}>
          {cs.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2 className={styles.client}>{cs.client}</h2>
        <p className={styles.via}>{cs.via} · {cs.period}</p>
        <p className={styles.teaser}>{cs.teaser}</p>
      </div>

      {cs.available && (
        <div className={styles.cta}>
          <span className={styles.ctaText}>View case study</span>
          <span className={styles.ctaArrow}>→</span>
        </div>
      )}
    </article>
  );

  if (cs.available) {
    return <Link href={`/case-studies/${cs.slug}`} className={styles.link}>{inner}</Link>;
  }
  return inner;
}

export default function CaseStudyCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">{CASE_STUDY_CARDS.sectionLabel}</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        <div className={styles.grid}>
          {CASE_STUDIES.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
