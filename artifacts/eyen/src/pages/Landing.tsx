import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import EyeLogo from "@/components/EyeLogo";

const chars = "EYEN".split("");

const navItems = [
  {
    label: "Studio",
    href: "/studio",
    desc: "Philosophy & process",
    num: "01",
  },
  {
    label: "Works",
    href: "/works",
    desc: "Selected projects",
    num: "02",
  },
  {
    label: "Contact",
    href: "/contact",
    desc: "Begin a project",
    num: "03",
  },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    charRefs.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { y: 160, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.0, ease: "power3.out" },
          i * 0.06
        );
      }
    });

    tl.fromTo(eyeRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
      0.2
    );

    tl.fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      0.55
    );

    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      0.8
    );

    tl.fromTo(navRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.88
    );

    gsap.to(eyeRef.current, {
      y: -6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Film grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />

      {/* Radial ambient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(234,229,217,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero — center */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
          padding: "100px 48px 0",
        }}
      >
        {/* Eye mark — positioned top-right of hero area */}
        <div
          ref={eyeRef}
          style={{
            position: "absolute",
            top: "50%",
            right: 48,
            transform: "translateY(-50%)",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <EyeLogo size={80} color="#EAE5D9" opacity={0.06} />
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: "clamp(88px, 19vw, 240px)",
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.03em",
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

        {/* Position statement */}
        <div
          ref={subtitleRef}
          style={{ marginTop: 36, maxWidth: 500, opacity: 0 }}
        >
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(16px, 1.4vw, 22px)",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.55,
              color: "rgba(234,229,217,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            "Your brand isn't just a logo — it's a belief system.<br />
            We build brands that convert the skeptical into the devoted."
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
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
                color: "rgba(234,229,217,0.2)",
                textTransform: "uppercase",
              }}
            >
              EST. 2023 · London · New York · Dubai
            </span>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div
        ref={lineRef}
        style={{
          position: "relative",
          zIndex: 2,
          height: 1,
          margin: "60px 48px 0",
          backgroundColor: "rgba(234,229,217,0.08)",
          transformOrigin: "left",
          scaleX: 0,
        }}
      />

      {/* Section navigation — bottom */}
      <div
        ref={navRef}
        style={{
          position: "relative",
          zIndex: 2,
          opacity: 0,
          paddingBottom: 0,
        }}
      >
        <div style={{ display: "flex" }}>
          {navItems.map((item, i) => (
            <button
              key={item.label}
              data-cursor="ENTER"
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                background: hovered === i ? "rgba(234,229,217,0.025)" : "transparent",
                border: "none",
                borderLeft: i === 0 ? "none" : "1px solid rgba(234,229,217,0.07)",
                borderRight: "none",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 10,
                transition: "background 0.45s ease",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 8,
                    letterSpacing: "0.22em",
                    color: "rgba(234,229,217,0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.num}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{
                    transform: hovered === i ? "translate(2px, -2px)" : "translate(0,0)",
                    transition: "transform 0.35s ease",
                    opacity: hovered === i ? 0.6 : 0.2,
                  }}
                >
                  <path d="M2 12L12 2M6 2H12V8" stroke="#EAE5D9" strokeWidth="1" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 400,
                  color: "#EAE5D9",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  color: "rgba(234,229,217,0.28)",
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
