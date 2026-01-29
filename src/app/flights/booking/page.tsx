"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { mockFlights, Flight } from "@/data/flights";

interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
}

function FlightBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  interface AddOn {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  }
  
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    countryCode: "+880"
  });
  const [addOns, setAddOns] = useState<AddOn[]>([
    { id: "extra-baggage", name: "Extra Baggage (20kg)", price: 3000, selected: false },
    { id: "travel-insurance", name: "Travel Insurance", price: 1500, selected: false },
    { id: "meal-preference", name: "Special Meal", price: 800, selected: false },
    { id: "seat-selection", name: "Seat Selection", price: 500, selected: false },
    { id: "priority-boarding", name: "Priority Boarding", price: 1200, selected: false }
  ]);
  const [activeTab, setActiveTab] = useState("passengers");

  // Flight details
  const flightId = searchParams.get("flightId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const fromName = searchParams.get("fromName") || "";
  const toName = searchParams.get("toName") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const tripType = searchParams.get("tripType") || "oneway";
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");
  const cabinClass = searchParams.get("cabinClass") || "economy";

  const flight = mockFlights.find(f => f.id === flightId);
  const totalPassengers = adults + children + infants;

  // Initialize passengers array
  useState(() => {
    const initialPassengers: Passenger[] = [];
    for (let i = 0; i < totalPassengers; i++) {
      initialPassengers.push({
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        nationality: "",
        passportNumber: "",
        passportExpiry: "",
        email: "",
        phone: ""
      });
    }
    setPassengers(initialPassengers);
  });

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h1>
            <Button onClick={() => router.push("/flights")}>
              Search Flights
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

  const calculateBasePrice = () => {
    const basePrice = flight.price[cabinClass as keyof typeof flight.price] || flight.price.economy;
    return basePrice * totalPassengers;
  };

  const calculateAddOnPrice = () => {
    return addOns.filter(addon => addon.selected).reduce((total, addon) => total + addon.price, 0);
  };

  const calculateTotalPrice = () => {
    const basePrice = calculateBasePrice();
    const taxes = Math.round(basePrice * 0.15);
    const addOnPrice = calculateAddOnPrice();
    return basePrice + taxes + addOnPrice;
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns(prev => prev.map(addon => 
      addon.id === addOnId ? { ...addon, selected: !addon.selected } : addon
    ));
  };

  const validateForm = () => {
    // Validate all passengers
    for (let i = 0; i < passengers.length; i++) {
      const passenger = passengers[i];
      if (!passenger.title || !passenger.firstName || !passenger.lastName || 
          !passenger.gender || !passenger.dateOfBirth || !passenger.nationality ||
          !passenger.passportNumber || !passenger.passportExpiry) {
        alert(`Please complete all required fields for Passenger ${i + 1}`);
        setActiveTab("passengers");
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

  const handleProceedToPayment = () => {
    if (!validateForm()) return;

    // In a real app, this would navigate to payment page
    alert("Proceeding to payment gateway...");
  };

  const getPassengerType = (index: number) => {
    if (index < adults) return "Adult";
    if (index < adults + children) return "Child";
    return "Infant";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Flight Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{flight.airlineCode}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{flight.airline} • {flight.flightNumber}</div>
                  <div className="text-sm text-gray-600">
                    {fromName} → {toName} • {departure} {returnDate && `- ${returnDate}`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{cabinClass} • {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}</div>
                <div className="font-bold text-blue-600">{formatPrice(calculateTotalPrice())}</div>
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
                    {["passengers", "add-ons", "contact", "review"].map((tab) => (
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
                  {activeTab === "passengers" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Passenger Information</h3>
                      
                      {passengers.map((passenger, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-4">
                            Passenger {index + 1} ({getPassengerType(index)})
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Title */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                              <select
                                value={passenger.title}
                                onChange={(e) => handlePassengerChange(index, "title", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Miss">Miss</option>
                                <option value="Master">Master</option>
                              </select>
                            </div>

                            {/* First Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                              <input
                                type="text"
                                value={passenger.firstName}
                                onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="First name"
                              />
                            </div>

                            {/* Last Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                              <input
                                type="text"
                                value={passenger.lastName}
                                onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Last name"
                              />
                            </div>

                            {/* Gender */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                              <select
                                value={passenger.gender}
                                onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                              <input
                                type="date"
                                value={passenger.dateOfBirth}
                                onChange={(e) => handlePassengerChange(index, "dateOfBirth", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Nationality */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                              <input
                                type="text"
                                value={passenger.nationality}
                                onChange={(e) => handlePassengerChange(index, "nationality", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Bangladeshi"
                              />
                            </div>

                            {/* Passport Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                              <input
                                type="text"
                                value={passenger.passportNumber}
                                onChange={(e) => handlePassengerChange(index, "passportNumber", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Passport number"
                              />
                            </div>

                            {/* Passport Expiry */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Passport Expiry *</label>
                              <input
                                type="date"
                                value={passenger.passportExpiry}
                                onChange={(e) => handlePassengerChange(index, "passportExpiry", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <p className="text-sm text-gray-600">Enhance your travel experience with these additional services</p>
                      
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
                                  {addOn.id === "extra-baggage" && "Additional 20kg check-in baggage"}
                                  {addOn.id === "travel-insurance" && "Comprehensive travel coverage"}
                                  {addOn.id === "meal-preference" && "Special dietary meals"}
                                  {addOn.id === "seat-selection" && "Choose your preferred seat"}
                                  {addOn.id === "priority-boarding" && "Priority check-in and boarding"}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{formatPrice(addOn.price)}</div>
                              <div className="text-xs text-gray-600">per passenger</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Contact Information</h3>
                      <p className="text-sm text-gray-600">We'll use this information to send booking confirmation and updates</p>
                      
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
                          <li>• Flight updates will be sent via SMS</li>
                          <li>• Please ensure contact details are accurate</li>
                          <li>• WhatsApp notifications available for Bangladeshi numbers</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="space-y-6">
                      <h3 className="font-bold text-gray-900">Review & Confirm</h3>
                      
                      {/* Flight Details */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Flight Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Flight</span>
                            <span className="font-medium">{flight.airline} {flight.flightNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Route</span>
                            <span className="font-medium">{fromName} → {toName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium">{departure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Class</span>
                            <span className="font-medium">{cabinClass}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Passengers</span>
                            <span className="font-medium">{totalPassengers}</span>
                          </div>
                        </div>
                      </div>

                      {/* Passenger Summary */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Passengers</h4>
                        <div className="space-y-2 text-sm">
                          {passengers.map((passenger, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600">Passenger {index + 1}</span>
                              <span className="font-medium">
                                {passenger.title} {passenger.firstName} {passenger.lastName}
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
                                <span className="font-medium">{formatPrice(addOn.price * totalPassengers)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Terms */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <div className="text-sm text-gray-600">
                            I have read and agree to the 
                            <a href="#" className="text-blue-600 hover:underline"> Terms & Conditions</a> and 
                            <a href="#" className="text-blue-600 hover:underline"> Cancellation Policy</a>. 
                            I understand that this booking is subject to the fare rules and restrictions.
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
                        const tabs = ["passengers", "add-ons", "contact", "review"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1]);
                        }
                      }}
                      disabled={activeTab === "passengers"}
                    >
                      Previous
                    </Button>
                    
                    {activeTab === "review" ? (
                      <Button onClick={handleProceedToPayment}>
                        Proceed to Payment
                      </Button>
                    ) : (
                      <Button onClick={() => {
                        const tabs = ["passengers", "add-ons", "contact", "review"];
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
                    <span className="text-gray-600">Base Fare ({totalPassengers} passengers)</span>
                    <span className="font-medium">{formatPrice(calculateBasePrice())}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">{formatPrice(Math.round(calculateBasePrice() * 0.15))}</span>
                  </div>
                  
                  {addOns.some(addon => addon.selected) && (
                    <div className="border-t border-gray-200 pt-3">
                      <div className="text-sm font-medium text-gray-900 mb-2">Add-ons</div>
                      {addOns.filter(addon => addon.selected).map((addOn) => (
                        <div key={addOn.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{addOn.name}</span>
                          <span className="font-medium">{formatPrice(addOn.price * totalPassengers)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="font-bold text-xl text-blue-600">
                        {formatPrice(calculateTotalPrice())}
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
                    <div>✈️ IATA Certified</div>
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

export default function FlightBooking() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight booking...</p>
        </div>
      </div>
    }>
      <FlightBookingContent />
    </Suspense>
  );
}
