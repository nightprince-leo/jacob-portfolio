import { CONTACT } from '../content';
import { useContactModal } from './ContactModal';
import styles from './Contact.module.css';

export default function Contact() {
  const { openModal } = useContactModal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <hr className="divider" />
        <div className={styles.inner}>
          <p className={`${styles.headline} t-display`}>{CONTACT.headline}</p>
          <button type="button" className={styles.email} onClick={openModal}>
            {CONTACT.email}
          </button>
        </div>
        <hr className="divider" />
      </div>
    </section>
  );
}
