"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface TransportService {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
  image: string;
  category: "airport" | "car" | "city" | "intercity";
}

const transportServices: TransportService[] = [
  {
    id: "1",
    title: "Airport Pickup",
    description: "Comfortable airport transfer service with professional drivers",
    icon: "✈️",
    price: "From BDT 1,500",
    features: ["24/7 Service", "Professional Drivers", "Meet & Greet", "Luggage Assistance"],
    image: "https://images.unsplash.com/photo-1544620344-c95d8f49b5f0?w=400&h=300&fit=crop",
    category: "airport"
  },
  {
    id: "2",
    title: "Airport Drop-off",
    description: "Hassle-free drop-off service to the airport",
    icon: "🛫",
    price: "From BDT 1,500",
    features: ["On-time Service", "Comfortable Vehicles", "Flight Tracking", "No Extra Charges"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a139cc57?w=400&h=300&fit=crop",
    category: "airport"
  },
  {
    id: "3",
    title: "Economy Car Rental",
    description: "Affordable car rental for budget-conscious travelers",
    icon: "🚗",
    price: "From BDT 2,000/day",
    features: ["AC Vehicles", "Insurance Included", "Unlimited KM", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1550355291-bbee04a9208b?w=400&h=300&fit=crop",
    category: "car"
  },
  {
    id: "4",
    title: "Premium Car Rental",
    description: "Luxury vehicles for comfortable travel experience",
    icon: "🚙",
    price: "From BDT 5,000/day",
    features: ["Luxury Models", "GPS Navigation", "Chauffeur Option", "Premium Insurance"],
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
    category: "car"
  },
  {
    id: "5",
    title: "City Transfer",
    description: "Point-to-point transfer within the city",
    icon: "🚌",
    price: "From BDT 500",
    features: ["Fixed Rates", "Multiple Stops", "Group Discounts", "Luggage Space"],
    image: "https://images.unsplash.com/photo-1546913189-f3a192bae8b8?w=400&h=300&fit=crop",
    category: "city"
  },
  {
    id: "6",
    title: "Intercity Bus",
    description: "Comfortable bus service between major cities",
    icon: "🚌",
    price: "From BDT 800",
    features: ["AC Buses", "Reclining Seats", "WiFi", "Snacks Included"],
    image: "https://images.unsplash.com/photo-1544620344-c95d8f49b5f0?w=400&h=300&fit=crop",
    category: "intercity"
  },
  {
    id: "7",
    title: "Train Tickets",
    description: "Railway tickets for intercity travel",
    icon: "🚂",
    price: "From BDT 300",
    features: ["Multiple Classes", "Online Booking", "E-tickets", "Group Rates"],
    image: "https://images.unsplash.com/photo-1478760329478-5bbb3a7b5590?w=400&h=300&fit=crop",
    category: "intercity"
  },
  {
    id: "8",
    title: "Private Driver",
    description: "Personal driver service for your convenience",
    icon: "👨‍✈️",
    price: "From BDT 3,000/day",
    features: ["Experienced Driver", "Flexible Schedule", "Local Knowledge", "Multi-language"],
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    category: "car"
  }
];

export default function TransportServices() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bookingForm, setBookingForm] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    pickup: "",
    destination: "",
    passengers: "1",
    message: ""
  });

  const filteredServices = selectedCategory === "all" 
    ? transportServices 
    : transportServices.filter(service => service.category === selectedCategory);

  const handleBooking = (serviceId: string) => {
    setBookingForm({...bookingForm, service: serviceId});
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Transport booking request submitted! We will contact you soon.");
    setBookingForm({
      service: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      pickup: "",
      destination: "",
      passengers: "1",
      message: ""
    });
  };

  const categories = [
    { id: "all", name: "All Services", icon: "🚛" },
    { id: "airport", name: "Airport Transfer", icon: "✈️" },
    { id: "car", name: "Car Rental", icon: "🚗" },
    { id: "city", name: "City Transfer", icon: "🚌" },
    { id: "intercity", name: "Intercity", icon: "🚂" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transport Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reliable and comfortable transportation solutions for all your travel needs. Airport transfers, car rentals, and intercity travel.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-lg font-bold text-blue-600">{service.price}</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleBooking(service.id)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div id="booking-form" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Transport</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                  <select
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a service</option>
                    {transportServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location *</label>
                  <input
                    type="text"
                    value={bookingForm.pickup}
                    onChange={(e) => setBookingForm({...bookingForm, pickup: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter pickup location"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                  <input
                    type="text"
                    value={bookingForm.destination}
                    onChange={(e) => setBookingForm({...bookingForm, destination: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter destination"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers *</label>
                  <input
                    type="number"
                    value={bookingForm.passengers}
                    onChange={(e) => setBookingForm({...bookingForm, passengers: e.target.value})}
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                <textarea
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any special requirements or instructions"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                Submit Booking Request
              </Button>
            </form>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Transport Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Availability</h3>
                <p className="text-sm text-gray-600">Round-the-clock service for your convenience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Professional Drivers</h3>
                <p className="text-sm text-gray-600">Experienced and courteous drivers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.14 1.18 6.88L12 17.77l-6.18 6.88L7 13.41l-5-4.14 6.91-.95L12 2z"/>
                </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quality Vehicles</h3>
                <p className="text-sm text-gray-600">Well-maintained and comfortable fleet</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2zm0-8c1.11 0 2 .89 2 2s-.89 2-2 2-2-.89-2-2 .89-2 2-2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Best Prices</h3>
                <p className="text-sm text-gray-600">Competitive rates with no hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
