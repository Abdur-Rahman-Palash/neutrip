import { Hotel } from "@/data/hotels";

export interface ExtendedHotel extends Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  amenities: string[];
  starRating: number;
  distance?: string;
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  roomTypes: {
    standard: number;
    deluxe: number;
    suite: number;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
}

export const mockHotelsExtended: ExtendedHotel[] = [
  {
    id: "1",
    name: "Pan Pacific Sonargaon Dhaka",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 1234,
    price: 150,
    location: "Dhaka",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Business Center", "Parking"],
    starRating: 5,
    distance: "2.5 km from city center",
    freeCancellation: true,
    breakfastIncluded: false,
    roomTypes: {
      standard: 120,
      deluxe: 180,
      suite: 250
    },
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 24 hours before check-in"
    }
  },
  {
    id: "2",
    name: "Long Beach Hotel Cox's Bazar",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 892,
    price: 120,
    location: "Cox's Bazar",
    amenities: ["WiFi", "Pool", "Beach Access", "Restaurant", "Bar", "Parking"],
    starRating: 4,
    distance: "0.5 km from beach",
    freeCancellation: true,
    breakfastIncluded: true,
    roomTypes: {
      standard: 100,
      deluxe: 150,
      suite: 200
    },
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 48 hours before check-in"
    }
  },
  {
    id: "3",
    name: "Hotel Sylhet International",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    rating: 4.1,
    reviewCount: 567,
    price: 85,
    location: "Sylhet",
    amenities: ["WiFi", "Restaurant", "Parking", "Room Service"],
    starRating: 3,
    distance: "1.2 km from city center",
    freeCancellation: false,
    breakfastIncluded: false,
    roomTypes: {
      standard: 70,
      deluxe: 100,
      suite: 140
    },
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "No free cancellation"
    }
  },
  {
    id: "4",
    name: "Grand Sultan Tea Resort",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 445,
    price: 200,
    location: "Sylhet",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Tea Garden", "Parking", "Gym"],
    starRating: 5,
    distance: "15 km from city center",
    freeCancellation: true,
    breakfastIncluded: true,
    roomTypes: {
      standard: 150,
      deluxe: 220,
      suite: 300
    },
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Free cancellation up to 72 hours before check-in"
    }
  },
  {
    id: "5",
    name: "Radisson Blu Dhaka Water Garden",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 678,
    price: 180,
    location: "Dhaka",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Business Center", "Parking", "Tennis Court"],
    starRating: 5,
    distance: "5.8 km from city center",
    freeCancellation: true,
    breakfastIncluded: false,
    roomTypes: {
      standard: 140,
      deluxe: 200,
      suite: 280
    },
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 24 hours before check-in"
    }
  },
  {
    id: "6",
    name: "Sea Pearl Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 334,
    price: 95,
    location: "Cox's Bazar",
    amenities: ["WiFi", "Pool", "Beach Access", "Restaurant", "Bar", "Parking"],
    starRating: 4,
    distance: "0.2 km from beach",
    freeCancellation: true,
    breakfastIncluded: true,
    roomTypes: {
      standard: 80,
      deluxe: 120,
      suite: 160
    },
    policies: {
      checkIn: "14:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 48 hours before check-in"
    }
  },
  {
    id: "7",
    name: "Hotel Six Seasons",
    image: "https://images.unsplash.com/photo-1611892440507-42a792e24d32?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 892,
    price: 165,
    location: "Dhaka",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Business Center", "Parking", "Rooftop Lounge"],
    starRating: 5,
    distance: "3.1 km from city center",
    freeCancellation: true,
    breakfastIncluded: false,
    roomTypes: {
      standard: 130,
      deluxe: 190,
      suite: 260
    },
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 24 hours before check-in"
    }
  },
  {
    id: "8",
    name: "Nirvana Inn",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7e088a?w=600&h=400&fit=crop",
    rating: 3.9,
    reviewCount: 234,
    price: 65,
    location: "Bandarban",
    amenities: ["WiFi", "Restaurant", "Parking", "Room Service", "Garden"],
    starRating: 3,
    distance: "0.8 km from city center",
    freeCancellation: false,
    breakfastIncluded: true,
    roomTypes: {
      standard: 50,
      deluxe: 75,
      suite: 100
    },
    policies: {
      checkIn: "13:00",
      checkOut: "11:00",
      cancellation: "No free cancellation"
    }
  }
];
