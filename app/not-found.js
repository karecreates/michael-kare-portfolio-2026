import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--text)', background: 'var(--bg)' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page not found</h1>
      <Link href="/" style={{ color: 'var(--muted)' }}>
        Back to home
      </Link>
    </div>
  );
}
