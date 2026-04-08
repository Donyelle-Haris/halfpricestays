import { useLocation, Link } from 'react-router-dom'
import { rooms } from '../data/rooms'
import RoomCard from '../components/RoomCard'

export default function Rooms() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const cityFilter = queryParams.get('city')

  // Filter rooms by city if filter is provided
  const filteredRooms = cityFilter
    ? rooms.filter(room =>
        room.location.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
        room.location.state.toLowerCase().includes(cityFilter.toLowerCase())
      )
    : rooms

  const locationText = cityFilter
    ? `in ${cityFilter}`
    : 'across Indiana and Ohio'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Page header */}
      <div className="pt-32 pb-16" style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #2a2a2a' }}>
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Accommodations
          </p>
          <h1 className="font-sans font-extrabold text-white text-5xl lg:text-6xl">
            Our Rooms &amp; Suites
          </h1>
          <p className="text-neutral-500 mt-5 max-w-xl mx-auto text-lg">
            {filteredRooms.length} verified property{filteredRooms.length !== 1 ? 's' : ''} {locationText} — all at 50% off,
            exclusively via Bitcoin.
          </p>

          {/* Verified badge + Sale notice row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Verified Properties badge */}
            <div
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5"
              style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-green-500 text-sm font-semibold">
                Verified Properties
              </p>
            </div>

            {/* Sale notice */}
            <div
              className="inline-flex items-center gap-3 rounded-xl px-5 py-2.5"
              style={{ backgroundColor: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="text-gold text-sm font-medium">
                All prices shown are the <strong>50% sale price</strong>. Original prices crossed out for reference.
              </p>
            </div>

            {/* Filter indicator */}
            {cityFilter && (
              <div
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2"
                style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <p className="text-blue-500 text-sm font-medium">
                  Showing properties in <strong>{cityFilter}</strong>
                </p>
                <Link
                  to="/rooms"
                  className="text-blue-500 hover:text-blue-400 transition-colors ml-1"
                  title="Clear filter"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rooms grid */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-white text-xl mb-2">No Rooms Found</h3>
              <p className="text-neutral-500 max-w-md mx-auto mb-6">
                We couldn't find any properties matching "{cityFilter}". Try another location or browse all properties.
              </p>
              <Link to="/locations" className="btn-gold">
                Browse All Locations
              </Link>
            </div>
          )}
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
                <p className="text-neutral-500 text-sm">We accept no credit cards, debit cards, or other payment methods.</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-neutral-500 text-sm">Current rate used for booking</p>
              <p className="text-gold font-semibold text-lg">1 BTC = $65,000 USD</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
