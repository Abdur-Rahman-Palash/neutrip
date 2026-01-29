export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Travel Accessories',
    description: 'Luggage, travel pillows, and more',
    icon: '🧳',
    link: '/shop/accessories'
  },
  {
    id: '2',
    title: 'eSIM & Data Plans',
    description: 'Stay connected worldwide',
    icon: '📱',
    link: '/esim'
  },
  {
    id: '3',
    title: 'Visa Assistance',
    description: 'Quick and easy visa processing',
    icon: '🛂',
    link: '/visa'
  },
  {
    id: '4',
    title: 'Airport Transfer',
    description: 'Comfortable rides to/from airport',
    icon: '🚗',
    link: '/transport'
  },
  {
    id: '5',
    title: 'Travel Insurance',
    description: 'Comprehensive coverage for your trips',
    icon: '🛡️',
    link: '/insurance'
  },
  {
    id: '6',
    title: 'Currency Exchange',
    description: 'Best rates for foreign exchange',
    icon: '💱',
    link: '/exchange'
  },
  {
    id: '7',
    title: 'Car Rental',
    description: 'Self-drive and chauffeur services',
    icon: '🚙',
    link: '/car-rental'
  },
  {
    id: '8',
    title: 'Travel Guide',
    description: 'Expert tips and destination info',
    icon: '📖',
    link: '/guides'
  }
];
