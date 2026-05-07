import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import styles from './ImageLightbox.module.css';

const ImageLightboxContext = createContext(null);

export function useImageLightbox() {
  const ctx = useContext(ImageLightboxContext);
  if (!ctx) {
    throw new Error('useImageLightbox must be used within ImageLightboxProvider');
  }
  return ctx;
}

function ImageLightboxDialog({ open, image, onClose }) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !image || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div className={styles.shell} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill
            sizes="100vw"
            className={styles.image}
            priority
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ImageLightboxProvider({ children }) {
  const [image, setImage] = useState(null);

  const openImage = useCallback((src, alt = '') => {
    if (!src) return;
    setImage({ src, alt });
  }, []);

  const closeImage = useCallback(() => {
    setImage(null);
  }, []);

  const value = useMemo(
    () => ({
      openImage,
      closeImage,
      isOpen: Boolean(image),
    }),
    [openImage, closeImage, image]
  );

  return (
    <ImageLightboxContext.Provider value={value}>
      {children}
      <ImageLightboxDialog open={Boolean(image)} image={image} onClose={closeImage} />
    </ImageLightboxContext.Provider>
  );
}
