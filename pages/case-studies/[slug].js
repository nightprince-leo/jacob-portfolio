import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import AnnotationRail from '../../components/AnnotationRail';
import OutcomeNumbers from '../../components/OutcomeNumbers';
import BeforeAfter from '../../components/BeforeAfter';
import { useImageLightbox } from '../../components/ImageLightbox';
import { CASE_STUDIES, SITE } from '../../content';
import styles from './CaseStudy.module.css';

const MAGNIFIER_ACTIVATION_PADDING = 50;

export async function getStaticPaths() {
  const paths = CASE_STUDIES
    .filter(cs => cs.available)
    .map(cs => ({ params: { slug: cs.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cs = CASE_STUDIES.find(c => c.slug === params.slug);
  return { props: { cs } };
}

function FigurePlaceholder({ label, caption }) {
  return (
    <div className={styles.figure}>
      <div className="img-placeholder" style={{ height: '360px' }}>
        <span>{label}</span>
      </div>
      {caption && <p className={`${styles.figCaption} t-caption`}>{caption}</p>}
    </div>
  );
}

function FigureImage({ label, caption, image, alt, magnify = false }) {
  const { openImage } = useImageLightbox();
  const imageWrapRef = useRef(null);
  const [canHoverMagnify, setCanHoverMagnify] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const [samplePosition, setSamplePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHoverMagnify(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!magnify || !canHoverMagnify) return undefined;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleWindowMouseMove = (event) => {
      const el = imageWrapRef.current;
      if (!el) return;
      const bounds = el.getBoundingClientRect();
      const withinHorizontal =
        event.clientX >= bounds.left - MAGNIFIER_ACTIVATION_PADDING &&
        event.clientX <= bounds.right + MAGNIFIER_ACTIVATION_PADDING;
      const withinVertical =
        event.clientY >= bounds.top - MAGNIFIER_ACTIVATION_PADDING &&
        event.clientY <= bounds.bottom + MAGNIFIER_ACTIVATION_PADDING;

      if (!withinHorizontal || !withinVertical) {
        setLensVisible(false);
        return;
      }

      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;

      const displayXPx = clamp(
        localX,
        -MAGNIFIER_ACTIVATION_PADDING,
        bounds.width + MAGNIFIER_ACTIVATION_PADDING
      );
      const displayYPx = clamp(
        localY,
        -MAGNIFIER_ACTIVATION_PADDING,
        bounds.height + MAGNIFIER_ACTIVATION_PADDING
      );

      const sampleXPx = clamp(localX, 0, bounds.width);
      const sampleYPx = clamp(localY, 0, bounds.height);

      setLensPosition({
        x: (displayXPx / bounds.width) * 100,
        y: (displayYPx / bounds.height) * 100,
      });
      setSamplePosition({
        x: (sampleXPx / bounds.width) * 100,
        y: (sampleYPx / bounds.height) * 100,
      });
      setLensVisible(true);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [magnify, canHoverMagnify]);

  const handleExpand = () => {
    openImage(image, alt ?? label ?? '');
  };

  const handleExpandKey = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleExpand();
  };

  return (
    <div className={styles.figure}>
      <div
        ref={imageWrapRef}
        className={styles.figureImageWrap}
        role="button"
        tabIndex={0}
        aria-label={`Expand ${label}`}
        onClick={handleExpand}
        onKeyDown={handleExpandKey}
      >
        <div className={styles.figureImageFrame}>
          <Image
            src={image}
            alt={alt ?? label ?? ''}
            fill
            sizes="(max-width: 900px) 100vw, 72vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        {magnify && canHoverMagnify && lensVisible ? (
          <span
            className={styles.magnifierLens}
            aria-hidden="true"
            style={{
              left: `${lensPosition.x}%`,
              top: `${lensPosition.y}%`,
              backgroundImage: `url(${image})`,
              backgroundPosition: `${samplePosition.x}% ${samplePosition.y}%`,
            }}
          />
        ) : null}
      </div>
      {caption && <p className={`${styles.figCaption} t-caption`}>{caption}</p>}
    </div>
  );
}

function SectionBlock({ section }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.sectionWrap} fade-up`} ref={ref}>
      <div className={styles.sectionGrid}>

        {/* Main content */}
        <div className={styles.sectionContent}>
          <span className={`${styles.sectionLabel} t-label`}>{section.label}</span>

          {/* Body paragraphs */}
          {section.body?.map((p, i) => (
            <p key={i} className={styles.body}>{p}</p>
          ))}

          {/* Reframe block */}
          {section.reframe && (
            <div className={styles.reframe}>
              <div className={styles.reframeRow}>
                <span className={styles.reframeFrom}>{section.reframe.from}</span>
              </div>
              <div className={styles.reframeArrow}>↓</div>
              <div className={styles.reframeRow}>
                <span className={styles.reframeTo}>{section.reframe.to}</span>
              </div>
            </div>
          )}

          {/* Blockquote */}
          {section.blockquote && (
            <blockquote className={styles.blockquote}>
              <span className={styles.blockquoteRule} aria-hidden="true" />
              <p className={styles.blockquoteText}>{section.blockquote.text}</p>
              <cite className={styles.blockquoteAttrib}>{section.blockquote.attribution}</cite>
            </blockquote>
          )}

          {/* Decisions list */}
          {section.decisions && (
            <div className={styles.decisions}>
              {section.decisions.map((d, i) => (
                <div key={i} className={styles.decision}>
                  <span className={styles.decisionMark} aria-hidden="true">⌐</span>
                  <div>
                    <span className={styles.decisionTitle}>{d.title}</span>
                    <span className={styles.decisionBody}> {d.body}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Result callout */}
          {section.result && (
            <div className={styles.result}>
              <span className={styles.resultMark} aria-hidden="true">○</span>
              <span className={styles.resultText}>{section.result}</span>
            </div>
          )}

          {/* Figure */}
          {section.figure?.image && (
            <FigureImage
              label={section.figure.label}
              caption={section.figure.caption}
              image={section.figure.image}
              alt={section.figure.alt}
              magnify={section.figure.magnify}
            />
          )}
          {section.figure?.placeholder && (
            <FigurePlaceholder
              label={section.figure.label}
              caption={section.figure.caption}
            />
          )}
        </div>

        {/* Annotation rail */}
        <AnnotationRail
          label={section.annotation?.label}
          sub={section.annotation?.sub}
        />
      </div>
    </div>
  );
}

export default function CaseStudyPage({ cs }) {
  return (
    <>
      <Head>
        <title>{cs.client} — {SITE.name}</title>
        <meta name="description" content={cs.teaser} />
      </Head>

      <Nav />

      <main className={styles.page}>

        {/* Back link */}
        <div className={styles.backWrap}>
          <Link href="/" className={styles.back}>← All work</Link>
        </div>

        {/* Case study header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.headerContent}>
              <span className={`${styles.csLabel} t-label`}>{cs.label}</span>
              <h1 className={`${styles.title} t-display`}>
                {cs.sections?.[0]?.label === cs.sections?.[0]?.label
                  ? cs.client
                  : cs.client}
              </h1>
              <p className={styles.teaser}>{cs.teaser}</p>
            </div>

            {/* Meta block */}
            <div className={styles.metaBlock}>
              <div className={styles.metaRow}>
                <span className="t-label">Role</span>
                <span className={styles.metaVal}>{cs.meta.role}</span>
              </div>
              <hr className="divider" />
              <div className={styles.metaRow}>
                <span className="t-label">Team</span>
                <span className={styles.metaVal}>{cs.meta.team}</span>
              </div>
              <hr className="divider" />
              <div className={styles.metaRow}>
                <span className="t-label">Users</span>
                <span className={styles.metaVal}>{cs.meta.users}</span>
              </div>
              <hr className="divider" />
              <div className={styles.metaRow}>
                <span className="t-label">Constraints</span>
                <div className={styles.constraints}>
                  {cs.meta.constraints.map(c => (
                    <span key={c} className={styles.constraint}>{c}</span>
                  ))}
                </div>
              </div>
              <hr className="divider" />
              <div className={styles.metaRow}>
                <span className="t-label">Period</span>
                <span className={styles.metaVal}>{cs.meta.period} · {cs.meta.via}</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className={styles.heroImg}>
            {cs.heroImage ? (
              <div className={styles.heroImgInner}>
                <Image
                  src={cs.heroImage}
                  alt={cs.heroImageAlt ?? ''}
                  fill
                  sizes="(max-width: 900px) 100vw, min(1200px, 92vw)"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            ) : (
              <div className="img-placeholder" style={{ height: '480px' }}>
                <span>Insert: {cs.client} hero screen</span>
              </div>
            )}
          </div>
        </header>

        {/* Outcome numbers */}
        <div className={styles.outcomes}>
          <OutcomeNumbers outcomes={cs.outcomes} />
        </div>

        {/* Case study sections */}
        <div className={styles.sections}>
          {cs.sections.map(section => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>

        {/* Before / After */}
        <div className={styles.beforeAfterWrap}>
          <BeforeAfter rows={cs.beforeAfter} />
        </div>

        {/* Next case study */}
        <div className={styles.nextWrap}>
          <hr className="divider" />
          <div className={styles.next}>
            <span className="t-label">Next</span>
            {CASE_STUDIES.filter(c => c.slug !== cs.slug && c.available).slice(0, 1).map(next => (
              <Link key={next.slug} href={`/case-studies/${next.slug}`} className={styles.nextLink}>
                <span className={styles.nextClient}>{next.client}</span>
                <span className={styles.nextArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
