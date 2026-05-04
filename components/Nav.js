import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SITE } from '../content';
import { useContactModal } from './ContactModal';
import styles from './Nav.module.css';

export default function Nav() {
  const { openModal } = useContactModal();
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [nameRevealed, setNameRevealed] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setNameRevealed(true);
      return;
    }
    setNameRevealed(false);
    const target = document.getElementById('hero-site-name');
    if (!target) {
      setNameRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNameRevealed(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isHome, router.asPath]);

  const nameClassName = [
    styles.name,
    isHome && styles.nameReveal,
    isHome && nameRevealed && styles.nameRevealVisible,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={nameClassName}
          tabIndex={isHome && !nameRevealed ? -1 : undefined}
        >
          {SITE.name}
        </Link>
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
