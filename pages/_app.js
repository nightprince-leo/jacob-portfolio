import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ContactModalProvider } from '../components/ContactModal';
import { ImageLightboxProvider } from '../components/ImageLightbox';

export default function App({ Component, pageProps }) {
  return (
    <ContactModalProvider>
      <ImageLightboxProvider>
        <Component {...pageProps} />
        <Analytics />
      </ImageLightboxProvider>
    </ContactModalProvider>
  );
}
