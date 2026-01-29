import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/features/HeroSearch";
import { OffersSection } from "@/components/features/OffersSection";
import { Destinations } from "@/components/features/Destinations";
import { Airlines } from "@/components/features/Airlines";
import { HotelsAndPackages } from "@/components/features/HotelsAndPackages";
import { Services } from "@/components/features/Services";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSearch />
        <OffersSection />
        <Destinations />
        <HotelsAndPackages />
        <Services />
        <Airlines />
      </main>
      <Footer />
    </div>
  );
}
