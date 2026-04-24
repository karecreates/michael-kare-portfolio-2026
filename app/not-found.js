import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: '#f5f5f5', background: '#000000' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page not found</h1>
      <Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Back to home
      </Link>
    </div>
  );
}
