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

/** Reveal only after a meaningful slice of the section is in the readable viewport */
const SCROLL_REVEAL_OPTIONS = {
  threshold: 0.15,
  rootMargin: '0px 0px -12% 0px',
};

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

function FigureImage({ label, caption, image, images, alt, magnify = false, magnifyTargetIndex }) {
  const { openImage } = useImageLightbox();
  const resolvedImages = images?.length
    ? images
    : image
      ? [{ src: image, alt: alt ?? label ?? '' }]
      : [];
  const normalizedTargetIndex = Number.isInteger(magnifyTargetIndex)
    ? Math.max(0, Math.min(resolvedImages.length - 1, magnifyTargetIndex))
    : 0;
  const magnifyImage = magnify && resolvedImages.length > 0
    ? resolvedImages[normalizedTargetIndex]
    : null;
  const magnifyEnabled = Boolean(magnifyImage);
  const imageWrapRef = useRef(null);
  const magnifyTargetRef = useRef(null);
  const [canHoverMagnify, setCanHoverMagnify] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
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
    if (!magnifyEnabled || !canHoverMagnify) return undefined;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleWindowMouseMove = (event) => {
      const wrapEl = imageWrapRef.current;
      const targetEl = magnifyTargetRef.current;
      if (!wrapEl || !targetEl) return;
      const wrapBounds = wrapEl.getBoundingClientRect();
      const bounds = targetEl.getBoundingClientRect();
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
      const targetOffsetLeft = bounds.left - wrapBounds.left;
      const targetOffsetTop = bounds.top - wrapBounds.top;

      setLensPosition({
        x: targetOffsetLeft + displayXPx,
        y: targetOffsetTop + displayYPx,
      });
      setSamplePosition({
        x: (sampleXPx / bounds.width) * 100,
        y: (sampleYPx / bounds.height) * 100,
      });
      setLensVisible(true);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [magnifyEnabled, canHoverMagnify]);

  const handleExpand = (src, imageAlt) => {
    openImage(src, imageAlt ?? label ?? '');
  };

  const handleExpandKey = (event, src, imageAlt) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    handleExpand(src, imageAlt);
  };

  return (
    <div className={styles.figure}>
      <div
        className={`${styles.figureImageWrap} ${resolvedImages.length > 1 ? styles.figureImageWrapMulti : ''} ${magnifyEnabled ? styles.figureImageWrapMagnify : ''}`}
      >
        <div
          ref={imageWrapRef}
          className={`${styles.figureImageStack} ${resolvedImages.length > 1 ? styles.figureImageStackMulti : ''}`}
        >
          {resolvedImages.map((img, idx) => (
            <div
              key={`${img.src}-${idx}`}
              ref={idx === normalizedTargetIndex ? magnifyTargetRef : null}
              className={styles.figureImageItem}
              role="button"
              tabIndex={0}
              aria-label={`Expand ${label}${resolvedImages.length > 1 ? ` image ${idx + 1}` : ''}`}
              onClick={() => handleExpand(img.src, img.alt)}
              onKeyDown={(event) => handleExpandKey(event, img.src, img.alt)}
            >
              <div className={styles.figureImageFrame}>
                <img
                  src={img.src}
                  alt={img.alt ?? label ?? ''}
                  className={styles.figureImageMedia}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        {magnifyEnabled && canHoverMagnify && lensVisible ? (
          <span
            className={styles.magnifierLens}
            aria-hidden="true"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
              backgroundImage: `url(${magnifyImage.src})`,
              backgroundPosition: `${samplePosition.x}% ${samplePosition.y}%`,
            }}
          />
        ) : null}
        {magnifyEnabled && canHoverMagnify && lensVisible ? (
          <span
            className={styles.magnifierCursorDot}
            aria-hidden="true"
            style={{
              left: `${lensPosition.x}px`,
              top: `${lensPosition.y}px`,
            }}
          />
        ) : null}
      </div>
      {caption && <p className={`${styles.figCaption} t-caption`}>{caption}</p>}
    </div>
  );
}

function FigureSinglePlaceholder({ label, caption }) {
  return (
    <div className={styles.figure}>
      <div
        className={styles.figureImageWrap}
        role="button"
        tabIndex={0}
        aria-label={`Expand ${label}`}
      >
        <div className={styles.figureImageStack}>
          <div className={styles.figureImageItem}>
            <div className={styles.figureImageFrame}>
              <div className="img-placeholder" style={{ height: '360px' }}>
                <div className={styles.placeholderCopy}>
                  <span>{label}</span>
                  <span className={styles.placeholderSub}>
                    Case study in progress — additional artifacts being added.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      SCROLL_REVEAL_OPTIONS
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
          {(section.figure?.image || section.figure?.images?.length > 0) && (
            <FigureImage
              label={section.figure.label}
              caption={section.figure.caption}
              image={section.figure.image}
              images={section.figure.images}
              alt={section.figure.alt}
              magnify={section.figure.magnify}
              magnifyTargetIndex={section.figure.magnifyTargetIndex}
            />
          )}
          {section.figure?.placeholder && (
            <FigureSinglePlaceholder
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
                  quality={95}
                  className={styles.heroImageMedia}
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
