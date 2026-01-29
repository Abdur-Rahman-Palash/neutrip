export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount?: string;
  cta: string;
  category: 'flight' | 'hotel' | 'holiday';
}

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Summer Sale 2024',
    description: 'Get up to 30% off on domestic flights',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a139cc57?w=800&h=400&fit=crop',
    discount: '30% OFF',
    cta: 'Book Now',
    category: 'flight'
  },
  {
    id: '2',
    title: 'Beach Resort Special',
    description: 'Luxury stays starting from $99/night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop',
    discount: '50% OFF',
    cta: 'Explore Deals',
    category: 'hotel'
  },
  {
    id: '3',
    title: 'Dubai Holiday Package',
    description: '5 days 4 nights all-inclusive package',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea265f8dd86?w=800&h=400&fit=crop',
    discount: '25% OFF',
    cta: 'View Package',
    category: 'holiday'
  },
  {
    id: '4',
    title: 'Business Class Upgrade',
    description: 'Fly business class at economy prices',
    image: 'https://images.unsplash.com/photo-1548618606-52341b5b8a6d?w=800&h=400&fit=crop',
    discount: '40% OFF',
    cta: 'Upgrade Now',
    category: 'flight'
  },
  {
    id: '5',
    title: 'Weekend Getaway',
    description: 'Quick escapes to nearby destinations',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop',
    discount: '20% OFF',
    cta: 'Book Weekend',
    category: 'holiday'
  }
];
