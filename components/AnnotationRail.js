import { useEffect, useRef } from 'react';
import styles from './AnnotationRail.module.css';

export default function AnnotationRail({ label, sub, children }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!label && !children) return null;

  return (
    <aside className={styles.rail}>
      {label && (
        <div className={styles.annotation}>
          <div ref={lineRef} className={`${styles.leaderLine} leader-line`} />
          <span className={styles.label}>{label}</span>
          {sub && <span className={styles.sub}>{sub}</span>}
        </div>
      )}
      {children}
    </aside>
  );
}
