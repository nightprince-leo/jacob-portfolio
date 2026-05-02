import Link from 'next/link';
import { SITE } from '../content';
import { useContactModal } from './ContactModal';
import styles from './Nav.module.css';

export default function Nav() {
  const { openModal } = useContactModal();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>{SITE.name}</Link>
        <button
          type="button"
          className={`${styles.contact} nav-contact`}
          onClick={openModal}
        >
          Contact
        </button>
      </div>
      <hr className="divider" />
    </nav>
  );
}
