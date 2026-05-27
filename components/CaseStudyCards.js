import Image from 'next/image';
import Link from 'next/link';
import { CASE_STUDIES, CASE_STUDY_CARDS, HERO } from '../content';
import styles from './CaseStudyCards.module.css';

function CaseCard({ cs, index, startDelay }) {
  const cardDelay = startDelay + index * 0.12;

  const inner = (
    <article
      className={`${styles.card} case-card`}
      style={{
        opacity: 0,
        animation: `fadeUp 0.7s var(--ease-out) ${cardDelay}s forwards`
      }}
    >
      {/* Annotation mark */}
      <span className={styles.mark} aria-hidden="true">○</span>

      {/* Image area */}
      <div className={styles.imageWrap}>
        {cs.heroImage && !cs.comingSoon ? (
          <div className={styles.cardImage}>
            <Image
              src={cs.cardImage ?? cs.heroImage}
              alt={cs.heroImageAlt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.cardImageMedia}
              priority={index === 0}
            />
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
  const heroWordCount = HERO.headline.join(' ').split(' ').length;
  const heroSubDelay = heroWordCount * 0.08 + 0.4;
  const cardsStartDelay = heroSubDelay + 0.7;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">{CASE_STUDY_CARDS.sectionLabel}</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        <div className={styles.grid}>
          {CASE_STUDIES.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} startDelay={cardsStartDelay} />
          ))}
        </div>
      </div>
    </section>
  );
}
