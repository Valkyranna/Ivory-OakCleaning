import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={s.page}>
      <div style={s.content}>
        <span style={s.code}>404</span>
        <h1 style={s.title}>Page Not Found</h1>
        <p style={s.text}>
          More clean up to do! Let&apos;s take you back.
        </p>
        <Link href="/" style={s.btn}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FAF7F2',
    padding: '40px 24px',
  },
  content: {
    textAlign: 'center',
    maxWidth: 420,
  },
  code: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(5rem, 15vw, 8rem)',
    fontWeight: 300,
    color: '#EAE2D6',
    lineHeight: 1,
    display: 'block',
    marginBottom: 16,
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.8rem',
    fontWeight: 500,
    color: '#3E2E20',
    marginBottom: 12,
    lineHeight: 1.2,
  },
  text: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    color: '#5C534A',
    lineHeight: 1.7,
    marginBottom: 32,
  },
  btn: {
    display: 'inline-block',
    padding: '12px 28px',
    background: '#C8A84E',
    color: '#FFFFFF',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 600,
    borderRadius: 6,
    textDecoration: 'none',
    letterSpacing: '0.03em',
  },
}
