"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/features/HeroSearch";
import { OffersSection } from "@/components/features/OffersSection";
import { Destinations } from "@/components/features/Destinations";
import { Airlines } from "@/components/features/Airlines";
import { HotelsAndPackages } from "@/components/features/HotelsAndPackages";
import { Services } from "@/components/features/Services";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/layout/AnimatedLayout";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <motion.main {...staggerContainer}>
        <motion.div {...fadeInUp}>
          <HeroSearch />
        </motion.div>
        <motion.div {...fadeInUp}>
          <OffersSection />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Destinations />
        </motion.div>
        <motion.div {...fadeInUp}>
          <HotelsAndPackages />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Services />
        </motion.div>
        <motion.div {...fadeInUp}>
          <Airlines />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
}
