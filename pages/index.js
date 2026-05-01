import Head from 'next/head';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import CaseStudyCards from '../components/CaseStudyCards';
import Credibility from '../components/Credibility';
import Experiments from '../components/Experiments';
import HotTakes from '../components/HotTakes';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SITE } from '../content';
import { useEffect } from 'react';

export default function Home() {
  // Scroll-triggered fade-up observer
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{SITE.name} — Senior Product Designer</title>
        <meta name="description" content="Senior Product Designer specializing in complex systems, real constraints, and small engineering teams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <main>
        <Hero />
        <CaseStudyCards />
        <Credibility />
        <Experiments />
        <HotTakes />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
