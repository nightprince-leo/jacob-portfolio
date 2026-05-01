import { CREDIBILITY } from '../content';
import styles from './Credibility.module.css';

export default function Credibility() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <hr className="divider" />
        <p className={styles.line}>{CREDIBILITY.line}</p>
        <hr className="divider" />
      </div>
    </section>
  );
}
