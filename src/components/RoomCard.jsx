import { Link } from 'react-router-dom'

export default function RoomCard({ room }) {
  const discount = Math.round(
    ((room.originalPrice - room.salePrice) / room.originalPrice) * 100
  )

  return (
    <article
      className="rounded-2xl overflow-hidden card-hover group"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56 sm:h-60">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Discount badge */}
        <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {discount}% OFF
        </div>
        {/* Max guests */}
        <div
          className="absolute top-4 right-4 text-white text-xs px-2.5 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          Up to {room.maxGuests} guests
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans font-bold text-white text-xl leading-tight">
              {room.name}
            </h3>
            <p className="text-neutral-500 text-xs mt-1 flex items-center gap-1">
              <svg className="w-3 h-3 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {room.location.city}, {room.location.state}
            </p>
            <p className="text-neutral-600 text-xs mt-0.5">
              {room.bedType} &bull; {room.sqft} sq ft
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="price-original">${room.originalPrice}/night</p>
            <p className="price-sale">${room.salePrice}<span className="text-sm font-normal text-neutral-500">/night</span></p>
          </div>
        </div>

        <p className="text-neutral-500 text-sm mt-3 leading-relaxed line-clamp-2">
          {room.shortDescription}
        </p>

        {/* Amenity pills — first 3 */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {room.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="text-neutral-400 text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
            >
              {a}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-neutral-600 text-xs px-2 py-1">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <Link
          to={`/rooms/${room.id}`}
          className="btn-gold mt-5 w-full text-center text-sm"
        >
          Book Now
        </Link>
      </div>
    </article>
  )
}
