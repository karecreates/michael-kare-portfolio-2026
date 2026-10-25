import ScrollableWebsitePreview from './ScrollableWebsitePreview';
import styles from './CaseStudyGallery.module.css';

export default function GalleryMedia({ asset, className = '' }) {
  if (!asset) return null;

  if (asset.scrollable) {
    return <ScrollableWebsitePreview asset={asset} className={className} />;
  }

  const fitClass =
    asset.objectFit === 'cover' ? styles.mediaCover : styles.media;

  return (
    <img
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      className={`${fitClass} ${asset.spin ? styles.spin : ''} ${className}`.trim()}
      loading={asset.priority ? 'eager' : 'lazy'}
      fetchPriority={asset.priority ? 'high' : undefined}
    />
  );
}
