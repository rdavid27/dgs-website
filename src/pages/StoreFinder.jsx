import { useState } from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Search, Navigation, Compass } from 'lucide-react';
import './StoreFinder.css';

const outletsData = [
  {
    id: 'out-pettah',
    name: 'Pettah Flagship (Head Office)',
    address: '214, Gasworks Street, Colombo 11, Sri Lanka',
    phone: '+94 11 232 4567',
    hours: 'Mon - Sat: 8:30 AM - 6:30 PM, Sun: Closed',
    openHours: { start: 8.5, end: 18.5, days: [1, 2, 3, 4, 5, 6] }, // Mon-Sat
    type: 'Wholesale & Retail',
    amenities: ['Live Peanut Roasting', 'Bulk Order Station', 'Spicy Mixture Bar', 'Card Payments'],
    mapX: 110,
    mapY: 180,
    shortDesc: 'Our original heritage shop opened in 1978. The absolute hub for fresh hot mixtures.'
  },
  {
    id: 'out-galleface',
    name: 'Galle Face Green Kiosk',
    address: 'Galle Face Green Promenade, Colombo 03, Sri Lanka',
    phone: '+94 77 123 4567',
    hours: 'Daily: 4:00 PM - 10:00 PM',
    openHours: { start: 16.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] }, // Daily
    type: 'Historic Kiosk',
    amenities: ['Heritage Cart Style', 'Fresh Hot Murukkus', 'Ocean Breeze Views', 'Cash Only'],
    mapX: 100,
    mapY: 200,
    shortDesc: 'A tribute to Mr. David Gnanapragasam’s original 1962 cart. Perfect evening tea-time snack spot.'
  },
  {
    id: 'out-ofg',
    name: 'One Galle Face Mall Boutique',
    address: 'Lower Ground Floor, One Galle Face Mall, Colombo 02, Sri Lanka',
    phone: '+94 11 456 7890',
    hours: 'Daily: 10:00 AM - 10:00 PM',
    openHours: { start: 10.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] }, // Daily
    type: 'Premium Boutique',
    amenities: ['Gourmet Gift Packs', 'Tasting Station', 'Air Conditioned', 'Card & Mobile Pay'],
    mapX: 105,
    mapY: 190,
    shortDesc: 'Luxury boutique experience. Customize your snack gift baskets with custom labels.'
  },
  {
    id: 'out-kandy',
    name: 'Kandy City Centre Outlet',
    address: 'Level 2, Kandy City Centre, Dalada Veediya, Kandy, Sri Lanka',
    phone: '+94 81 234 5678',
    hours: 'Daily: 9:00 AM - 8:00 PM',
    openHours: { start: 9.0, end: 20.0, days: [0, 1, 2, 3, 4, 5, 6] }, // Daily
    type: 'Hill Country Branch',
    amenities: ['Premium Cashews', 'Bulk Event Ordering', 'Local Sweets Bar', 'Card Payments'],
    mapX: 200,
    mapY: 130,
    shortDesc: 'Bringing the authentic Galle Face peanut crunch to the heart of the Hill Capital.'
  }
];

const StoreFinder = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(outletsData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if store is open based on system time (dynamically updated)
  const getStoreStatus = (outlet) => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sun, 1 = Mon...
    const currentHour = now.getHours() + now.getMinutes() / 60;
    
    const { start, end, days } = outlet.openHours;
    
    if (!days.includes(currentDay)) {
      return { status: 'Closed', label: 'Closed Today', class: 'closed' };
    }
    
    if (currentHour >= start && currentHour < end) {
      return { status: 'Open', label: 'Open Now', class: 'open' };
    }
    
    return { status: 'Closed', label: 'Closed Now', class: 'closed' };
  };

  const filteredOutlets = outletsData.filter(outlet => 
    outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    outlet.amenities.some(am => am.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="store-finder-page animate-fade-in">
      {/* Banner */}
      <div className="store-banner text-center">
        <div className="container">
          <span className="section-subtitle">DGS Locations</span>
          <h1 className="page-title">Find a David Gram Store</h1>
          <p className="page-subtitle">Visit us to taste the freshest warm mixtures and customized cashew roasts.</p>
        </div>
      </div>

      <div className="container store-finder-container">
        <div className="store-finder-grid">
          
          {/* Left Column: List and Search */}
          <div className="store-sidebar">
            <div className="search-box-wrapper">
              <Search size={18} className="sidebar-search-icon" />
              <input 
                type="text" 
                placeholder="Search by city, branch or amenity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
              />
            </div>

            <div className="outlet-list">
              {filteredOutlets.length > 0 ? (
                filteredOutlets.map(outlet => {
                  const statusInfo = getStoreStatus(outlet);
                  const isSelected = selectedOutlet.id === outlet.id;
                  
                  return (
                    <div 
                      key={outlet.id}
                      className={`outlet-list-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedOutlet(outlet)}
                    >
                      <div className="card-header-row">
                        <span className="outlet-type-tag">{outlet.type}</span>
                        <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>
                      </div>
                      <h4 className="outlet-card-title">{outlet.name}</h4>
                      <p className="outlet-card-addr"><MapPin size={14} /> {outlet.address}</p>
                      <div className="card-hover-indicator">Select Store <Compass size={14} className="compass-spin" /></div>
                    </div>
                  );
                })
              ) : (
                <div className="no-outlets text-center">
                  <p>No outlets matching your search query.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Map and Details Card */}
          <div className="store-main">
            {/* Custom SVG Interactive Map */}
            <div className="interactive-map-panel">
              <div className="map-legend">Interactive Outlet Map</div>
              <svg viewBox="0 0 300 300" className="sri-lanka-svg">
                {/* SVG Outline for Sri Lanka (Mock Vector representing boundaries) */}
                <path 
                  d="M130,20 C140,25 155,30 160,40 C165,50 170,70 175,90 C180,110 190,130 195,150 C200,170 210,195 210,210 C210,225 200,240 190,255 C180,270 160,285 145,290 C130,295 110,285 95,275 C80,265 65,245 60,230 C55,215 50,190 52,175 C55,160 65,140 70,120 C75,100 85,80 95,60 C105,40 120,25 130,20 Z" 
                  className="island-outline"
                />
                
                {/* Connecting Lines for Colombo cluster */}
                <line x1="50" y1="205" x2="105" y2="190" className="map-guideline" />
                
                {/* Map Pins */}
                {outletsData.map(outlet => {
                  const isSelected = selectedOutlet.id === outlet.id;
                  return (
                    <g 
                      key={outlet.id} 
                      className={`map-pin-group ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedOutlet(outlet)}
                      style={{ cursor: 'pointer' }}
                    >
                      {isSelected && (
                        <>
                          <circle cx={outlet.mapX} cy={outlet.mapY} r="16" className="pulsing-ring" />
                          <circle cx={outlet.mapX} cy={outlet.mapY} r="10" className="pulsing-ring-two" />
                        </>
                      )}
                      <circle cx={outlet.mapX} cy={outlet.mapY} r="6" className="pin-dot" />
                      <text 
                        x={outlet.mapX + 8} 
                        y={outlet.mapY + 4} 
                        className="map-pin-label"
                      >
                        {outlet.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Store Detailed Card */}
            <div className="store-detail-card animate-fade-in" key={selectedOutlet.id}>
              <div className="detail-header">
                <div>
                  <span className="outlet-type-tag-large">{selectedOutlet.type}</span>
                  <h3>{selectedOutlet.name}</h3>
                </div>
                <button className="directions-btn" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedOutlet.address)}`, '_blank')}>
                  <Navigation size={16} /> <span>Get Directions</span>
                </button>
              </div>

              <p className="detail-desc">{selectedOutlet.shortDesc}</p>

              <div className="detail-divider"></div>

              <div className="detail-info-rows">
                <div className="info-row">
                  <MapPin size={18} className="text-gold" />
                  <div>
                    <strong>Address</strong>
                    <p>{selectedOutlet.address}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Phone size={18} className="text-gold" />
                  <div>
                    <strong>Phone</strong>
                    <p>{selectedOutlet.phone}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Clock size={18} className="text-gold" />
                  <div>
                    <strong>Hours</strong>
                    <p>{selectedOutlet.hours}</p>
                  </div>
                </div>
              </div>

              <div className="detail-divider"></div>

              <div className="amenities-section">
                <h4>Store Offerings & Amenities</h4>
                <div className="amenities-grid">
                  {selectedOutlet.amenities.map((am, i) => (
                    <div key={i} className="amenity-badge">
                      <ShieldCheck size={14} className="text-gold" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreFinder;
