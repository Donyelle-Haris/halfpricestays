import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive ? 'text-gold' : 'text-neutral-400 hover:text-white'
    }`

  return (
    <header
      style={{ borderBottom: '1px solid #2a2a2a', backgroundColor: '#0a0a0a' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sans font-extrabold text-white text-xl lg:text-2xl tracking-tight group-hover:text-neutral-200 transition-colors duration-200">
              HalfPrice<span className="text-gold">.</span>Stays
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/locations" className={navLinkClass}>
              Locations
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>

            {/* Bitcoin badge */}
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
            >
              <svg
                className="w-3.5 h-3.5 text-gold flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
              </svg>
              <span className="text-white text-xs font-medium whitespace-nowrap">
                Bitcoin Only
              </span>
            </div>

            <button
              onClick={() => navigate('/locations')}
              className="btn-gold text-sm px-5 py-2.5"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neutral-400 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden pb-4 pt-3 space-y-3"
            style={{ borderTop: '1px solid #2a2a2a' }}
          >
            <NavLink
              to="/"
              className={navLinkClass}
              end
              onClick={() => setMenuOpen(false)}
            >
              <span className="block px-1 py-2">Home</span>
            </NavLink>
            <NavLink
              to="/locations"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <span className="block px-1 py-2">Locations</span>
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <span className="block px-1 py-2">Contact Us</span>
            </NavLink>
            <div className="flex items-center gap-1.5 px-1 py-2">
              <svg
                className="w-3.5 h-3.5 text-gold"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
              </svg>
              <span className="text-white text-xs font-medium">Bitcoin Payments Only</span>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false)
                navigate('/locations')
              }}
              className="btn-gold text-sm w-full text-center mt-2"
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
