"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { mockHotelsExtended, ExtendedHotel } from "@/data/hotelsExtended";

export default function HotelDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState("standard");
  const [activeTab, setActiveTab] = useState("overview");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(parseInt(searchParams.get("guests") || "2"));
  const [rooms, setRooms] = useState(parseInt(searchParams.get("rooms") || "1"));

  const hotelId = params.id as string;
  const hotel = mockHotelsExtended.find(h => h.id === hotelId);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
            <Button onClick={() => router.push("/hotels")}>
              Search Hotels
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const roomPrice = hotel.roomTypes[selectedRoomType as keyof typeof hotel.roomTypes];
  const totalPrice = roomPrice * nights * rooms;

  // Mock gallery images
  const galleryImages = [
    hotel.image,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
  ];

  const handleBooking = () => {
    const bookingParams = new URLSearchParams({
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      guests: guests.toString(),
      rooms: rooms.toString(),
      roomType: selectedRoomType,
      totalPrice: totalPrice.toString(),
    });

    router.push(`/hotels/booking?${bookingParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button onClick={() => router.push("/hotels")} className="hover:text-blue-600">
              Hotels
            </button>
            <span>→</span>
            <button onClick={() => router.back()} className="hover:text-blue-600">
              Results
            </button>
            <span>→</span>
            <span className="text-gray-900">{hotel.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="relative">
                  <img 
                    src={galleryImages[selectedImage]} 
                    alt={hotel.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-medium">1 / {galleryImages.length}</span>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-blue-600" : "border-gray-200"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Hotel Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(hotel.starRating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-medium text-gray-900">
                        {hotel.rating}
                      </span>
                      <span className="text-gray-600">({hotel.reviewCount} reviews)</span>
                    </div>
                    <div className="text-gray-600 mb-4">
                      📍 {hotel.location} {hotel.distance && `• ${hotel.distance}`}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">from</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(roomPrice)}
                    </div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                </div>

                {/* Special Offers */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.freeCancellation && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      ✅ Free Cancellation
                    </span>
                  )}
                  {hotel.breakfastIncluded && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      🍳 Breakfast Included
                    </span>
                  )}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex gap-8">
                    {["overview", "rooms", "amenities", "policies", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">About {hotel.name}</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location}. 
                          Our hotel offers exceptional service, modern amenities, and convenient access to local attractions. 
                          Whether you're traveling for business or leisure, we provide the perfect blend of comfort and convenience.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Prime location</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Free WiFi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">24/7 Room Service</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Airport Transfer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "rooms" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Room Types</h3>
                      
                      {[
                        { id: "standard", name: "Standard Room", price: hotel.roomTypes.standard, description: "Comfortable room with essential amenities" },
                        { id: "deluxe", name: "Deluxe Room", price: hotel.roomTypes.deluxe, description: "Spacious room with premium amenities" },
                        { id: "suite", name: "Executive Suite", price: hotel.roomTypes.suite, description: "Luxury suite with separate living area" }
                      ].map((room) => (
                        <label
                          key={room.id}
                          className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedRoomType === room.id
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="roomType"
                                value={room.id}
                                checked={selectedRoomType === room.id}
                                onChange={(e) => setSelectedRoomType(e.target.value)}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{room.name}</div>
                                <div className="text-sm text-gray-600">{room.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{formatPrice(room.price)}</div>
                              <div className="text-xs text-gray-600">per night</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {activeTab === "amenities" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hotel.amenities.map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "policies" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Policies</h3>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Check-in & Check-out</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Check-in: {hotel.policies.checkIn}</div>
                            <div>Check-out: {hotel.policies.checkOut}</div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                          <p className="text-sm text-gray-600">{hotel.policies.cancellation}</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Important Information</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Valid ID required at check-in</li>
                            <li>• No pets allowed</li>
                            <li>• Smoking rooms available on request</li>
                            <li>• Extra bed charges may apply</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Guest Reviews</h3>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-3xl font-bold text-gray-900">{hotel.rating}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 ${star <= Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                viewBox="0 0 24 24"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">Based on {hotel.reviewCount} reviews</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: "Rahman Ahmed",
                            rating: 5,
                            date: "1 week ago",
                            comment: "Excellent hotel with great service. The staff was very helpful and the room was clean and comfortable."
                          },
                          {
                            name: "Sarah Khan",
                            rating: 4,
                            date: "2 weeks ago",
                            comment: "Good location and comfortable rooms. Breakfast could have more variety."
                          },
                          {
                            name: "Michael Chen",
                            rating: 5,
                            date: "1 month ago",
                            comment: "Perfect stay! The amenities were great and the staff went above and beyond."
                          }
                        ].map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-600">{review.date}</div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  viewBox="0 0 24 24"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Book Your Stay</h3>
                
                {/* Date Selection */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Guests & Rooms */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <input
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                    <input
                      type="number"
                      value={rooms}
                      onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{formatPrice(roomPrice)} x {nights} nights x {rooms} room{rooms > 1 ? 's' : ''}</span>
                      <span className="font-medium">{formatPrice(roomPrice * nights * rooms)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">{formatPrice(Math.round(totalPrice * 0.15))}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-blue-600">
                          {formatPrice(Math.round(totalPrice * 1.15))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBooking}
                  size="lg"
                  className="w-full"
                >
                  Book Now
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-3">Secure Booking</div>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">VISA</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">MC</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">AMEX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
