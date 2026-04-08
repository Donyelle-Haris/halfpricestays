import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid #2a2a2a' }} className="text-neutral-500">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-block">
              <h3 className="font-sans font-extrabold text-white text-2xl tracking-tight group-hover:text-neutral-200 transition-colors">
                HalfPrice<span className="text-gold">.</span>Stays
              </h3>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Real hotels across the Midwest at 50% off the published rate.
              Fast, private bookings — Bitcoin only.
            </p>
            {/* Bitcoin badge */}
            <div
              className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2"
              style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
            >
              <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
              </svg>
              <div>
                <p className="text-gold text-xs font-semibold leading-none">Bitcoin Payments Only</p>
                <p className="text-neutral-600 text-xs mt-0.5">Secure · Private · Instant</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/locations', label: 'Locations' },
                { to: '/contact', label: 'Contact Us' },
                ...rooms.slice(0, 3).map(room => ({
                  to: `/rooms/${room.id}`,
                  label: room.name.length > 25 ? `${room.name.substring(0, 25)}...` : room.name
                }))
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-500 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Contact
            </h4>
            <address className="not-italic space-y-3 text-sm text-neutral-500">
              <p className="leading-relaxed">
                Corporate Office
                <br />
                9251 Wesleyan Rd
                <br />
                Indianapolis, IN 46268
              </p>
              <p>
                <a
                  href="tel:+18005550199"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 (800) 555-0199
                </a>
              </p>
              <p>
                <a
                  href="mailto:reservations@halfpricestays.xyz"
                  className="hover:text-white transition-colors duration-200"
                >
                  reservations@halfpricestays.xyz
                </a>
              </p>
            </address>
            <div className="mt-6">
              <p className="text-xs text-neutral-600 uppercase tracking-widest mb-3">Check-in / Check-out</p>
              <p className="text-sm text-neutral-500">Check-in: 3:00 PM</p>
              <p className="text-sm text-neutral-500">Check-out: 11:00 AM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #2a2a2a' }}
        >
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} HalfPriceStays. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Payments processed exclusively via Bitcoin. Prices subject to availability.
          </p>
        </div>
      </div>
    </footer>
  )
}
