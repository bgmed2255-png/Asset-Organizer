import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import EyeLogo from "@/components/EyeLogo";

const chars = "EYEN".split("");

const navItems = [
  { label: "Studio", href: "/studio", desc: "Who we are" },
  { label: "Works", href: "/works", desc: "What we've made" },
  { label: "Contact", href: "/contact", desc: "Start a project" },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    charRefs.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { y: 140, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.out" },
          i * 0.07
        );
      }
    });

    tl.fromTo(
      subtitleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      0.5
    );

    tl.fromTo(
      navRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      0.7
    );

    tl.fromTo(
      eyeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      0.4
    );

    // Subtle breathing animation on the eye
    gsap.to(eyeRef.current, {
      scale: 1.04,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Film grain overlay */}
      <div
        ref={grainRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          opacity: 0.6,
          mixBlendMode: "overlay",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(234,229,217,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Eye logo — large centered watermark behind text */}
      <div
        ref={eyeRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <EyeLogo size={120} color="#EAE5D9" opacity={0.04} />
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          padding: "80px 48px 0",
          textAlign: "center",
        }}
      >
        {/* Massive wordmark */}
        <div
          style={{
            fontSize: "clamp(96px, 21vw, 260px)",
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            color: "#EAE5D9",
            lineHeight: 0.88,
            display: "flex",
            userSelect: "none",
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) charRefs.current[i] = el; }}
              style={{ display: "inline-block", opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          ref={subtitleRef}
          style={{ marginTop: 40, maxWidth: 420, opacity: 0 }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(234,229,217,0.55)",
              letterSpacing: "0.05em",
            }}
          >
            We engineer the conditions for a customer to emerge, to participate,
            to become an evangelist.
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 20, height: 1, backgroundColor: "rgba(234,229,217,0.2)" }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 8,
                letterSpacing: "0.28em",
                color: "rgba(234,229,217,0.25)",
                textTransform: "uppercase",
              }}
            >
              EST. 2023 · London
            </span>
            <div style={{ width: 20, height: 1, backgroundColor: "rgba(234,229,217,0.2)" }} />
          </div>
        </div>
      </div>

      {/* Section navigation — bottom anchored */}
      <div
        ref={navRef}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 0 60px",
          marginTop: "auto",
          opacity: 0,
        }}
      >
        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(234,229,217,0.07)",
            margin: "0 48px 48px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item.label}
              data-cursor="ENTER"
              onClick={() => navigate(item.href)}
              style={{
                background: "none",
                border: "none",
                padding: "20px 60px",
                borderLeft: i === 0 ? "1px solid rgba(234,229,217,0.08)" : "none",
                borderRight: "1px solid rgba(234,229,217,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "background 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(234,229,217,0.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "none";
              }}
            >
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#EAE5D9",
                  letterSpacing: "0.06em",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "rgba(234,229,217,0.3)",
                  textTransform: "uppercase",
                }}
              >
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
