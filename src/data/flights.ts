export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    code: string;
    time: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    city: string;
    code: string;
    time: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  stopInfo?: string[];
  price: {
    economy: number;
    premium_economy: number;
    business: number;
    first: number;
  };
  aircraft: string;
  layover?: {
    city: string;
    duration: string;
  }[];
}

export const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "Biman Bangladesh Airlines",
    airlineCode: "BG",
    flightNumber: "BG147",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "08:30",
      terminal: "1"
    },
    arrival: {
      airport: "Dubai International",
      city: "Dubai",
      code: "DXB",
      time: "12:15",
      terminal: "3"
    },
    duration: "5h 45m",
    stops: 0,
    price: {
      economy: 25000,
      premium_economy: 35000,
      business: 65000,
      first: 120000
    },
    aircraft: "Boeing 737-800"
  },
  {
    id: "2",
    airline: "Emirates",
    airlineCode: "EK",
    flightNumber: "EK584",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "09:45",
      terminal: "1"
    },
    arrival: {
      airport: "Dubai International",
      city: "Dubai",
      code: "DXB",
      time: "13:30",
      terminal: "3"
    },
    duration: "4h 45m",
    stops: 0,
    price: {
      economy: 28000,
      premium_economy: 40000,
      business: 75000,
      first: 150000
    },
    aircraft: "Boeing 777-300ER"
  },
  {
    id: "3",
    airline: "US-Bangla Airlines",
    airlineCode: "BS",
    flightNumber: "BS325",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "10:15",
      terminal: "1"
    },
    arrival: {
      airport: "Dubai International",
      city: "Dubai",
      code: "DXB",
      time: "16:45",
      terminal: "2"
    },
    duration: "7h 30m",
    stops: 1,
    stopInfo: ["Kolkata (CCU) - 2h 15m"],
    price: {
      economy: 22000,
      premium_economy: 30000,
      business: 55000,
      first: 95000
    },
    aircraft: "Boeing 737-800"
  },
  {
    id: "4",
    airline: "Air Arabia",
    airlineCode: "G9",
    flightNumber: "G9505",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "14:30",
      terminal: "1"
    },
    arrival: {
      airport: "Sharjah International",
      city: "Sharjah",
      code: "SHJ",
      time: "18:45",
      terminal: "1"
    },
    duration: "5h 15m",
    stops: 0,
    price: {
      economy: 20000,
      premium_economy: 28000,
      business: 48000,
      first: 85000
    },
    aircraft: "Airbus A320"
  },
  {
    id: "5",
    airline: "Qatar Airways",
    airlineCode: "QR",
    flightNumber: "QR641",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "16:00",
      terminal: "1"
    },
    arrival: {
      airport: "Hamad International",
      city: "Doha",
      code: "DOH",
      time: "19:30",
      terminal: "1"
    },
    duration: "5h 30m",
    stops: 0,
    price: {
      economy: 30000,
      premium_economy: 42000,
      business: 80000,
      first: 140000
    },
    aircraft: "Boeing 787 Dreamliner"
  },
  {
    id: "6",
    airline: "Singapore Airlines",
    airlineCode: "SQ",
    flightNumber: "SQ447",
    departure: {
      airport: "Shah Amanat International",
      city: "Chattogram",
      code: "CGP",
      time: "22:15",
      terminal: "1"
    },
    arrival: {
      airport: "Singapore Changi",
      city: "Singapore",
      code: "SIN",
      time: "06:30+1",
      terminal: "3"
    },
    duration: "6h 15m",
    stops: 1,
    stopInfo: ["Kolkata (CCU) - 2h 30m"],
    price: {
      economy: 35000,
      premium_economy: 50000,
      business: 95000,
      first: 180000
    },
    aircraft: "Boeing 777-300ER"
  }
];
