import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import PhilosophySection from "@/components/PhilosophySection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import FooterSection from "@/components/FooterSection";

function App() {
  return (
    <>
      <SmoothScroller />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <HorizontalScroll />
        <PhilosophySection />
        <CapabilitiesSection />
        <FooterSection />
      </main>
    </>
  );
}

export default App;
