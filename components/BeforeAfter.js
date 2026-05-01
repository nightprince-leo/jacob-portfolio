import styles from './BeforeAfter.module.css';

export default function BeforeAfter({ rows }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className="t-label">Before → After</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thMetric}></th>
            <th className={styles.th}>Before</th>
            <th className={styles.th}>After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={styles.row}>
              <td className={styles.metric}>{row.metric}</td>
              <td className={styles.before}>{row.before}</td>
              <td className={styles.after}>{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
