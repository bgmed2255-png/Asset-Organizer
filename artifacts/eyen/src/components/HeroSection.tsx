import { useEffect, useRef } from "react";
import gsap from "gsap";

const chars = "EYEN".split("");

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<SVGSVGElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    chars.forEach((_, i) => {
      const el = document.getElementById(`hero-char-${i}`);
      if (el) {
        tl.fromTo(
          el,
          { y: 120, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.0,
            ease: "power3.out",
          },
          i * 0.08
        );
      }
    });

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      0.6
    );

    tl.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      1.2
    );

    if (eyeRef.current) {
      gsap.to(eyeRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    }
  }, []);

  return (
    <section
      id="studio"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 40px 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(234,229,217,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: "clamp(100px, 22vw, 280px)",
          fontFamily: "Cormorant Garamond, Georgia, serif",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "#EAE5D9",
          lineHeight: 0.85,
          display: "flex",
          gap: "0.02em",
          userSelect: "none",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            id={`hero-char-${i}`}
            style={{ display: "inline-block", opacity: 0 }}
          >
            {char}
          </span>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 40,
          maxWidth: 340,
        }}
        ref={subtitleRef}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(234,229,217,0.75)",
            letterSpacing: "0.04em",
          }}
        >
          We don't just make brands. We engineer the conditions for a customer to
          emerge, to participate, to become an evangelist. We blend the intuitive
          artistry of Rick Rubin with the paradigm-shifting vision of Steve Jobs.
        </p>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 24,
              height: 1,
              backgroundColor: "rgba(234,229,217,0.4)",
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.25em",
              color: "rgba(234,229,217,0.4)",
              textTransform: "uppercase",
            }}
          >
            EST. 2023
          </span>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        style={{
          position: "absolute",
          bottom: 60,
          right: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: 0,
        }}
      >
        <svg
          ref={eyeRef}
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transformOrigin: "center center" }}
        >
          <path
            d="M26 6 C10 6 4 26 4 26 C4 26 10 46 26 46 C42 46 48 26 48 26 C48 26 42 6 26 6Z"
            stroke="#EAE5D9"
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="26" r="9" fill="#EAE5D9" />
        </svg>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 8,
            letterSpacing: "0.25em",
            color: "rgba(234,229,217,0.4)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          SCROLL
        </div>
      </div>

      <div
        ref={scrollHintRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "rgba(234,229,217,0.08)",
        }}
      />
    </section>
  );
}
