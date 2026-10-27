import CaseStudyVideo from './CaseStudyVideo';
import GalleryMedia from './GalleryMedia';
import PhoneRow from './PhoneRow';
import ScrollableScreenshot from './ScrollableScreenshot';
import FadeLines from '@/components/FadeLines';
import styles from './CaseStudyGallery.module.css';

function Lines({ as = 'p', className, children }) {
  if (typeof children !== 'string' || !children.trim()) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return <FadeLines as={as} className={className} text={children} />;
}

function shellClass(surface) {
  return surface === 'ink' ? `${styles.mediaShell} ${styles.mediaShellInk}` : styles.mediaShell;
}

function widthClass(variant) {
  if (variant === 'editorial') return styles.widthEditorial;
  if (variant === 'narrow') return styles.widthNarrow;
  return styles.widthFull;
}

function alignClass(alignment = 'left', prefix) {
  if (alignment === 'right') return styles[`${prefix}Right`];
  if (alignment === 'center') return styles[`${prefix}Center`];
  return styles[`${prefix}Left`];
}

function editorialVariant(block) {
  if (block.variant) return block.variant;
  if (block.type === 'editorialIntro') return 'hero';
  if (block.type === 'closingStatement') return 'closing';
  return 'section';
}

function headingClass(variant) {
  if (variant === 'hero') return styles.headingHero;
  if (variant === 'feature') return styles.headingFeature;
  if (variant === 'closing') return styles.headingClosing;
  if (variant === 'annotation') return styles.headingAnnotation;
  return styles.headingSection;
}

export function EditorialBlock({ block }) {
  const variant = editorialVariant(block);
  const placement = block.placement ?? block.alignment ?? 'left';
  const edge = block.edgeLockup ? styles.edgeLockup : '';
  return (
    <div className={`${styles.editorial} ${styles[`place_${placement}`]} ${styles[`variant_${variant}`]} ${edge}`}>
      {block.eyebrow ? <p className={styles.eyebrow}>{block.eyebrow}</p> : null}
      {block.heading ? <Lines as="h2" className={headingClass(variant)}>{block.heading}</Lines> : null}
      {block.body ? <Lines className={styles.body}>{block.body}</Lines> : null}
    </div>
  );
}

export function ImageBlock({ block }) {
  const image = block.image;
  if (!image) return null;
  return (
    <figure className={`${styles.figure} ${widthClass(block.widthVariant)}`}>
      <div className={shellClass(block.surface)}>
        <GalleryMedia asset={image} />
      </div>
      {block.caption ? (
        <figcaption className={`${styles.caption} ${alignClass(block.captionAlign, 'caption')}`}>
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function FullWidthBlock({ block }) {
  return <ImageBlock block={block} />;
}

export function TallScreenshotBlock({ block }) {
  return <ImageBlock block={{ ...block, image: { ...block.image, scrollable: false } }} />;
}

export function TwoColumnBlock({ block }) {
  const images = block.images ?? [];
  const columns = block.columns ?? images.map(() => '1fr');
  const matchHeight = Boolean(block.matchHeight);
  return (
    <figure
      className={`${styles.pair} ${matchHeight ? styles.pairMatch : ''}`}
      style={{
        '--pair-columns': columns.join(' '),
        ...(block.minHeight ? { '--pair-min-height': `${block.minHeight}px` } : {}),
      }}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={`${styles.pairItem} ${frameClass(block.frame)} ${block.surface === 'ink' ? styles.pairItemInk : ''} ${
            matchHeight && index > 0 ? styles.pairItemFill : ''
          }`}
          style={frameRatio(block.frame, image)}
        >
          <GalleryMedia asset={image} />
        </div>
      ))}
      {block.caption ? (
        <figcaption className={`${styles.caption} ${styles.captionLeft} ${styles.pairCaption}`}>
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function BentoBlock({ block }) {
  const columns = block.columns ?? 2;
  const items = block.items ?? [];
  return (
    <div className={styles.bento} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {items.map((item, index) => {
        const colSpan = item.colSpan ?? 1;
        const rowSpan = item.rowSpan ?? 1;
        return (
          <div
            key={`${item.image?.src ?? index}`}
            className={styles.bentoItem}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            <GalleryMedia asset={item.image} />
          </div>
        );
      })}
    </div>
  );
}

export function VideoBlock({ block }) {
  if (!block.video) return null;
  return <CaseStudyVideo video={block.video} surfaceClass={shellClass(block.surface)} />;
}

export function CaptionBlock({ block }) {
  return <p className={`${styles.caption} ${alignClass(block.alignment, 'caption')}`}>{block.text}</p>;
}

export function TextBlock({ block }) {
  return <Lines className={styles.body}>{block.text}</Lines>;
}

function Copy({ block, headingClassName }) {
  if (!block.heading && !block.body && !block.eyebrow) return null;
  return (
    <div className={styles.copy}>
      {block.eyebrow ? <p className={styles.eyebrow}>{block.eyebrow}</p> : null}
      {block.heading ? <Lines as="h2" className={headingClassName}>{block.heading}</Lines> : null}
      {block.body ? <Lines className={styles.body}>{block.body}</Lines> : null}
    </div>
  );
}

function frameClass(frame) {
  if (frame === 'wide') return styles.frameWide;
  if (frame === 'square') return styles.frameSquare;
  if (frame === 'portrait') return styles.framePortrait;
  if (frame === 'native') return styles.frameNative;
  return '';
}

function frameRatio(frame, image) {
  if (!image?.width || !image?.height) return undefined;
  if (frame === 'square' || frame === 'native') {
    return { aspectRatio: `${image.width} / ${image.height}` };
  }
  return undefined;
}

function MediaFrame({ block, image, video }) {
  const framed = frameClass(block.frame);
  if (video) {
    return (
      <div className={framed || undefined} style={frameRatio(block.frame, video)}>
        <CaseStudyVideo video={video} surfaceClass={shellClass(block.surface)} />
      </div>
    );
  }
  if (!image) return null;
  return (
    <div className={`${shellClass(block.surface)} ${framed}`.trim()} style={frameRatio(block.frame, image)}>
      <GalleryMedia asset={image} />
    </div>
  );
}

export function EditorialSpreadBlock({ block }) {
  const lead = block.variant === 'lead';
  const feature = block.variant === 'feature';
  const heading = feature ? styles.headingFeature : lead ? styles.headingLead : styles.headingHero;
  return (
    <section className={`${styles.spread} ${lead ? styles.spreadLead : ''} ${feature ? styles.spreadFeature : ''}`}>
      <Copy block={block} headingClassName={heading} />
      {block.image || block.video ? (
        <figure className={styles.spreadMedia}>
          <MediaFrame block={block} image={block.image} video={block.video} />
          {block.caption ? <figcaption className={styles.caption}>{block.caption}</figcaption> : null}
        </figure>
      ) : null}
    </section>
  );
}

export function AsymmetricMediaBlock({ block }) {
  const span = block.mediaSpan === 7 || block.mediaSpan === 8 ? block.mediaSpan : 9;
  const textLeft = block.textSide === 'left';
  const mediaStart = textLeft ? 13 - span : 1;
  const copyStart = textLeft ? 1 : span + 1;
  const prominent = block.headingScale === 'prominent';
  return (
    <section className={`${styles.asymmetric} ${block.align === 'start' ? styles.asymmetricStart : ''}`}>
      <div className={styles.asymmetricMedia} style={{ gridColumn: `${mediaStart} / span ${span}` }}>
        <MediaFrame block={block} image={block.image} video={block.video} />
      </div>
      <div className={styles.asymmetricCopy} style={{ gridColumn: `${copyStart} / span ${12 - span}` }}>
        <Copy block={block} headingClassName={prominent ? styles.headingProminent : styles.headingSection} />
      </div>
    </section>
  );
}

export function FullBleedMediaBlock({ block }) {
  return (
    <figure className={styles.fullBleed}>
      <MediaFrame block={block} image={block.image} video={block.video} />
      {block.note ? <p className={styles.note}>{block.note}</p> : null}
      {block.caption ? <figcaption className={styles.caption}>{block.caption}</figcaption> : null}
    </figure>
  );
}

export function TypographicInterludeBlock({ block }) {
  return (
    <section className={styles.interlude}>
      <Lines as="h2" className={styles.headingInterlude}>{block.heading}</Lines>
      {block.body ? <Lines className={styles.body}>{block.body}</Lines> : null}
    </section>
  );
}

export function ScrollableScreenshotBlock({ block }) {
  const image = block.image;
  if (!image) return null;
  const shot = (
    <ScrollableScreenshot
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      mode={block.mode ?? image.mode}
      aspect={block.aspect ?? image.aspect}
      showScrollHint={block.showScrollHint ?? image.showScrollHint}
      showBottomFade={block.showBottomFade ?? image.showBottomFade}
      initialScrollPosition={block.initialScrollPosition ?? image.initialScrollPosition}
      radius={block.radius ?? image.radius}
      ariaLabel={block.ariaLabel ?? image.ariaLabel ?? image.alt}
      priority={image.priority}
    />
  );
  const caption = block.caption ? (
    <figcaption className={styles.caption}>{block.caption}</figcaption>
  ) : null;

  if (block.layout === 'split') {
    const textRight = block.textSide === 'right';
    return (
      <section className={`${styles.shotSplit} ${textRight ? styles.shotSplitReverse : ''}`}>
        <Copy block={block} headingClassName={styles.headingSection} />
        <figure className={styles.shotFrame}>
          {shot}
          {caption}
        </figure>
      </section>
    );
  }

  return (
    <figure className={styles.shotFrame}>
      {shot}
      {caption}
    </figure>
  );
}

export function PairedMediaBlock({ block }) {
  return <TwoColumnBlock block={block} />;
}

export function PhoneShowcaseBlock({ block }) {
  const images = block.images ?? [];

  return (
    <section
      className={`${styles.phoneChapter} ${
        block.copySide === 'right' ? styles.phoneCopyRight : ''
      }`}
    >
      <Copy block={block} headingClassName={styles.headingSection} />
      <PhoneRow images={images} label={block.heading || 'Product screens'} />
    </section>
  );
}

export function EditorialDetailBlock({ block }) {
  const align = block.align === 'right' ? styles.detailRight : styles.detailLeft;
  const scale =
    block.width === 'medium' ? styles.detailMedium : block.width === 'full' ? styles.detailFull : styles.detailWide;
  return (
    <section className={`${styles.detail} ${align} ${scale}`}>
      <figure className={styles.detailFrame}>
        <MediaFrame block={block} image={block.image} video={block.video} />
        {block.note ? <p className={styles.note}>{block.note}</p> : null}
        {block.caption ? <figcaption className={styles.caption}>{block.caption}</figcaption> : null}
      </figure>
    </section>
  );
}

export function ClosingSpreadBlock({ block }) {
  return (
    <section className={styles.closingSpread}>
      <div className={styles.closingCopy}>
        <Copy block={block} headingClassName={styles.headingClosing} />
      </div>
      {block.image ? (
        <div className={styles.closingMark}>
          <GalleryMedia asset={block.image} />
        </div>
      ) : null}
    </section>
  );
}

export function IdentityDetailBlock({ block }) {
  const size = block.size === 'large' ? styles.identityLarge : block.size === 'medium' ? styles.identityMedium : styles.identitySmall;
  return (
    <div className={`${styles.identity} ${size}`}>
      <GalleryMedia asset={block.image} />
    </div>
  );
}

export function ClosingStatementBlock({ block }) {
  return <EditorialBlock block={{ ...block, variant: block.variant ?? 'closing' }} />;
}

export function renderGalleryBlock(block, index) {
  switch (block.type) {
    case 'editorialIntro':
    case 'editorialText':
    case 'closingStatement':
      return <EditorialBlock key={index} block={block} />;
    case 'editorialSpread':
      return <EditorialSpreadBlock key={index} block={block} />;
    case 'asymmetricMedia':
      return <AsymmetricMediaBlock key={index} block={block} />;
    case 'fullBleedMedia':
      return <FullBleedMediaBlock key={index} block={block} />;
    case 'typographicInterlude':
      return <TypographicInterludeBlock key={index} block={block} />;
    case 'pairedMedia':
      return <PairedMediaBlock key={index} block={block} />;
    case 'phoneShowcase':
      return <PhoneShowcaseBlock key={index} block={block} />;
    case 'editorialDetail':
      return <EditorialDetailBlock key={index} block={block} />;
    case 'closingSpread':
      return <ClosingSpreadBlock key={index} block={block} />;
    case 'image':
    case 'fullWidth':
      return <ImageBlock key={index} block={block} />;
    case 'imageGrid':
    case 'twoColumn':
      return <TwoColumnBlock key={index} block={block} />;
    case 'asymmetricGrid':
    case 'bento':
      return <BentoBlock key={index} block={block} />;
    case 'tallScreenshot':
      return <TallScreenshotBlock key={index} block={block} />;
    case 'video':
      return <VideoBlock key={index} block={block} />;
    case 'scrollableScreenshot':
      return <ScrollableScreenshotBlock key={index} block={block} />;
    case 'caption':
      return <CaptionBlock key={index} block={block} />;
    case 'text':
      return <TextBlock key={index} block={block} />;
    case 'identityDetail':
      return <IdentityDetailBlock key={index} block={block} />;
    default:
      return null;
  }
}
