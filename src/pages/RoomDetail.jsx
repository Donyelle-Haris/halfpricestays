import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getRoomById, rooms } from '../data/rooms'

function AmenityItem({ text }) {
  return (
    <li className="flex items-center gap-2.5 text-neutral-400 text-sm">
      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}

function DateInput({ label, value, onChange, min }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
        {label}
      </label>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 transition-all"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          colorScheme: 'dark',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.25)' }}
        onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const room = getRoomById(id)

  const today = new Date().toISOString().split('T')[0]
  const defaultCheckout = new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]

  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(defaultCheckout)
  const [guests, setGuests] = useState(1)

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20" style={{ backgroundColor: '#0a0a0a' }}>
        <h2 className="font-sans font-bold text-white text-3xl">Room Not Found</h2>
        <p className="text-neutral-500">The room you are looking for does not exist.</p>
        <Link to="/rooms" className="btn-gold">Back to Rooms</Link>
      </div>
    )
  }

  // Calculate nights
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.max(
    1,
    Math.round((checkOutDate - checkInDate) / 86400000)
  )
  const totalUSD = room.salePrice * nights

  function handleCheckout() {
    navigate('/checkout', {
      state: {
        room,
        checkIn,
        checkOut,
        nights,
        guests,
        totalUSD,
      },
    })
  }

  // Other rooms (exclude current)
  const otherRooms = rooms.filter((r) => r.id !== room.id).slice(0, 3)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Hero image */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <div className="container-max mx-auto">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              <Link to="/rooms" className="hover:text-gold-light transition-colors">Rooms</Link>
              &nbsp;&rsaquo;&nbsp;{room.name}
            </p>
            <h1 className="font-sans font-extrabold text-white text-4xl lg:text-6xl text-shadow">
              {room.name}
            </h1>
            <p className="text-white/70 text-sm mt-2 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {room.location.address}
            </p>
          </div>
        </div>
      </div>

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Bed Type', value: room.bedType },
                { label: 'Room Size', value: `${room.sqft} sq ft` },
                { label: 'Max Guests', value: `${room.maxGuests} guests` },
                { label: 'Floor', value: room.floor },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
                >
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">{label}</p>
                  <p className="text-white font-semibold mt-1 text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Location card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
            >
              <h2 className="font-sans font-bold text-white text-xl mb-1 flex items-center gap-2">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </h2>
              <p className="text-gold text-sm font-semibold">{room.location.region}</p>
              <p className="text-neutral-500 text-sm mt-0.5">{room.location.address}</p>
              <div className="mt-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Nearby Attractions</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6">
                  {room.location.nearbyAttractions.map((attraction) => (
                    <li key={attraction} className="flex items-center gap-2 text-neutral-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {attraction}
                    </li>
                  ))}
                </ul>
              </div>
              {room.phone && (
                <div
                  className="mt-4 pt-4 flex flex-wrap gap-6 text-sm text-neutral-400"
                  style={{ borderTop: '1px solid #2a2a2a' }}
                >
                  <span>
                    <span className="font-semibold text-white">Phone: </span>
                    <a href={`tel:${room.phone}`} className="hover:text-gold transition-colors">{room.phone}</a>
                  </span>
                  {room.email && (
                    <span>
                      <span className="font-semibold text-white">Email: </span>
                      <a href={`mailto:${room.email}`} className="hover:text-gold transition-colors">{room.email}</a>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-sans font-bold text-white text-2xl mb-4">About This Room</h2>
              <p className="text-neutral-400 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-sans font-bold text-white text-2xl mb-5">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {room.amenities.map((a) => (
                  <AmenityItem key={a} text={a} />
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
            >
              <h2 className="font-sans font-bold text-white text-xl mb-4">Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-400">
                <div>
                  <p className="font-semibold text-white">Check-in</p>
                  <p>From 3:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Check-out</p>
                  <p>By 11:00 AM</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Cancellation</p>
                  <p>Free cancellation up to 48 hours before arrival</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Payment</p>
                  <p>Bitcoin only — full payment required at booking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
              >
                {/* Price header */}
                <div className="px-6 py-5" style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #2a2a2a' }}>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-neutral-500 text-xs uppercase tracking-widest">Per Night</p>
                      <p className="text-neutral-600 line-through text-sm mt-1">
                        ${room.originalPrice.toLocaleString()}
                      </p>
                      <p className="text-gold font-bold text-3xl font-sans">
                        ${room.salePrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      50% OFF
                    </div>
                  </div>
                </div>

                {/* Booking form */}
                <div className="p-6 space-y-4">
                  <DateInput
                    label="Check-in"
                    value={checkIn}
                    onChange={(v) => {
                      setCheckIn(v)
                      if (new Date(v) >= new Date(checkOut)) {
                        const next = new Date(new Date(v).getTime() + 86400000)
                        setCheckOut(next.toISOString().split('T')[0])
                      }
                    }}
                    min={today}
                  />
                  <DateInput
                    label="Check-out"
                    value={checkOut}
                    onChange={(v) => setCheckOut(v)}
                    min={
                      new Date(new Date(checkIn).getTime() + 86400000)
                        .toISOString()
                        .split('T')[0]
                    }
                  />

                  {/* Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                      Guests
                    </label>
                    <div
                      className="flex items-center gap-3 rounded-lg px-4 py-3"
                      style={{ border: '1px solid #2a2a2a' }}
                    >
                      <button
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-7 h-7 rounded-full text-white font-bold text-lg leading-none flex items-center justify-center transition-colors hover:bg-gold hover:text-white"
                        style={{ backgroundColor: '#2a2a2a' }}
                      >
                        &minus;
                      </button>
                      <span className="flex-1 text-center text-white font-semibold">
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <button
                        onClick={() => setGuests((g) => Math.min(room.maxGuests, g + 1))}
                        className="w-7 h-7 rounded-full text-white font-bold text-lg leading-none flex items-center justify-center transition-colors hover:bg-gold hover:text-white"
                        style={{ backgroundColor: '#2a2a2a' }}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-neutral-600">Max {room.maxGuests} guests</p>
                  </div>

                  {/* Price breakdown */}
                  <div className="pt-4 space-y-2" style={{ borderTop: '1px solid #2a2a2a' }}>
                    <div className="flex justify-between text-sm text-neutral-500">
                      <span>
                        ${room.salePrice.toLocaleString()} &times; {nights}{' '}
                        {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span>${totalUSD.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-500">
                      <span>Taxes &amp; fees</span>
                      <span>Included</span>
                    </div>
                    <div
                      className="flex justify-between font-semibold pt-2 mt-2"
                      style={{ borderTop: '1px solid #2a2a2a' }}
                    >
                      <span className="text-white font-bold">Total</span>
                      <span className="text-gold font-bold text-lg">
                        ${totalUSD.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn-gold w-full text-center"
                  >
                    Proceed to Checkout
                  </button>

                  <p className="text-xs text-neutral-600 text-center">
                    Payment via Bitcoin only. No credit cards accepted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other rooms */}
        <div className="mt-16 lg:mt-20">
          <h2 className="font-sans font-bold text-white text-3xl mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherRooms.map((r) => {
              const discount = Math.round(
                ((r.originalPrice - r.salePrice) / r.originalPrice) * 100
              )
              return (
                <Link
                  key={r.id}
                  to={`/rooms/${r.id}`}
                  className="group rounded-xl overflow-hidden card-hover"
                  style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {discount}% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-sans font-bold text-white">{r.name}</h3>
                    <p className="text-neutral-500 text-xs mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {r.location.city}, {r.location.state}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-neutral-600 line-through text-xs">
                        ${r.originalPrice}/night
                      </span>
                      <span className="text-gold font-bold text-sm">
                        ${r.salePrice}/night
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
