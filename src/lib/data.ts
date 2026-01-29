export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validTill: string;
  color: string;
}

export const offers: Offer[] = [
  {
    id: "1",
    title: "GP Star Special",
    description: "Get up to 10% discount on flight bookings for GP Star customers.",
    discount: "10% OFF",
    code: "GPSTAR10",
    validTill: "31 Dec 2024",
    color: "bg-blue-600",
  },
  {
    id: "2",
    title: "City Bank Amex",
    description: "Enjoy flat 12% discount on domestic hotels with City Bank Amex cards.",
    discount: "12% OFF",
    code: "AMEX12",
    validTill: "15 Nov 2024",
    color: "bg-purple-600",
  },
  {
    id: "3",
    title: "Standard Chartered",
    description: "Up to 5000 BDT savings on international flights for SCB cardholders.",
    discount: "5000 BDT OFF",
    code: "SCB5000",
    validTill: "20 Dec 2024",
    color: "bg-green-600",
  },
  {
    id: "4",
    title: "Bkash Payment",
    description: "Get 5% instant cashback on all holiday packages when paying with Bkash.",
    discount: "5% Cashback",
    code: "BKASH5",
    validTill: "30 Nov 2024",
    color: "bg-pink-600",
  },
  {
    id: "5",
    title: "Visa Card Offer",
    description: "Save extra on your first booking with any Visa card.",
    discount: "Flat 500 OFF",
    code: "VISA500",
    validTill: "31 Jan 2025",
    color: "bg-indigo-600",
  },
];

export interface Destination {
  id: string;
  city: string;
  country: string;
  hotels: number;
  imageColor: string; // Placeholder for image
}

export const destinations: Destination[] = [
  { id: "1", city: "Cox's Bazar", country: "Bangladesh", hotels: 120, imageColor: "bg-cyan-200" },
  { id: "2", city: "Sylhet", country: "Bangladesh", hotels: 85, imageColor: "bg-green-200" },
  { id: "3", city: "Bangkok", country: "Thailand", hotels: 450, imageColor: "bg-amber-200" },
  { id: "4", city: "Dubai", country: "UAE", hotels: 380, imageColor: "bg-yellow-200" },
  { id: "5", city: "Kuala Lumpur", country: "Malaysia", hotels: 210, imageColor: "bg-blue-200" },
  { id: "6", city: "Singapore", country: "Singapore", hotels: 190, imageColor: "bg-red-200" },
  { id: "7", city: "Maldives", country: "Maldives", hotels: 95, imageColor: "bg-teal-200" },
  { id: "8", city: "Kathmandu", country: "Nepal", hotels: 70, imageColor: "bg-orange-200" },
];

export interface Airline {
  id: string;
  name: string;
  logoColor: string; // Placeholder for logo
}

export const airlines: Airline[] = [
  { id: "1", name: "Biman Bangladesh", logoColor: "text-red-600" },
  { id: "2", name: "US-Bangla", logoColor: "text-blue-800" },
  { id: "3", name: "Novoair", logoColor: "text-yellow-600" },
  { id: "4", name: "Emirates", logoColor: "text-red-700" },
  { id: "5", name: "Qatar Airways", logoColor: "text-purple-800" },
  { id: "6", name: "Singapore Air", logoColor: "text-blue-900" },
  { id: "7", name: "Turkish Airlines", logoColor: "text-red-600" },
  { id: "8", name: "Air Asia", logoColor: "text-red-500" },
];

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  location: string;
  price: string;
  imageColor: string;
}

export const hotels: Hotel[] = [
  { id: "1", name: "Sayeman Beach Resort", rating: 5, location: "Cox's Bazar", price: "BDT 12,500", imageColor: "bg-blue-100" },
  { id: "2", name: "Royal Tulip Sea Pearl", rating: 5, location: "Inani, Cox's Bazar", price: "BDT 15,000", imageColor: "bg-indigo-100" },
  { id: "3", name: "Grand Sultan Tea Resort", rating: 5, location: "Srimangal", price: "BDT 18,500", imageColor: "bg-green-100" },
  { id: "4", name: "The Palace Luxury Resort", rating: 5, location: "Habiganj", price: "BDT 22,000", imageColor: "bg-emerald-100" },
];

export interface Package {
  id: string;
  title: string;
  duration: string;
  price: string;
  imageColor: string;
}

export const packages: Package[] = [
  { id: "1", title: "Majestic Maldives", duration: "4 Days 3 Nights", price: "BDT 65,000", imageColor: "bg-teal-100" },
  { id: "2", title: "Bangkok Shopping Trip", duration: "3 Days 2 Nights", price: "BDT 35,000", imageColor: "bg-amber-100" },
  { id: "3", title: "Dubai Desert Safari", duration: "5 Days 4 Nights", price: "BDT 85,000", imageColor: "bg-yellow-100" },
  { id: "4", title: "Kashmir Paradise", duration: "6 Days 5 Nights", price: "BDT 55,000", imageColor: "bg-cyan-100" },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Placeholder identifier
  color: string;
}

export const services: Service[] = [
  { id: "1", title: "Shop", description: "Travel essentials & accessories", icon: "shop", color: "text-blue-600" },
  { id: "2", title: "Travel Insurance", description: "Secure your journey", icon: "shield", color: "text-green-600" },
  { id: "3", title: "eSIM", description: "Stay connected everywhere", icon: "sim", color: "text-purple-600" },
  { id: "4", title: "Transport", description: "Airport transfers & cabs", icon: "car", color: "text-orange-600" },
];
