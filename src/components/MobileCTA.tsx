'use client'

export default function MobileCTA() {
  return (
    <div className="mobile-sticky-cta">
      <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
        Book a Cleaning
      </button>
    </div>
  )
}
