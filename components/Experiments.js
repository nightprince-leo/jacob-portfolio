import { EXPERIMENTS } from '../content';
import styles from './Experiments.module.css';

export default function Experiments() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">Current + Past Work</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        <div className={styles.grid}>
          {EXPERIMENTS.map((exp, i) => (
            <div key={exp.id} className={`${styles.card} fade-up`}>
              <div className={styles.cardHeader}>
                <span className={`${styles.expLabel} t-label`}>{exp.label}</span>
                <span className={styles.status}>{exp.status}</span>
              </div>
              <div className={styles.imgPlaceholder}>
                <span className="t-caption">Insert: project image or screenshot</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{exp.title}</h3>
                <p className={styles.desc}>{exp.description}</p>
                <div className={styles.tags}>
                  {exp.tags.map(t => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
