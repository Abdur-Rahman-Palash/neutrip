"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer, hoverScale, hoverLift } from "@/components/layout/AnimatedLayout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "general"
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        department: "general"
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      title: "Head Office",
      address: "Rangs Pearl Tower, 4th Floor, House 76, Road 12, Block E, Banani, Dhaka 1213",
      phone: "+880 9617-617-617",
      email: "info@sharetrip.net",
      hours: "Saturday - Thursday: 9:00 AM - 8:00 PM, Friday: 9:00 AM - 6:00 PM"
    },
    {
      title: "Customer Support",
      phone: "+880 9617-617-618",
      email: "support@sharetrip.net",
      hours: "24/7 Available"
    },
    {
      title: "Corporate Office",
      address: "Gulshan Circle 1, Dhaka 1212",
      phone: "+880 9617-617-619",
      email: "corporate@sharetrip.net",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM"
    }
  ];

  const departments = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Booking Support" },
    { value: "corporate", label: "Corporate Travel" },
    { value: "complaint", label: "Complaint" },
    { value: "partnership", label: "Partnership" },
    { value: "technical", label: "Technical Support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <motion.main {...staggerContainer} className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help! Reach out to us through any of the channels below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div {...slideInLeft} className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <motion.div {...scaleIn} className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-green-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.08"/>
                        <polyline points="22 20 12 14.01 16 11.08"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your full name"
                        />
                      </motion.div>
                      
                      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="your@email.com"
                        />
                      </motion.div>
                      
                      <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your phone number"
                        />
                      </motion.div>
                      
                      <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {departments.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    </div>
                    
                    <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="How can we help you?"
                      />
                    </motion.div>
                    
                    <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </motion.div>
                    
                    <motion.div {...hoverScale} transition={{ delay: 0.7 }}>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>

              {/* Quick Contact */}
              <motion.div {...scaleIn} transition={{ delay: 0.3 }} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <motion.div {...hoverLift} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">24/7 Hotline</div>
                      <div className="text-sm text-gray-600">+880 9617-617-617</div>
                    </div>
                  </motion.div>
                  
                  <motion.div {...hoverLift} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@sharetrip.net</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div {...slideInRight} className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Office Locations</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((office, index) => (
                    <motion.div 
                      key={index} 
                      {...hoverLift}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    >
                      <h3 className="font-bold text-gray-900 mb-3">{office.title}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13 9-6 9-13"/>
                            <path d="M3.5 6h13"/>
                            <path d="M3.5 10h13"/>
                            <path d="M3.5 14h13"/>
                            <path d="M3.5 18h13"/>
                          </svg>
                          <div className="text-sm text-gray-600">
                            <div>{office.address}</div>
                          </div>
                        </div>
                        
                        {office.phone && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <div className="text-sm text-gray-600">{office.phone}</div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="20" height="16" x="2" y="4" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                          </svg>
                          <div className="text-sm text-gray-600">{office.email}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <motion.div {...scaleIn} transition={{ delay: 0.4 }} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Find Us</h2>
                <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m3!1m3!1m2!1s0x3755344e5ea0d3b:0x3755344e5ea0d3b!2sDhaka!5e76!5e76!5e76!5e76&z=13.5"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div {...fadeInUp} className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How can I book a flight or hotel?",
                  answer: "You can book through our website, mobile app, or by calling our customer support team."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit/debit cards, mobile banking, and online payment gateways."
                },
                {
                  question: "Can I cancel or modify my booking?",
                  answer: "Yes, you can cancel or modify your booking subject to the terms and conditions of your booking."
                },
                {
                  question: "Do you offer travel insurance?",
                  answer: "Yes, we offer comprehensive travel insurance options for your peace of mind."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index} 
                  {...hoverLift}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
