import { CONTACT, SITE } from '../content';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <hr className="divider" />
        <div className={styles.inner}>
          <p className={`${styles.headline} t-display`}>{CONTACT.headline}</p>
          <a href={`mailto:${CONTACT.email}`} className={styles.email}>
            {CONTACT.email}
          </a>
        </div>
        <hr className="divider" />
      </div>
    </section>
  );
}
