import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

const BTC_ADDRESS = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
const BTC_RATE = 65000

function InputField({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all placeholder-neutral-700"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          colorScheme: 'dark',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.2)' }}
        onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function SuccessScreen({ booking }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-lg w-full text-center">
        {/* Checkmark icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e' }}
        >
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-sans font-extrabold text-white text-4xl">
          Payment Received
        </h1>
        <h2 className="font-sans font-bold text-gold text-2xl mt-1">Booking Confirmed!</h2>

        <p className="text-neutral-500 mt-4 leading-relaxed">
          Thank you, <strong className="text-white">{booking.name}</strong>. Your reservation at
          HalfPriceStays has been confirmed. A confirmation has been sent to{' '}
          <strong className="text-white">{booking.email}</strong>.
        </p>

        {/* Booking summary card */}
        <div
          className="mt-8 rounded-2xl p-6 text-left space-y-3"
          style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
        >
          <div className="flex items-center gap-2 pb-3 mb-4" style={{ borderBottom: '1px solid #2a2a2a' }}>
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="font-sans font-bold text-white">Booking Summary</h3>
          </div>
          {[
            ['Room', booking.room.name],
            ['Check-in', booking.checkIn],
            ['Check-out', booking.checkOut],
            ['Nights', booking.nights],
            ['Guests', booking.guests],
            ['Total Paid', `$${booking.totalUSD.toLocaleString()} USD`],
            ['BTC Paid', `${(booking.totalUSD / BTC_RATE).toFixed(8)} BTC`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-neutral-500">{label}</span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-gold"
          >
            Return Home
          </button>
          <button
            onClick={() => navigate('/rooms')}
            className="btn-outline-gold"
          >
            Browse More Rooms
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)

  // Fallback if navigated directly without state
  if (!state || !state.room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20" style={{ backgroundColor: '#0a0a0a' }}>
        <h2 className="font-sans font-bold text-white text-3xl">No Booking Selected</h2>
        <p className="text-neutral-500">Please select a room to continue.</p>
        <Link to="/rooms" className="btn-gold">Browse Rooms</Link>
      </div>
    )
  }

  const { room, checkIn, checkOut, nights, guests, totalUSD } = state
  const btcAmount = (totalUSD / BTC_RATE).toFixed(8)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${BTC_ADDRESS}`

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email address'
    return errs
  }

  function handleConfirm(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setConfirmed(true)
  }

  function copyAddress() {
    navigator.clipboard.writeText(BTC_ADDRESS).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (confirmed) {
    return (
      <SuccessScreen
        booking={{ name, email, room, checkIn, checkOut, nights, guests, totalUSD }}
      />
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
            <Link to="/rooms" className="hover:text-gold-light transition-colors">Rooms</Link>
            &nbsp;&rsaquo;&nbsp;
            <Link to={`/rooms/${room.id}`} className="hover:text-gold-light transition-colors">{room.name}</Link>
            &nbsp;&rsaquo;&nbsp;Checkout
          </p>
          <h1 className="font-sans font-extrabold text-white text-4xl lg:text-5xl">
            Complete Your Booking
          </h1>
        </div>

        <form onSubmit={handleConfirm} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left: Guest info + BTC payment */}
            <div className="lg:col-span-3 space-y-8">

              {/* Guest info */}
              <div
                className="rounded-2xl p-6 lg:p-8"
                style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
              >
                <h2 className="font-sans font-bold text-white text-2xl mb-6 flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full text-gold text-sm font-bold flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.4)' }}
                  >
                    1
                  </span>
                  Guest Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <InputField
                      label="Full Name"
                      value={name}
                      onChange={(v) => { setName(v); setErrors((e) => ({ ...e, name: '' })) }}
                      placeholder="Jane Smith"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: '' })) }}
                      placeholder="jane@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Phone (optional)"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                      Special Requests (optional)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Late check-in, dietary requirements, room preferences..."
                      rows={3}
                      className="rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-all placeholder-neutral-700 resize-none"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #2a2a2a',
                        colorScheme: 'dark',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.2)' }}
                      onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Bitcoin payment */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
              >
                <div className="px-6 lg:px-8 pt-6 lg:pt-8 pb-4">
                  <h2 className="font-sans font-bold text-white text-2xl mb-1 flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full text-gold text-sm font-bold flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.4)' }}
                    >
                      2
                    </span>
                    Bitcoin Payment
                  </h2>
                  <p className="text-neutral-500 text-sm ml-11">
                    Send the exact BTC amount to the address below. Your booking is
                    confirmed upon payment detection.
                  </p>
                </div>

                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  {/* Amount row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    >
                      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Amount (USD)</p>
                      <p className="text-white font-bold text-2xl font-sans">
                        ${totalUSD.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)' }}
                    >
                      <p className="text-gold text-xs uppercase tracking-widest mb-1">Amount (BTC)</p>
                      <p className="text-gold font-bold text-2xl font-sans">
                        {btcAmount}
                      </p>
                      <p className="text-neutral-500 text-xs mt-1">1 BTC = $65,000</p>
                    </div>
                  </div>

                  {/* QR + address */}
                  <div
                    className="flex flex-col sm:flex-row gap-6 items-center rounded-xl p-5"
                    style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
                  >
                    {/* QR code */}
                    <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md">
                      <img
                        src={qrUrl}
                        alt="Bitcoin payment QR code"
                        width={160}
                        height={160}
                        className="block"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">
                        Send exactly {btcAmount} BTC to:
                      </p>
                      <div className="flex items-center gap-2">
                        <code
                          className="text-gold text-xs sm:text-sm font-mono rounded-lg px-3 py-2 flex-1 min-w-0 break-all block"
                          style={{ backgroundColor: '#0a0a0a' }}
                        >
                          {BTC_ADDRESS}
                        </code>
                        <button
                          type="button"
                          onClick={copyAddress}
                          className="flex-shrink-0 w-9 h-9 rounded-lg text-gold hover:bg-gold hover:text-white transition-colors flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}
                          title="Copy address"
                        >
                          {copied ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {copied && (
                        <p className="text-gold text-xs mt-2">Address copied to clipboard</p>
                      )}
                      <div className="mt-4 space-y-1.5 text-xs text-neutral-500">
                        <p>· Send only Bitcoin (BTC) to this address</p>
                        <p>· Do not send from an exchange directly</p>
                        <p>· Transaction typically confirms in 10–30 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold w-full text-center text-base py-4"
              >
                Confirm Booking
              </button>
              <p className="text-xs text-neutral-600 text-center -mt-4">
                By confirming, you agree to our booking terms. Payment is in Bitcoin only.
              </p>
            </div>

            {/* Right: Booking summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
                >
                  {/* Room image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="font-sans font-bold text-white text-lg text-shadow">
                        {room.name}
                      </h3>
                    </div>
                    <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      50% OFF
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h2 className="font-sans font-bold text-white text-xl">
                      Booking Summary
                    </h2>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      {[
                        ['Check-in', checkIn],
                        ['Check-out', checkOut],
                        [
                          'Duration',
                          `${nights} ${nights === 1 ? 'night' : 'nights'}`,
                        ],
                        [
                          'Guests',
                          `${guests} ${guests === 1 ? 'guest' : 'guests'}`,
                        ],
                        ['Bed Type', room.bedType],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-neutral-500">{label}</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 space-y-2 text-sm" style={{ borderTop: '1px solid #2a2a2a' }}>
                      <div className="flex justify-between text-neutral-500">
                        <span>
                          ${room.salePrice.toLocaleString()} &times; {nights}{' '}
                          {nights === 1 ? 'night' : 'nights'}
                        </span>
                        <span>${totalUSD.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>Original price (saved)</span>
                        <span className="line-through">
                          ${(room.originalPrice * nights).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-500 font-medium">
                        <span>You save</span>
                        <span>
                          $
                          {(
                            (room.originalPrice - room.salePrice) * nights
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4" style={{ borderTop: '1px solid #2a2a2a' }}>
                      <div className="flex justify-between font-semibold text-white">
                        <span className="font-bold text-lg">Total</span>
                        <span className="text-gold font-bold text-xl">
                          ${totalUSD.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500 mt-1">
                        <span>In Bitcoin</span>
                        <span className="font-mono">{btcAmount} BTC</span>
                      </div>
                    </div>

                    {/* Bitcoin badge */}
                    <div
                      className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2"
                      style={{ backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
                    >
                      <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.5 2C6.25 2 2 6.25 2 11.5S6.25 21 11.5 21 21 16.75 21 11.5 16.75 2 11.5 2zm1.25 12.54v1.46h-1.25v-1.37c-.62-.05-1.24-.2-1.76-.42l.31-1.24c.53.21 1.22.44 1.94.44.62 0 1.06-.25 1.06-.69 0-.43-.34-.68-1.12-.94-1.17-.38-2.12-.9-2.12-2.04 0-.98.68-1.77 1.83-2.01V6.35h1.25v1.28c.63.06 1.06.21 1.45.38l-.3 1.21c-.35-.15-.84-.36-1.52-.36-.73 0-.94.32-.94.62 0 .36.36.58 1.27.92 1.28.44 1.99 1.03 1.99 2.14 0 1.04-.74 1.84-1.95 2.06v-.06z" />
                      </svg>
                      <p className="text-xs text-neutral-400">
                        Paid exclusively via Bitcoin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
