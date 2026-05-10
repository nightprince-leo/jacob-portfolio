import { useId, useState } from 'react';
import { HOT_TAKES } from '../content';
import styles from './HotTakes.module.css';

export default function HotTakes() {
  const [openId, setOpenId] = useState(null);
  const baseId = useId();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="t-label">Field Notes</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>

        <div className={styles.accordion}>
          {HOT_TAKES.map((ht) => {
            const isOpen = openId === ht.id;
            const panelId = `${baseId}-panel-${ht.id}`;
            const triggerId = `${baseId}-trigger-${ht.id}`;

            return (
              <div key={ht.id} className={styles.item}>
                <button
                  type="button"
                  id={triggerId}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((prev) => (prev === ht.id ? null : ht.id))
                  }
                >
                  <span className={styles.triggerTitle}>{ht.title}</span>
                </button>

                <div
                  id={panelId}
                  className={styles.panelWrapper}
                  data-open={isOpen}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <div
                      role="region"
                      aria-labelledby={triggerId}
                      className={styles.panelRow}
                    >
                      <div className={styles.panelBody}>
                        {ht.paragraphs.map((text, i) => (
                          <p key={i} className={styles.body}>
                            {text}
                          </p>
                        ))}
                      </div>
                      {/* Image aside — restore when assets exist; set .panelBody to span 7 in CSS. */}
                      {/* <div className={styles.imgAside}>
                        <span className="t-caption">Insert: image or illustration</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
