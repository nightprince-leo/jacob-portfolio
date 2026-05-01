import Link from 'next/link';
import { SITE } from '../content';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>{SITE.name}</Link>
        <a href={`mailto:${SITE.email}`} className={`${styles.contact} nav-contact`}>Contact</a>
      </div>
      <hr className="divider" />
    </nav>
  );
}
