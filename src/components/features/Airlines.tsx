"use client";

import { useRef, useEffect } from "react";
import { airlines } from "@/data/airlines";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

export function Airlines() {
  const sectionRef = useRef<HTMLElement>(null);
  const airlineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate section title
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector("h2"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    // Staggered animation for airline cards
    airlineRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
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
    <section ref={sectionRef} className="py-12 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)`,
          }}
          animate={{
            x: [0, 70],
            y: [0, 70],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.h2 
          className="text-2xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Top Airlines
        </motion.h2>
        
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {airlines.map((airline, index) => (
            <motion.div
              key={airline.id}
              ref={(el) => { airlineRefs.current[index] = el; }}
              className="flex-shrink-0 flex flex-col items-center gap-3 min-w-[120px] snap-start group cursor-pointer"
              whileHover={{ 
                y: -8,
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                whileHover={{ 
                  rotate: 360,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={airline.logo} 
                  alt={airline.name}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors text-center"
                whileHover={{ scale: 1.1 }}
              >
                {airline.name}
              </motion.span>
              <motion.span 
                className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {airline.code}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
