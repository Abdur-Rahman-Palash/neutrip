"use client";

import { useRef, useEffect } from "react";
import { destinations } from "@/data/destinations";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

export function Destinations() {
  const sectionRef = useRef<HTMLElement>(null);
  const destinationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Parallax effect for section background
    if (sectionRef.current) {
      gsap.to(sectionRef.current.querySelector(".bg-gray-50"), {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Animate destination cards
    destinationRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/20 rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-20 w-60 h-60 bg-cyan-200/20 rounded-full"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Destinations
            </h2>
            <p className="text-gray-500 mt-2">
              Find the perfect place for your next getaway
            </p>
          </div>
          <motion.a 
            href="#" 
            className="hidden md:block text-blue-600 font-medium hover:underline"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Destinations
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              ref={(el) => { destinationRefs.current[index] = el; }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
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
              {/* Image */}
              <div className="h-48 w-full relative overflow-hidden">
                <motion.img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating overlay effect */}
                <motion.div 
                  className="absolute inset-0 bg-blue-600/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <motion.h3 
                  className="text-lg font-bold transition-colors duration-300"
                  whileHover={{ color: "#60A5FA" }}
                >
                  {destination.name}
                </motion.h3>
                <motion.div 
                  className="flex items-center justify-between mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-sm font-medium opacity-90">{destination.country}</span>
                  <motion.span 
                    className="text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-full"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    {destination.hotelCount} Hotels
                  </motion.span>
                </motion.div>
              </div>

              {/* Hover effect overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-8 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#" 
            className="text-blue-600 font-medium hover:underline inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Destinations
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
