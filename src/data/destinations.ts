export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelCount: number;
  description: string;
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Cox\'s Bazar',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=600&h=400&fit=crop',
    hotelCount: 156,
    description: 'World\'s longest natural sea beach'
  },
  {
    id: '2',
    name: 'Sylhet',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    hotelCount: 89,
    description: 'Tea gardens and natural beauty'
  },
  {
    id: '3',
    name: 'Kuakata',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&h=400&fit=crop',
    hotelCount: 45,
    description: 'Daughter of the sea'
  },
  {
    id: '4',
    name: 'Saint Martin',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1540202404-1b927e3f3a85?w=600&h=400&fit=crop',
    hotelCount: 28,
    description: 'Only coral island of Bangladesh'
  },
  {
    id: '5',
    name: 'Bandarban',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=600&h=400&fit=crop',
    hotelCount: 67,
    description: 'Hill tracks and tribal culture'
  },
  {
    id: '6',
    name: 'Rangamati',
    country: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    hotelCount: 52,
    description: 'Lake city of Bangladesh'
  }
];
