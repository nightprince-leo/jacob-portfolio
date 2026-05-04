import { HOT_TAKES } from '../content';
import styles from './HotTakes.module.css';

export default function HotTakes() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">Field Notes</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        <div className={styles.grid}>
          {HOT_TAKES.map((ht) => (
            <article key={ht.id} className={`${styles.card} fade-up`}>
              <span className={styles.mark} aria-hidden="true">+</span>
              <div className={styles.imgPlaceholder}>
                <span className="t-caption">Insert: image or illustration</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{ht.title}</h3>
                <div className={styles.subtitleWrap}>
                  {(Array.isArray(ht.subtitle) ? ht.subtitle : [ht.subtitle]).map(
                    (line, i) => (
                      <p key={i} className={styles.subtitle}>
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
