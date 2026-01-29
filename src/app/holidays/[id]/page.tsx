"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { holidayPackages } from "@/data/hotels";

export default function HolidayPackageDetails() {
  const params = useParams();
  const router = useRouter();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const packageId = params.id as string;
  const pkg = holidayPackages.find(p => p.id === packageId);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <Button onClick={() => router.push("/holidays")}>
              View All Packages
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

  const totalPrice = pkg.price * travelers;

  // Mock gallery images
  const galleryImages = [
    pkg.image,
    "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1548618606-52341b5b8a6d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  ];

  // Mock itinerary data
  const itinerary = [
    {
      day: 1,
      title: "Arrival & Check-in",
      description: "Arrive at destination, transfer to hotel, check-in and relax. Evening free for leisure.",
      meals: ["Dinner"],
      activities: ["Airport Transfer", "Hotel Check-in"]
    },
    {
      day: 2,
      title: "City Tour",
      description: "Full day city sightseeing covering major attractions and landmarks.",
      meals: ["Breakfast", "Lunch"],
      activities: ["City Tour", "Museum Visit", "Shopping"]
    },
    {
      day: 3,
      title: "Adventure Day",
      description: "Exciting outdoor activities and adventure sports.",
      meals: ["Breakfast", "Lunch", "Dinner"],
      activities: ["Hiking", "Boating", "Cultural Show"]
    },
    {
      day: 4,
      title: "Leisure & Departure",
      description: "Morning leisure time, check-out and transfer to airport.",
      meals: ["Breakfast"],
      activities: ["Shopping", "Airport Transfer"]
    }
  ];

  const handleBooking = () => {
    const bookingParams = new URLSearchParams({
      packageId: pkg.id,
      packageName: pkg.name,
      travelers: travelers.toString(),
      date: selectedDate,
      totalPrice: totalPrice.toString(),
    });

    router.push(`/holidays/booking?${bookingParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button onClick={() => router.push("/holidays")} className="hover:text-blue-600">
              Holiday Packages
            </button>
            <span>→</span>
            <span className="text-gray-900">{pkg.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="relative">
                  <img 
                    src={galleryImages[selectedImage]} 
                    alt={pkg.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-medium">1 / {galleryImages.length}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.duration}
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

              {/* Package Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h1>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-medium text-gray-900">4.5</span>
                      <span className="text-gray-600">(234 reviews)</span>
                    </div>
                    <div className="text-gray-600 mb-4">
                      📍 {pkg.locations.join(' → ')} • {pkg.duration}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">from</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice(pkg.price)}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">📅</div>
                    <div className="text-sm font-medium text-gray-900">{pkg.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">👥</div>
                    <div className="text-sm font-medium text-gray-900">2-20</div>
                    <div className="text-xs text-gray-600">Group Size</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">🏨</div>
                    <div className="text-sm font-medium text-gray-900">3 Star</div>
                    <div className="text-xs text-gray-600">Hotel</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">🚌</div>
                    <div className="text-sm font-medium text-gray-900">Included</div>
                    <div className="text-xs text-gray-600">Transport</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex gap-8">
                    {["overview", "itinerary", "inclusions", "reviews"].map((tab) => (
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
                        <h3 className="font-bold text-gray-900 mb-3">About This Package</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Experience the perfect getaway with our {pkg.name.toLowerCase()}. 
                          This carefully crafted package takes you through the stunning landscapes and cultural highlights of {pkg.locations.join(' and ')}. 
                          Enjoy comfortable accommodations, delicious meals, and expert-guided tours that showcase the best of each destination.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Package Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Expert local guides</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">All meals included</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Comfortable hotels</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                            <span className="text-gray-700">Transport included</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "itinerary" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h3>
                      
                      {itinerary.map((day) => (
                        <div key={day.day} className="border-l-4 border-blue-600 pl-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                            <h4 className="font-bold text-gray-900">Day {day.day}: {day.title}</h4>
                          </div>
                          <p className="text-gray-600 mb-3">{day.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-1">Meals</div>
                              <div className="flex flex-wrap gap-1">
                                {day.meals.map((meal) => (
                                  <span key={meal} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    {meal}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-1">Activities</div>
                              <div className="flex flex-wrap gap-1">
                                {day.activities.map((activity) => (
                                  <span key={activity} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {activity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "inclusions" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3 text-green-600">✅ What's Included</h3>
                          <ul className="space-y-2">
                            {pkg.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 6L9 17l-5-5"/>
                                </svg>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5"/>
                              </svg>
                              <span className="text-gray-700">Travel insurance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5"/>
                              </svg>
                              <span className="text-gray-700">Entrance fees</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-900 mb-3 text-red-600">❌ What's Not Included</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                              </svg>
                              <span className="text-gray-700">Personal expenses</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                              </svg>
                              <span className="text-gray-700">Tips and gratuities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                              </svg>
                              <span className="text-gray-700">Optional activities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                              </svg>
                              <span className="text-gray-700">Visa fees</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Traveler Reviews</h3>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-3xl font-bold text-gray-900">4.5</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                viewBox="0 0 24 24"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">Based on 234 reviews</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: "Fatema Rahman",
                            rating: 5,
                            date: "2 weeks ago",
                            comment: "Amazing experience! The itinerary was well-planned and our guide was very knowledgeable. Highly recommend!"
                          },
                          {
                            name: "Karim Ahmed",
                            rating: 4,
                            date: "1 month ago",
                            comment: "Great package with good value for money. Hotels were comfortable and transportation was timely."
                          },
                          {
                            name: "Sarah Khan",
                            rating: 5,
                            date: "2 months ago",
                            comment: "Perfect family vacation! Everything was taken care of. Will definitely book again."
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
                <h3 className="font-bold text-gray-900 mb-4">Book This Package</h3>
                
                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Travelers */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <input
                    type="number"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{formatPrice(pkg.price)} x {travelers} traveler{travelers > 1 ? 's' : ''}</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">{formatPrice(Math.round(totalPrice * 0.1))}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-blue-600">
                          {formatPrice(Math.round(totalPrice * 1.1))}
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
                  disabled={!selectedDate}
                >
                  Book Now
                </Button>

                {/* Contact Info */}
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Need help?</div>
                  <div className="text-sm font-medium text-blue-600">Call: +880 9617-617-617</div>
                  <div className="text-sm font-medium text-blue-600">Email: holidays@sharetrip.net</div>
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
