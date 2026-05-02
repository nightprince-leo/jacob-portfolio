import { SITE } from '../content';
import { useContactModal } from './ContactModal';
import styles from './Footer.module.css';

export default function Footer() {
  const { openModal } = useContactModal();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.left}>
          {SITE.name} · Senior Product Designer · © {new Date().getFullYear()}
        </span>
        <div className={styles.links}>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <button type="button" className={styles.linkButton} onClick={openModal}>
            Email
          </button>
        </div>
      </div>
    </footer>
  );
}
