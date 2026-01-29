export interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  amenities: string[];
}

export interface HolidayPackage {
  id: string;
  name: string;
  image: string;
  duration: string;
  price: number;
  locations: string[];
  includes: string[];
}

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Pan Pacific Sonargaon Dhaka',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 1234,
    price: 150,
    location: 'Dhaka',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym']
  },
  {
    id: '2',
    name: 'Long Beach Hotel Cox\'s Bazar',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 892,
    price: 120,
    location: 'Cox\'s Bazar',
    amenities: ['Beach Access', 'Pool', 'Restaurant']
  },
  {
    id: '3',
    name: 'Hotel Sylhet International',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
    rating: 4.1,
    reviewCount: 567,
    price: 85,
    location: 'Sylhet',
    amenities: ['WiFi', 'Restaurant', 'Parking']
  },
  {
    id: '4',
    name: 'Grand Sultan Tea Resort',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 445,
    price: 200,
    location: 'Sylhet',
    amenities: ['Tea Garden', 'Pool', 'Spa', 'Restaurant']
  }
];

export const holidayPackages: HolidayPackage[] = [
  {
    id: '1',
    name: 'Bangladesh Heritage Tour',
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&h=400&fit=crop',
    duration: '7 Days 6 Nights',
    price: 899,
    locations: ['Dhaka', 'Sylhet', 'Chittagong'],
    includes: ['Hotel', 'Transport', 'Guide', 'Meals']
  },
  {
    id: '2',
    name: 'Beach Paradise Package',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop',
    duration: '5 Days 4 Nights',
    price: 699,
    locations: ['Cox\'s Bazar', 'Saint Martin'],
    includes: ['Resort', 'Transport', 'Meals', 'Activities']
  },
  {
    id: '3',
    name: 'Hill District Adventure',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
    duration: '4 Days 3 Nights',
    price: 499,
    locations: ['Bandarban', 'Rangamati'],
    includes: ['Hotel', 'Transport', 'Guide', 'Trekking']
  },
  {
    id: '4',
    name: 'Sundarbans Wildlife Tour',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    duration: '3 Days 2 Nights',
    price: 399,
    locations: ['Sundarbans', 'Khulna'],
    includes: ['Eco Resort', 'Boat Tour', 'Meals', 'Guide']
  }
];
