"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I book a flight on ShareTrip?",
    answer: "You can book flights through our website by entering your travel details in the flight search form. Select your departure and arrival cities, choose travel dates, number of passengers, and click search. From the results, select your preferred flight and follow the booking process.",
    category: "booking",
    tags: ["flights", "booking", "website"]
  },
  {
    id: "2",
    question: "What payment methods are accepted?",
    answer: "We accept all major credit/debit cards (Visa, MasterCard, American Express), mobile banking (bKash, Rocket, Nagad), and online payment gateways. All transactions are secured with SSL encryption.",
    category: "payment",
    tags: ["payment", "security", "methods"]
  },
  {
    id: "3",
    question: "Can I cancel or modify my booking?",
    answer: "Yes, you can cancel or modify your booking through our website or mobile app. Cancellation policies vary by airline/hotel and fare type. Some bookings may be non-refundable or have cancellation fees. Please check the fare rules before booking.",
    category: "booking",
    tags: ["cancellation", "modification", "policy"]
  },
  {
    id: "4",
    question: "Do you offer travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance options that cover medical emergencies, trip cancellations, lost luggage, and other travel-related risks. You can add insurance during the booking process.",
    category: "insurance",
    tags: ["insurance", "safety", "ShareTrip Clone"]
  },
  {
    id: "5",
    question: "How do I check my booking status?",
    answer: "You can check your booking status by logging into your account on our website or mobile app. You'll find all your bookings under 'My Bookings' section with real-time status updates.",
    category: "account",
    tags: ["booking", "status", "account"]
  },
  {
    id: "6",
    question: "What is the baggage allowance for flights?",
    answer: "Baggage allowance varies by airline and fare type. Economy class typically allows 20-23kg check-in baggage, while Business class allows 30kg. Carry-on baggage is usually 7kg for Economy and 10kg for Business. Please check specific airline policies.",
    category: "flights",
    tags: ["baggage", "flights", "allowance"]
  },
  {
    id: "7",
    question: "How do I get my e-ticket?",
    answer: "After successful booking, your e-ticket will be sent to your registered email address. You can also download it from your account. Make sure to carry a printed copy when traveling.",
    category: "booking",
    tags: ["e-ticket", "booking", "confirmation"]
  },
  {
    id: "8",
    question: "Are there any hidden fees?",
    answer: "We believe in transparent pricing. The price you see during booking includes all applicable taxes and fees. There are no hidden charges. However, some services like seat selection or extra baggage may have additional costs.",
    category: "pricing",
    tags: ["fees", "pricing", "transparency"]
  },
  {
    id: "9",
    question: "Can I book for someone else?",
    answer: "Yes, you can book for other passengers. You'll need their personal details as shown on their ID/passport during the booking process. Make sure you have their consent.",
    category: "booking",
    tags: ["third-party", "booking", "consent"]
  },
  {
    id: "10",
    question: "What if my flight is delayed or cancelled?",
    answer: "In case of flight delays or cancellations, we'll notify you via email and SMS. We'll assist you with rebooking options based on airline policies. You may be eligible for compensation depending on the circumstances.",
    category: "flights",
    tags: ["delays", "cancellations", "assistance"]
  },
  {
    id: "11",
    question: "How do I earn loyalty points?",
    answer: "Join our loyalty program to earn points on every booking. Points can be redeemed for discounts on future bookings. The more you travel, the more you earn!",
    category: "loyalty",
    tags: ["loyalty", "points", "rewards"]
  },
  {
    id: "12",
    question: "Do you offer group bookings?",
    answer: "Yes, we offer special rates for group bookings (10+ passengers). Contact our corporate team for customized group travel packages and discounts.",
    category: "booking",
    tags: ["group", "corporate", "discounts"]
  },
  {
    id: "13",
    question: "How do I contact customer support?",
    answer: "You can reach our 24/7 customer support via phone at +880 9617-617-617, email at support@sharetrip.net, or through our live chat feature on the website.",
    category: "support",
    tags: ["support", "contact", "24/7"]
  },
  {
    id: "14",
    question: "What is your refund policy?",
    answer: "Refund policies depend on the fare type and timing of cancellation. Refund amounts are calculated according to airline/hotel policies. Some promotional fares may be non-refundable.",
    category: "policy",
    tags: ["refund", "policy", "cancellation"]
  },
  {
    id: "15",
    question: "Do you provide visa assistance?",
    answer: "Yes, we offer visa assistance services for various countries. Our team can help with documentation requirements and application processes for a service fee.",
    category: "services",
    tags: ["visa", "documentation", "assistance"]
  }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "booking", name: "Booking" },
    { id: "payment", name: "Payment" },
    { id: "flights", name: "Flights" },
    { id: "hotels", name: "Hotels" },
    { id: "insurance", name: "Insurance" },
    { id: "account", name: "Account" },
    { id: "policy", name: "Policies" },
    { id: "services", name: "Services" },
    { id: "loyalty", name: "Loyalty" },
    { id: "support", name: "Support" }
  ];

  const filteredFAQs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about booking, payments, policies, and services.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35m-4.35-4.35m0-6.37a2 2 0 1 0 1-2.82 0l-4.35 4.35m0-6.37a2 2 0 0 1 0-2.82 0l-4.35 4.35"/>
                <path d="M11 8a2 2 0 0 0 2 2v8"/>
              </svg>
            </div>
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
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedItems.includes(faq.id) ? "rotate-45" : ""
                        }`}
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M19 9l-7 7-7-7"/>
                        <path d="M5 5l7 7 7-7"/>
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  </button>
                  
                  {expandedItems.includes(faq.id) && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {faq.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              Our customer support team is available 24/7 to help you with any queries or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-white text-blue-600 border-white hover:bg-blue-50">
                Call Us
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Email Support
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Live Chat
              </Button>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Flight Booking Process",
                "Payment Security",
                "Cancellation Policy",
                "Baggage Rules",
                "Travel Insurance",
                "Loyalty Program",
                "Group Bookings",
                "Visa Assistance",
                "Mobile App",
                "Hotel Booking",
                "Holiday Packages"
              ].map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const searchQuery = topic.toLowerCase().replace(/\s+/g, "+");
                    const matchingFAQ = faqs.find(faq => 
                      faq.question.toLowerCase().includes(searchQuery) ||
                      faq.answer.toLowerCase().includes(searchQuery)
                    );
                    if (matchingFAQ) {
                      setSelectedCategory(matchingFAQ.category);
                      setExpandedItems([matchingFAQ.id]);
                    }
                  }}
                  className="bg-white rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900">{topic}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
