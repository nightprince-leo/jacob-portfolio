import { useEffect, useRef, useState } from 'react';
import styles from './OutcomeNumbers.module.css';

function CountUp({ target, suffix, prefix, display }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || target === null) return;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  // Non-numeric displays (like "129→27") just show directly
  if (target === null) {
    return <span ref={ref} className={styles.value}>{display}</span>;
  }

  return (
    <span ref={ref} className={styles.value}>
      {prefix}{started ? current : 0}{suffix}
    </span>
  );
}

export default function OutcomeNumbers({ outcomes }) {
  return (
    <div className={styles.grid}>
      {outcomes.map((o, i) => (
        <div
          key={i}
          className={styles.outcome}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <CountUp
            target={o.countTo}
            display={o.display}
            prefix={o.prefix}
            suffix={o.suffix}
          />
          <span className={styles.label}>{o.label}</span>
        </div>
      ))}
    </div>
  );
}
