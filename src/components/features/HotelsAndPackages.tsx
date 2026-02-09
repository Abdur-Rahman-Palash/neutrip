"use client";

import { useState, useRef, useEffect } from "react";
import { hotels, holidayPackages } from "@/data/hotels";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

export function HotelsAndPackages() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'packages'>('hotels');
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector("h2"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Animate cards with stagger
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, rotationY: 15 },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-cyan-200/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Hotels & Holiday Packages
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <motion.button
            onClick={() => setActiveTab('hotels')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
              activeTab === 'hotels'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === 'hotels' && (
              <motion.div 
                className="absolute inset-0 bg-blue-600 rounded-lg"
                layoutId="activeTabBackground"
              />
            )}
            <span className="relative z-10">Hotels</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === 'packages' && (
              <motion.div 
                className="absolute inset-0 bg-blue-600 rounded-lg"
                layoutId="activeTabBackground"
              />
            )}
            <span className="relative z-10">Holiday Packages</span>
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'hotels' && (
            <motion.div
              key="hotels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {hotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  ref={(el) => cardRefs.current[index] = el}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-48 w-full relative overflow-hidden">
                    <motion.img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <motion.h3 
                      className="font-bold text-gray-900 truncate mb-2"
                      whileHover={{ color: "#2563EB" }}
                      transition={{ duration: 0.2 }}
                    >
                      {hotel.name}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center gap-1 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`w-3 h-3 ${i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
                          viewBox="0 0 24 24"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </motion.svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({hotel.rating})</span>
                      <span className="text-xs text-gray-400 ml-1">({hotel.reviewCount} reviews)</span>
                    </motion.div>
                    <p className="text-xs text-gray-500 mb-3">{hotel.location}</p>
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xs text-gray-400">From</span>
                      <span className="text-lg font-bold text-gray-900">${hotel.price}/night</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {holidayPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  ref={(el) => cardRefs.current[index] = el}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-48 w-full relative overflow-hidden">
                    <motion.img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <motion.h3 
                      className="font-bold text-gray-900 truncate mb-2"
                      whileHover={{ color: "#2563EB" }}
                      transition={{ duration: 0.2 }}
                    >
                      {pkg.name}
                    </motion.h3>
                    <motion.p 
                      className="text-xs font-medium text-blue-600 mb-2 bg-blue-50 inline-block px-2 py-1 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {pkg.duration}
                    </motion.p>
                    <div className="text-xs text-gray-500 mb-3">
                      {pkg.locations.join(' → ')}
                    </div>
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xs text-gray-400">Per Person</span>
                      <span className="text-lg font-bold text-gray-900">${pkg.price}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg">
              View All {activeTab === 'hotels' ? 'Hotels' : 'Packages'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
