import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'

function ContactCard({ icon, title, description, children }) {
  return (
    <div
      className="rounded-2xl p-6 lg:p-8"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}
        >
          {icon}
        </div>
        <h3 className="font-sans font-bold text-white text-xl">{title}</h3>
      </div>
      <div className="text-neutral-400 leading-relaxed">
        {description && <p className="mb-3">{description}</p>}
        {children}
      </div>
    </div>
  )
}

export default function Contact() {
  // Get all unique cities for locations
  const uniqueCities = [...new Set(rooms.map(r => `${r.location.city}, ${r.location.state}`))]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Page header */}
      <div className="pt-32 pb-16" style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #2a2a2a' }}>
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="font-sans font-extrabold text-white text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="text-neutral-500 mt-5 max-w-xl mx-auto text-lg">
            Have questions about our properties or Bitcoin booking process?
            Reach out to us anytime.
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact information */}
            <div>
              <h2 className="font-sans font-bold text-white text-3xl mb-8">
                How to Reach Us
              </h2>

              <div className="space-y-6">
                <ContactCard
                  icon={
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  title="Phone"
                  description="Call us for general inquiries or booking assistance."
                >
                  <p className="text-white font-semibold text-lg mt-2">
                    <a href="tel:+18005550199" className="hover:text-gold transition-colors">
                      +1 (800) 555-0199
                    </a>
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Available 24/7 for existing reservations
                  </p>
                </ContactCard>

                <ContactCard
                  icon={
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Email"
                  description="Send us an email for general questions or partnership inquiries."
                >
                  <p className="text-white font-semibold text-lg mt-2">
                    <a href="mailto:reservations@halfpricestays.xyz" className="hover:text-gold transition-colors">
                      reservations@halfpricestays.xyz
                    </a>
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Typically respond within 4 hours
                  </p>
                </ContactCard>

                <ContactCard
                  icon={
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  title="Corporate Office"
                  description="Our main administrative office."
                >
                  <p className="text-white font-semibold text-lg mt-2">
                    9251 Wesleyan Rd
                  </p>
                  <p className="text-neutral-500">Indianapolis, IN 46268</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    This is our administrative office only. For hotel check-in, please go to the specific property address.
                  </p>
                </ContactCard>
              </div>
            </div>

            {/* Locations & Bitcoin info */}
            <div>
              <ContactCard
                icon={
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
                title="Our Locations"
                description="HalfPriceStays operates 8 verified properties across Indiana and Ohio."
              >
                <ul className="space-y-2 mt-3">
                  {uniqueCities.map(city => (
                    <li key={city} className="flex items-center gap-2 text-neutral-400">
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {city}
                    </li>
                  ))}
                </ul>
                <Link to="/locations" className="inline-block mt-4 text-gold hover:text-gold-light transition-colors font-semibold text-sm">
                  View all properties →
                </Link>
              </ContactCard>

              {/* Bitcoin payment info */}
              <div className="mt-8">
                <ContactCard
                  icon={
                    <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
                    </svg>
                  }
                  title="Bitcoin Payments"
                  description="All bookings are processed exclusively via Bitcoin for maximum privacy and security."
                >
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="text-neutral-400">· No credit cards accepted</p>
                    <p className="text-neutral-400">· All rooms 50% off with Bitcoin</p>
                    <p className="text-neutral-400">· Secure, private transactions</p>
                  </div>
                  <p className="mt-4 text-gold font-semibold text-sm">
                    Current rate: 1 BTC = $65,000 USD
                  </p>
                </ContactCard>
              </div>

              {/* FAQ */}
              <div className="mt-8">
                <ContactCard
                  icon={
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Frequently Asked"
                  description="Common questions about our Bitcoin booking process."
                >
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-white font-semibold">How do I pay with Bitcoin?</p>
                      <p className="text-neutral-500 text-sm mt-1">
                        During checkout, you'll receive a Bitcoin address and exact amount to send. Payment confirms your booking.
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-semibold">What if I need to cancel?</p>
                      <p className="text-neutral-500 text-sm mt-1">
                        Free cancellation up to 48 hours before check-in. Bitcoin refunds are issued to the original sending address.
                      </p>
                    </div>
                  </div>
                </ContactCard>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-6">
              Ready to book your stay? Choose from our 8 verified properties.
            </p>
            <Link to="/locations" className="btn-gold">
              Browse All Locations
            </Link>
          </div>
        </div>
      </section>

      {/* Bitcoin info strip */}
      <section style={{ backgroundColor: '#111111', borderTop: '1px solid #2a2a2a' }} className="py-10">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}
              >
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Bitcoin Payments Only</p>
                <p className="text-neutral-500 text-sm">All rooms 50% off when paying with Bitcoin</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-neutral-500 text-sm">Need help with Bitcoin payment?</p>
              <p className="text-gold font-semibold text-lg">
                <a href="mailto:support@halfpricestays.com" className="hover:text-gold-light transition-colors">
                  support@halfpricestays.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}