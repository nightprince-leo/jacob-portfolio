import '../styles/globals.css';
import { ContactModalProvider } from '../components/ContactModal';
import { ImageLightboxProvider } from '../components/ImageLightbox';

export default function App({ Component, pageProps }) {
  return (
    <ContactModalProvider>
      <ImageLightboxProvider>
        <Component {...pageProps} />
      </ImageLightboxProvider>
    </ContactModalProvider>
  );
}
