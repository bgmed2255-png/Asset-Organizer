import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import EyeLogo from "@/components/EyeLogo";

const navItems = [
  { label: "Studio",  href: "/studio",  desc: "Philosophy & Process", num: "01" },
  { label: "Works",   href: "/works",   desc: "Selected Projects",    num: "02" },
  { label: "Contact", href: "/contact", desc: "Begin a Project",      num: "03" },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const lettersRef  = useRef<HTMLDivElement>(null);
  const ruleTopRef  = useRef<HTMLDivElement>(null);
  const midRef      = useRef<HTMLDivElement>(null);
  const ruleMidRef  = useRef<HTMLDivElement>(null);
  const navRef      = useRef<HTMLDivElement>(null);
  const eyeRef      = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    const letters = lettersRef.current?.querySelectorAll(".hero-letter");
    if (letters) {
      tl.fromTo(Array.from(letters),
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.05, ease: "power3.out", stagger: 0.055 },
        0
      );
    }

    tl.fromTo(ruleTopRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
      0.42
    );

    tl.fromTo(eyeRef.current,
      { opacity: 0, scale: 0.75 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
      0.54
    );

    tl.fromTo(midRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.6
    );

    tl.fromTo(ruleMidRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      0.78
    );

    tl.fromTo(navRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.88
    );

    gsap.to(eyeRef.current, {
      scale: 1.08,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2.2,
    });
  }, []);

  return (
    <div
      style={{
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── WORDMARK ─────────────────── fills remaining space */}
      <div
        ref={lettersRef}
        style={{
          flex: "1 1 0",
          minHeight: 0,
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
          paddingBottom: "clamp(8px, 1.5vh, 18px)",
        }}
      >
        {["E","Y","E","N"].map((char, i) => (
          <div
            key={i}
            className="hero-letter"
            style={{
              flex: "1 0 0",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontWeight: 400,
              // Use min of vw and vh so it always fits vertically too
              fontSize: "min(24.5vw, 55vh)",
              color: "#EAE5D9",
              textAlign: "center",
              lineHeight: 0.85,
              opacity: 0,
              userSelect: "none",
            }}
          >
            {char}
          </div>
        ))}

        {/* Corner labels */}
        <span style={{ position: "absolute", top: 80, right: 28, fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.28em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", lineHeight: 2, textAlign: "right" }}>
          Branding Agency<br />Est. 2023
        </span>
        <span style={{ position: "absolute", bottom: "clamp(12px, 2.5vh, 28px)", left: 28, fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.28em", color: "rgba(234,229,217,0.16)", textTransform: "uppercase" }}>
          London · New York · Dubai
        </span>
      </div>

      {/* ── RULE ──────────────────────────────────────── */}
      <div ref={ruleTopRef} style={{ height: 1, backgroundColor: "rgba(234,229,217,0.1)", zIndex: 2, transformOrigin: "left", scaleX: 0, flexShrink: 0 }} />

      {/* ── MIDDLE BAND ───────────────────────────────── */}
      <div
        ref={midRef}
        style={{
          flexShrink: 0,
          display: "grid",
          gridTemplateColumns: "1fr 56px 1fr",
          alignItems: "center",
          padding: "clamp(16px, 2.8vh, 40px) 28px",
          zIndex: 2,
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(12px, 1.1vw, 17px)",
          fontWeight: 400,
          lineHeight: 1.65,
          color: "rgba(234,229,217,0.6)",
          maxWidth: 400,
        }}>
          We engineer the conditions for a customer to emerge,
          to participate, to become an evangelist.
        </p>

        <div ref={eyeRef} style={{ display: "flex", justifyContent: "center", opacity: 0 }}>
          <EyeLogo size={24} color="#EAE5D9" opacity={0.5} />
        </div>

        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(8px, 0.65vw, 10px)",
          lineHeight: 1.95,
          color: "rgba(234,229,217,0.25)",
          letterSpacing: "0.05em",
          textAlign: "right",
          marginLeft: "auto",
          maxWidth: 300,
        }}>
          We blend the intuitive artistry of Rick Rubin with the
          paradigm-shifting vision of Steve Jobs. We don't build brands.
          We engineer belief.
        </p>
      </div>

      {/* ── RULE ──────────────────────────────────────── */}
      <div ref={ruleMidRef} style={{ height: 1, backgroundColor: "rgba(234,229,217,0.1)", zIndex: 2, transformOrigin: "left", scaleX: 0, flexShrink: 0 }} />

      {/* ── NAV BAND ──────────────────────────────────── */}
      <div
        ref={navRef}
        style={{
          flexShrink: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          zIndex: 2,
          opacity: 0,
        }}
      >
        {navItems.map((item, i) => (
          <button
            key={item.label}
            data-cursor="ENTER"
            onClick={() => navigate(item.href)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? "rgba(234,229,217,0.03)" : "transparent",
              border: "none",
              borderLeft: i > 0 ? "1px solid rgba(234,229,217,0.09)" : "none",
              padding: "clamp(14px, 2.2vh, 32px) 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.4s ease",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.22em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", marginBottom: 8 }}>
                {item.num}
              </p>
              <p style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(16px, 1.9vw, 28px)",
                fontWeight: 400,
                color: "#EAE5D9",
                letterSpacing: hovered === i ? "0.09em" : "0.04em",
                lineHeight: 1,
                marginBottom: 6,
                transition: "letter-spacing 0.35s ease",
              }}>
                {item.label}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.17em", color: "rgba(234,229,217,0.24)", textTransform: "uppercase" }}>
                {item.desc}
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: hovered === i ? "translate(2px,-2px)" : "none", transition: "transform 0.3s ease, opacity 0.3s ease", opacity: hovered === i ? 0.5 : 0.14, flexShrink: 0 }}>
              <path d="M2 12L12 2M8 2H12V6" stroke="#EAE5D9" strokeWidth="1" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
