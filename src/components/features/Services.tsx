"use client";

import { useRef, useEffect } from "react";
import { services } from "@/data/services";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap-config";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const serviceRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        sectionRef.current.querySelector("h2"),
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        sectionRef.current.querySelector("p"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );
    }

    // Staggered animation for service cards
    serviceRefs.current.forEach((service, index) => {
      if (service) {
        gsap.fromTo(
          service,
          { y: 80, opacity: 0, rotationX: -30 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            delay: 0.5 + index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: service,
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
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent rounded-full blur-3xl"
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Travel Services & Ecosystem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a perfect travel experience, all in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                ref={(el) => serviceRefs.current[index] = el}
                href={service.link}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 bg-white group cursor-pointer relative overflow-hidden"
              >
                {/* Animated background overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors text-2xl relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold text-gray-900 mb-2 relative z-10"
                  whileHover={{ color: "#2563EB", scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-500 relative z-10"
                  whileHover={{ color: "#6B7280" }}
                  transition={{ duration: 0.2 }}
                >
                  {service.description}
                </motion.p>

                {/* Floating particles effect */}
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0"
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
