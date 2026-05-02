import '../styles/globals.css';
import { ContactModalProvider } from '../components/ContactModal';

export default function App({ Component, pageProps }) {
  return (
    <ContactModalProvider>
      <Component {...pageProps} />
    </ContactModalProvider>
  );
}
