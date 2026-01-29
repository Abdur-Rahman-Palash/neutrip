"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { mockHotelsExtended, ExtendedHotel } from "@/data/hotelsExtended";

interface Guest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idType: string;
  idNumber: string;
  specialRequests: string;
}

function HotelBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [guests, setGuests] = useState<Guest[]>([{ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    nationality: "", 
    idType: "", 
    idNumber: "", 
    specialRequests: "" 
  }]);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    countryCode: "+880"
  });
  const [addOns, setAddOns] = useState([
    { id: "late-checkout", name: "Late Checkout (2PM)", price: 1000, selected: false },
    { id: "early-checkin", name: "Early Check-in (10AM)", price: 1500, selected: false },
    { id: "airport-transfer", name: "Airport Transfer", price: 2000, selected: false },
    { id: "spa-package", name: "Spa Package", price: 5000, selected: false },
    { id: "dinner-included", name: "Dinner Included", price: 3000, selected: false }
  ]);
  const [activeTab, setActiveTab] = useState("guests");

  // Booking details
  const hotelId = searchParams.get("hotelId") || "";
  const hotelName = searchParams.get("hotelName") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guestCount = parseInt(searchParams.get("guests") || "2");
  const roomCount = parseInt(searchParams.get("rooms") || "1");
  const roomType = searchParams.get("roomType") || "standard";
  const totalPrice = parseInt(searchParams.get("totalPrice") || "0");

  const hotel = mockHotelsExtended.find(h => h.id === hotelId);

  // Initialize guests array
  useState(() => {
    const initialGuests: Guest[] = [];
    for (let i = 0; i < guestCount; i++) {
      initialGuests.push({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "",
        idType: "",
        idNumber: "",
        specialRequests: ""
      });
    }
    setGuests(initialGuests);
  });

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

  const calculateAddOnPrice = () => {
    return addOns.filter(addon => addon.selected).reduce((total, addon) => total + addon.price, 0);
  };

  const calculateFinalPrice = () => {
    const basePrice = totalPrice;
    const addOnPrice = calculateAddOnPrice();
    const taxes = Math.round(basePrice * 0.15);
    return basePrice + taxes + addOnPrice;
  };

  const handleGuestChange = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns(prev => prev.map(addon => 
      addon.id === addOnId ? { ...addon, selected: !addon.selected } : addon
    ));
  };

  const validateForm = () => {
    // Validate all guests
    for (let i = 0; i < guests.length; i++) {
      const guest = guests[i];
      if (!guest.firstName || !guest.lastName || !guest.email || !guest.phone || 
          !guest.nationality || !guest.idType || !guest.idNumber) {
        alert(`Please complete all required fields for Guest ${i + 1}`);
        setActiveTab("guests");
        return false;
      }
    }

    // Validate contact info
    if (!contactInfo.email || !contactInfo.phone) {
      alert("Please provide contact information");
      setActiveTab("contact");
      return false;
    }

    return true;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) return;

    // In a real app, this would process the booking
    alert("Booking confirmed! Confirmation email sent.");
    router.push("/");
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">🏨</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{hotelName}</div>
                  <div className="text-sm text-gray-600">
                    {checkIn} - {checkOut} • {nights} night{nights > 1 ? 's' : ''} • {guestCount} Guest{guestCount > 1 ? 's' : ''} • {roomCount} Room{roomCount > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{roomType} • Total</div>
                <div className="font-bold text-blue-600">{formatPrice(calculateFinalPrice())}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex gap-8">
                    {["guests", "add-ons", "contact", "review"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.split("-").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "guests" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Guest Information</h3>
                      
                      {guests.map((guest, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-4">
                            Guest {index + 1} {index === 0 && "(Primary)"}
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                              <input
                                type="text"
                                value={guest.firstName}
                                onChange={(e) => handleGuestChange(index, "firstName", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="First name"
                              />
                            </div>

                            {/* Last Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                              <input
                                type="text"
                                value={guest.lastName}
                                onChange={(e) => handleGuestChange(index, "lastName", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Last name"
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                              <input
                                type="email"
                                value={guest.email}
                                onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="email@example.com"
                              />
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                              <input
                                type="tel"
                                value={guest.phone}
                                onChange={(e) => handleGuestChange(index, "phone", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Phone number"
                              />
                            </div>

                            {/* Nationality */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                              <input
                                type="text"
                                value={guest.nationality}
                                onChange={(e) => handleGuestChange(index, "nationality", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Bangladeshi"
                              />
                            </div>

                            {/* ID Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type *</label>
                              <select
                                value={guest.idType}
                                onChange={(e) => handleGuestChange(index, "idType", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select ID Type</option>
                                <option value="passport">Passport</option>
                                <option value="nid">National ID</option>
                                <option value="driving-license">Driving License</option>
                              </select>
                            </div>

                            {/* ID Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number *</label>
                              <input
                                type="text"
                                value={guest.idNumber}
                                onChange={(e) => handleGuestChange(index, "idNumber", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="ID number"
                              />
                            </div>

                            {/* Special Requests */}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                              <textarea
                                value={guest.specialRequests}
                                onChange={(e) => handleGuestChange(index, "specialRequests", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Any special requests or preferences"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "add-ons" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900">Add-On Services</h3>
                      <p className="text-sm text-gray-600">Enhance your stay with these additional services</p>
                      
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <label
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={addOn.selected}
                                onChange={() => handleAddOnToggle(addOn.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{addOn.name}</div>
                                <div className="text-sm text-gray-600">
                                  {addOn.id === "late-checkout" && "Extend your check-out time to 2:00 PM"}
                                  {addOn.id === "early-checkin" && "Check-in early at 10:00 AM"}
                                  {addOn.id === "airport-transfer" && "Round-trip airport transfer"}
                                  {addOn.id === "spa-package" && "Access to spa facilities"}
                                  {addOn.id === "dinner-included" && "Daily dinner included"}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{formatPrice(addOn.price)}</div>
                              <div className="text-xs text-gray-600">one-time</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Contact Information</h3>
                      <p className="text-sm text-gray-600">We'll use this information to send booking confirmation</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <div className="flex gap-2">
                            <select
                              value={contactInfo.countryCode}
                              onChange={(e) => setContactInfo(prev => ({ ...prev, countryCode: e.target.value }))}
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="+880">+880</option>
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                            </select>
                            <input
                              type="tel"
                              value={contactInfo.phone}
                              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Important Information</h4>
                        <ul className="space-y-1 text-sm text-yellow-700">
                          <li>• Booking confirmation will be sent to your email</li>
                          <li>• Please arrive at the hotel with valid ID</li>
                          <li>• Check-in time starts at {hotel.policies.checkIn}</li>
                          <li>• Check-out time is {hotel.policies.checkOut}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Review & Confirm</h3>
                      
                      {/* Hotel Details */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Hotel Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hotel</span>
                            <span className="font-medium">{hotelName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in</span>
                            <span className="font-medium">{checkIn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out</span>
                            <span className="font-medium">{checkOut}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Room Type</span>
                            <span className="font-medium">{roomType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests</span>
                            <span className="font-medium">{guestCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rooms</span>
                            <span className="font-medium">{roomCount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Guest Summary */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Guests</h4>
                        <div className="space-y-2 text-sm">
                          {guests.map((guest, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600">Guest {index + 1}</span>
                              <span className="font-medium">
                                {guest.firstName} {guest.lastName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add-ons Summary */}
                      {addOns.some(addon => addon.selected) && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Selected Add-ons</h4>
                          <div className="space-y-2 text-sm">
                            {addOns.filter(addon => addon.selected).map((addOn) => (
                              <div key={addOn.id} className="flex justify-between">
                                <span className="text-gray-600">{addOn.name}</span>
                                <span className="font-medium">{formatPrice(addOn.price)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cancellation Policy */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Cancellation Policy</h4>
                        <p className="text-sm text-gray-600">{hotel.policies.cancellation}</p>
                      </div>

                      {/* Terms */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <div className="text-sm text-gray-600">
                            I have read and agree to the 
                            <a href="#" className="text-blue-600 hover:underline"> Terms & Conditions</a> and 
                            <a href="#" className="text-blue-600 hover:underline"> Cancellation Policy</a>. 
                            I understand that this booking is subject to the hotel's policies and restrictions.
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const tabs = ["guests", "add-ons", "contact", "review"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1]);
                        }
                      }}
                      disabled={activeTab === "guests"}
                    >
                      Previous
                    </Button>
                    
                    {activeTab === "review" ? (
                      <Button onClick={handleConfirmBooking}>
                        Confirm Booking
                      </Button>
                    ) : (
                      <Button onClick={() => {
                        const tabs = ["guests", "add-ons", "contact", "review"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex < tabs.length - 1) {
                          setActiveTab(tabs[currentIndex + 1]);
                        }
                      }}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Price Breakdown */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Price Breakdown</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room Charges</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">{formatPrice(Math.round(totalPrice * 0.15))}</span>
                  </div>
                  
                  {addOns.some(addon => addon.selected) && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-sm font-medium text-gray-900 mb-2">Add-ons</div>
                      {addOns.filter(addon => addon.selected).map((addOn) => (
                        <div key={addOn.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{addOn.name}</span>
                          <span className="font-medium">{formatPrice(addOn.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="font-bold text-xl text-blue-600">
                        {formatPrice(calculateFinalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">Secure & Trusted</div>
                  <div className="flex justify-center gap-2 mb-4">
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
                  <div className="text-xs text-gray-500 text-center">
                    <div>🔒 SSL Encrypted Payment</div>
                    <div>🏨 Verified Hotel Partner</div>
                    <div>🏆 24/7 Customer Support</div>
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

export default function HotelBooking() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking page...</p>
        </div>
      </div>
    }>
      <HotelBookingContent />
    </Suspense>
  );
}
