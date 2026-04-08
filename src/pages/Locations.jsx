import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'

// Group rooms by city
const locations = rooms.reduce((acc, room) => {
  const key = `${room.location.city}, ${room.location.state}`
  if (!acc[key]) {
    acc[key] = {
      city: room.location.city,
      state: room.location.state,
      properties: [],
      image: room.image, // Use first room's image as location image
    }
  }
  acc[key].properties.push(room)
  return acc
}, {})

const locationList = Object.values(locations).map(loc => ({
  ...loc,
  propertyCount: loc.properties.length,
}))

// Sort by property count (most first)
locationList.sort((a, b) => b.propertyCount - a.propertyCount)

function LocationCard({ location }) {
  return (
    <Link
      to={`/rooms?city=${encodeURIComponent(location.city)}`}
      className="group rounded-2xl overflow-hidden card-hover block"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={location.image}
          alt={`${location.city}, ${location.state}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)' }} />

        {/* City badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            {location.propertyCount} {location.propertyCount === 1 ? 'Property' : 'Properties'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-sans font-bold text-white text-xl">
          {location.city}, {location.state}
        </h3>
        <p className="text-neutral-500 text-sm mt-1">
          {location.properties.slice(0, 3).map(p => p.name).join(', ')}
          {location.propertyCount > 3 && ` +${location.propertyCount - 3} more`}
        </p>

        {/* Amenity preview */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {Array.from(new Set(location.properties.flatMap(p => p.amenities.slice(0, 2))))
            .slice(0, 3)
            .map(amenity => (
              <span
                key={amenity}
                className="text-neutral-400 text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
              >
                {amenity}
              </span>
            ))}
        </div>

        {/* View rooms button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gold text-sm font-semibold">
            View Rooms →
          </span>
          <span className="text-neutral-600 text-xs">
            From ${Math.min(...location.properties.map(p => p.salePrice))}/night
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Locations() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Page header */}
      <div className="pt-32 pb-16" style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #2a2a2a' }}>
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Find Your Stay
          </p>
          <h1 className="font-sans font-extrabold text-white text-5xl lg:text-6xl">
            Choose Your Location
          </h1>
          <p className="text-neutral-500 mt-5 max-w-xl mx-auto text-lg">
            HalfPriceStays operates 8 verified properties across Indiana and Ohio.
            Select a location to view available rooms.
          </p>
        </div>
      </div>

      {/* Locations grid */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {locationList.map((location) => (
              <LocationCard key={`${location.city}-${location.state}`} location={location} />
            ))}
          </div>

          {/* All rooms fallback */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 text-sm mb-4">
              Or browse all properties regardless of location
            </p>
            <Link to="/rooms" className="btn-outline-gold">
              View All 8 Properties
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
              <p className="text-neutral-500 text-sm">Current exchange rate</p>
              <p className="text-gold font-semibold text-lg">1 BTC = $65,000 USD</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}