import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'
import RoomCard from '../components/RoomCard'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80'

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-gold"
        style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-sans font-bold text-white text-base">{title}</h4>
        <p className="text-neutral-500 text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const featuredRooms = rooms.slice(0, 3)

  return (
    <div style={{ backgroundColor: '#0a0a0a' }}>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '5rem' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="HalfPriceStays hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.85) 100%)' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Sale banner pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8"
            style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)' }}
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-semibold tracking-wide">
              Limited Offer — 50% Off All Rooms
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl leading-tight text-shadow">
            Real Hotels.<br />
            <span className="text-gold">Half the Price.</span>
          </h1>

          <p className="text-neutral-300 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl mx-auto">
            HalfPriceStays partners with trusted budget and mid-range hotels
            across the Midwest — offering verified rooms at 50% off the standard
            rate. Pay with Bitcoin and lock in your stay today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/locations" className="btn-gold text-base px-8 py-4">
              Explore Rooms
            </Link>
            <a
              href="#about"
              className="btn-outline-gold text-base px-8 py-4"
            >
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '8', label: 'Properties' },
              { value: '50%', label: 'Off All Rooms' },
              { value: 'BTC', label: 'Exclusive Payment' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-sans font-extrabold text-gold text-3xl">{value}</p>
                <p className="text-neutral-400 text-xs mt-1 tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* 50% Off Banner */}
      <section style={{ backgroundColor: '#1a1a1a', borderLeft: '4px solid #f97316', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }} className="py-5">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
            <p className="font-sans font-bold text-white text-xl sm:text-2xl">
              Exclusive Limited-Time Offer
            </p>
            <div className="hidden sm:block h-5 w-px" style={{ backgroundColor: '#2a2a2a' }} />
            <p className="font-sans text-sm font-medium text-neutral-400">
              All rooms at <strong className="text-gold">50% off</strong> — Bitcoin payment required to unlock this rate
            </p>
            <Link
              to="/locations"
              className="bg-gold text-white font-semibold text-sm px-5 py-2 rounded hover:bg-gold-light transition-colors duration-200 whitespace-nowrap"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="section-padding" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container-max mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Accommodations
            </p>
            <h2 className="font-sans font-extrabold text-white text-4xl lg:text-5xl">
              Featured Rooms
            </h2>
            <p className="text-neutral-500 mt-4 max-w-xl mx-auto">
              All 8 real HalfPriceStays properties across Indiana and Ohio — verified addresses
              and real nightly rates pulled directly from halfpricestays.com.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/locations" className="btn-outline-gold">
              View All 8 Properties
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding" style={{ backgroundColor: '#0f0f0f' }}>
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="rounded-xl overflow-hidden h-48 lg:h-60 col-span-2 sm:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
                  alt="Hotel room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-48 lg:h-60 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80"
                  alt="Hotel room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-40 lg:h-48 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80"
                  alt="Hotel lobby"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-40 lg:h-48 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"
                  alt="Hotel room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
                About Us
              </p>
              <h2 className="font-sans font-extrabold text-white text-4xl lg:text-5xl leading-tight">
                Trusted Hotels.<br />Real Midwest Rates.
              </h2>
              <p className="text-neutral-500 mt-5 leading-relaxed">
                HalfPriceStays is a real, operating hotel brand with 8 properties across
                Indiana and Ohio — including Indianapolis (Northwest, Lawrence, Norwood),
                Marion, Kokomo, Wabash, Columbia City, and Northwood, OH.
              </p>
              <p className="text-neutral-500 mt-4 leading-relaxed">
                Every property is a legitimate, operating hotel with a verified address
                and standard amenities. We offer these stays at 50% off the published
                rack rate, payable exclusively in Bitcoin for a fast, private booking
                with no credit card required.
              </p>

              <div className="mt-8 space-y-5">
                <FeatureItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  }
                  title="Verified Real Hotels"
                  description="Every property is a real, operating hotel with a verified address, real guest reviews, and standard chain-level amenities."
                />
                <FeatureItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  title="Bitcoin-Exclusive Booking"
                  description="Enjoy complete financial privacy with our Bitcoin-only payment system — no chargebacks, no exposure, no compromise."
                />
                <FeatureItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  }
                  title="8 Real Locations"
                  description="Indianapolis (3 locations), Marion, Kokomo, Wabash, Columbia City, and Northwood, OH — all real, operating HalfPriceStays properties."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #2a2a2a' }}
      >
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f97316" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 container-max mx-auto px-4 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Ready to Book?
          </p>
          <h2 className="font-sans font-extrabold text-white text-4xl lg:text-5xl">
            Reserve Your Room Tonight
          </h2>
          <p className="text-neutral-500 mt-4 max-w-lg mx-auto">
            Eight real hotels across the Midwest, all at 50% off the standard nightly
            rate. Pay with Bitcoin — no credit card, no hassle.
          </p>
          <Link to="/locations" className="btn-gold mt-8 text-base px-10 py-4 inline-block">
            Browse All Rooms
          </Link>
        </div>
      </section>
    </div>
  )
}
