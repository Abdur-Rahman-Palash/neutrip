"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer, hoverScale, hoverLift } from "@/components/layout/AnimatedLayout";

export default function About() {
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { number: "2M+", label: "Happy Customers" },
    { number: "500+", label: "Travel Partners" },
    { number: "50+", label: "Destinations" },
    { number: "24/7", label: "Customer Support" }
  ];

  const team = [
    {
      name: "Ahmed Rahman",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      bio: "Visionary leader with 15+ years in travel industry"
    },
    {
      name: "Sarah Khan",
      role: "COO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=200&h=200&fit=crop&crop=faces",
      bio: "Operations expert focused on customer experience"
    },
    {
      name: "Karim Ahmed",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
      bio: "Tech enthusiast driving digital transformation"
    },
    {
      name: "Fatema Khatun",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
      bio: "Marketing strategist with global travel experience"
    }
  ];

  const values = [
    {
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring their travel experiences are exceptional.",
      icon: "❤️"
    },
    {
      title: "Integrity",
      description: "We conduct business with honesty and transparency, building trust through ethical practices.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge travel solutions and experiences.",
      icon: "💡"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from booking to travel completion.",
      icon: "⭐"
    }
  ];

  const milestones = [
    { year: "2015", title: "Founded", description: "Started as a small travel agency in Dhaka" },
    { year: "2017", title: "Expansion", description: "Expanded to cover all major destinations in Bangladesh" },
    { year: "2019", title: "Digital Launch", description: "Launched online platform reaching 100,000+ customers" },
    { year: "2021", title: "International Growth", description: "Expanded services to international destinations" },
    { year: "2023", title: "Innovation Award", description: "Recognized for digital innovation in travel industry" },
    { year: "2024", title: "Market Leader", description: "Became the leading travel platform in Bangladesh" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <motion.main {...staggerContainer} className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About ShareTrip Clone
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We are Bangladesh's leading travel platform, dedicated to making travel accessible, 
              affordable, and enjoyable for everyone. With a passion for exploration and commitment 
              to excellence, we've helped millions of travelers discover their perfect journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div {...hoverScale}>
                <Button size="lg">Our Story</Button>
              </motion.div>
              <motion.div {...hoverScale}>
                <Button variant="outline" size="lg">Contact Us</Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div {...fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                {...scaleIn}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div {...fadeInUp} className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
              {[
                { id: "story", label: "Our Story" },
                { id: "mission", label: "Mission & Vision" },
                { id: "team", label: "Our Team" },
                { id: "values", label: "Our Values" }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  {...hoverScale}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div {...fadeInUp} className="bg-white rounded-lg shadow-sm p-8 mb-16">
            {activeTab === "story" && (
              <motion.div {...scaleIn} className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    ShareTrip Clone began in 2015 with a simple mission: to make travel accessible to everyone in Bangladesh. 
                    What started as a small travel agency in Dhaka has grown into the country's leading 
                    digital travel platform, serving over 2 million customers.
                  </p>
                  <p>
                    Our journey has been driven by a deep understanding of the Bangladeshi traveler's needs 
                    and a commitment to providing exceptional service. We've embraced digital transformation 
                    early on, building a platform that makes booking flights, hotels, and holiday packages as easy 
                    as a few clicks.
                  </p>
                  <p>
                    Today, we're proud to be the trusted travel partner for millions of Bangladeshis, 
                    helping them explore the beauty of our country and discover destinations around the world. 
                    Our success is built on the trust our customers place in us and the relationships we've 
                    developed with our travel partners.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div {...scaleIn} className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Mission & Vision</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div {...slideInLeft}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-600">
                      To make travel accessible, affordable, and enjoyable for everyone by providing 
                      innovative travel solutions, exceptional customer service, and unforgettable experiences. 
                      We strive to be the most trusted travel partner for Bangladeshis exploring both domestic 
                      and international destinations.
                    </p>
                  </motion.div>
                  
                  <motion.div {...slideInRight}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                    <p className="text-gray-600">
                      To be the leading travel platform in South Asia, known for innovation, reliability, 
                      and customer-centric approach. We envision a world where travel is seamless, sustainable, 
                      and enriching for all, connecting people across borders and cultures.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div {...scaleIn}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.map((member, index) => (
                    <motion.div 
                      key={index} 
                      {...hoverLift}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.bio}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "values" && (
              <motion.div {...scaleIn}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div 
                      key={index} 
                      {...hoverLift}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="text-4xl">{value.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Milestones Timeline */}
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={index} 
                    {...slideInLeft}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-8"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                    <div className="flex-grow bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Partners */}
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Partners</h2>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-center text-gray-600 mb-6">
                We work with the best airlines, hotels, and travel service providers to ensure you get the best experience.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {["Biman Bangladesh", "US-Bangla Airlines", "Novoair", "Air Arabia", "Emirates", "Qatar Airways", "Pan Pacific", "Radisson Blu", "Six Seasons", "Long Beach Hotel", "Grand Sultan Tea Resort"].map((partner, index) => (
                  <motion.div 
                    key={index} 
                    {...hoverScale}
                    transition={{ delay: index * 0.05 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-xs font-bold text-gray-600">{partner.substring(0, 3)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{partner}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div {...scaleIn} className="bg-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for travel and commitment to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div {...hoverScale}>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                  View Open Positions
                </Button>
              </motion.div>
              <motion.div {...hoverScale}>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact HR
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
