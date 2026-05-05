import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CONTACT, SITE } from '../content';
import styles from './ContactModal.module.css';

const ContactModalContext = createContext(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return ctx;
}

function ContactModalDialog({ open, onClose }) {
  const copy = CONTACT.modal;
  const titleId = useId();
  const closeRef = useRef(null);
  const nameInputRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setMessage('');
    setTouched(false);
    setSubmitting(false);
    setServerError(false);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    resetForm();
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = requestAnimationFrame(() => {
      if (success) closeRef.current?.focus();
      else nameInputRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(t);
    };
  }, [open, success]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const nameErr = touched && !name.trim();
  const emailErr = touched && !email.trim();
  const messageErr = touched && !message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServerError(false);
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        setServerError(true);
        setSubmitting(false);
        return;
      }
      setSuccess(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={copy.close}
        >
          {copy.close}
        </button>

        {success ? (
          <div className={styles.success}>
            <p id={titleId} className={styles.successTitle}>
              {copy.successTitle}
            </p>
            <p className={styles.successBody}>{copy.successBody}</p>
            <button
              type="button"
              className={styles.successClose}
              onClick={onClose}
            >
              {copy.successDismiss}
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className={styles.title}>
              {copy.title}
            </h2>
            <p className={styles.intro}>{copy.intro}</p>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  {copy.fields.name}
                </label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  className={styles.input}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={nameErr}
                />
                <span className={styles.error} aria-live="polite">
                  {nameErr ? copy.requiredHint : ''}
                </span>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  {copy.fields.email}
                </label>
                <input
                  id="contact-email"
                  className={styles.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={emailErr}
                />
                <span className={styles.error} aria-live="polite">
                  {emailErr ? copy.requiredHint : ''}
                </span>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">
                  {copy.fields.message}
                </label>
                <textarea
                  id="contact-message"
                  className={styles.textarea}
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={messageErr}
                />
                <span className={styles.error} aria-live="polite">
                  {messageErr ? copy.requiredHint : ''}
                </span>
              </div>
              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={submitting}
                >
                  {submitting ? copy.sending : copy.submit}
                </button>
                {serverError ? (
                  <p className={styles.formError}>
                    {copy.sendError}
                    <a className={styles.fallbackEmail} href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </p>
                ) : null}
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = { openModal, closeModal, open };

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModalDialog open={open} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}
