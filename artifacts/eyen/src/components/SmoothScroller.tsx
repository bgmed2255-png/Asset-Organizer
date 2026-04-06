import { useEffect } from "react";
import { useLocation } from "wouter";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

export default function SmoothScroller() {
  const [location] = useLocation();

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // On route change: kill old ScrollTriggers, reset scroll
  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    lenis?.scrollTo(0, { immediate: true });
  }, [location]);

  return null;
}
