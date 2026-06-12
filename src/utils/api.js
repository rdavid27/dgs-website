import { products as localProducts } from '../data/products';

const API_BASE_URL = '/api';

// Offline fallback for outlets data (originally hardcoded in StoreFinder.jsx)
const localOutlets = [
  {
    id: 'out-pettah',
    name: 'Pettah Flagship (Head Office)',
    address: '214, Gasworks Street, Colombo 11, Sri Lanka',
    phone: '+94 11 232 4567',
    hours: 'Mon - Sat: 8:30 AM - 6:30 PM, Sun: Closed',
    openHours: { start: 8.5, end: 18.5, days: [1, 2, 3, 4, 5, 6] },
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
    openHours: { start: 16.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] },
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
    openHours: { start: 10.0, end: 22.0, days: [0, 1, 2, 3, 4, 5, 6] },
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
    openHours: { start: 9.0, end: 20.0, days: [0, 1, 2, 3, 4, 5, 6] },
    type: 'Hill Country Branch',
    amenities: ['Premium Cashews', 'Bulk Event Ordering', 'Local Sweets Bar', 'Card Payments'],
    mapX: 200,
    mapY: 130,
    shortDesc: 'Bringing the authentic Galle Face peanut crunch to the heart of the Hill Capital.'
  }
];

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('API server returned error');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline or error fetching products, falling back to local data.', error);
    return localProducts;
  }
};

export const fetchOutlets = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/outlets`);
    if (!res.ok) throw new Error('API server returned error');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline or error fetching outlets, falling back to local data.', error);
    return localOutlets;
  }
};

export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) {
    const errorDetail = await res.json().catch(() => ({}));
    throw new Error(errorDetail.error || 'Failed to place order via API');
  }
  return await res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_BASE_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders from server');
  return await res.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const errorDetail = await res.json().catch(() => ({}));
    throw new Error(errorDetail.error || 'Failed to update order status');
  }
  return await res.json();
};
