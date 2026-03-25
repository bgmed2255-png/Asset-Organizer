import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "Subliminal Narrative Cues",
    description:
      "We encode brand stories into micro-interactions, color theory, and typographic rhythm that the conscious mind never notices — but the subconscious never forgets.",
    visual: { bg: "linear-gradient(135deg, #1a1008, #2d1a08)", icon: "eye" },
  },
  {
    number: "02",
    title: "Archetypal Signature Design",
    description:
      "Jungian archetypes mapped to visual identity systems. Every brand gets a soul, not just a style guide.",
    visual: { bg: "linear-gradient(135deg, #0d1117, #111827)", icon: "diamond" },
  },
  {
    number: "03",
    title: "Implicit Identity Association",
    description:
      "We build brand assets that trigger identity-level recognition. Customers don't choose your brand — they discover it was always part of them.",
    visual: { bg: "linear-gradient(135deg, #120808, #1e1010)", icon: "circle" },
  },
  {
    number: "04",
    title: "NLP Brand Language Systems",
    description:
      "Neurolinguistic programming principles applied to copy, positioning, and customer journey mapping. Language that converts at the identity level.",
    visual: { bg: "linear-gradient(135deg, #080d12, #0f1a24)", icon: "lines" },
  },
  {
    number: "05",
    title: "Mentalism & Pattern Interrupt",
    description:
      "Break expectations at precisely the right moment. We engineer surprise, delight, and cognitive dissonance that brands the memory permanently.",
    visual: { bg: "linear-gradient(135deg, #0e0e0e, #1a1a1a)", icon: "star" },
  },
  {
    number: "06",
    title: "Tribe Formation Strategy",
    description:
      "Social identity theory applied to brand community building. We don't find your audience — we create a movement that finds itself.",
    visual: { bg: "linear-gradient(135deg, #100a18, #1c1428)", icon: "network" },
  },
];

const IconSVG = ({ type }: { type: string }) => {
  const s = "rgba(234,229,217,0.25)";
  switch (type) {
    case "eye":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 8 C13 8 6 32 6 32 C6 32 13 56 32 56 C51 56 58 32 58 32 C58 32 51 8 32 8Z" stroke={s} strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="32" r="11" fill={s} />
        </svg>
      );
    case "diamond":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 8 L56 32 L32 56 L8 32 Z" stroke={s} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "circle":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="24" stroke={s} strokeWidth="1.5" fill="none" />
          <circle cx="32" cy="32" r="8" fill={s} />
        </svg>
      );
    case "lines":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {[16, 24, 32, 40, 48].map((y, i) => (
            <line key={i} x1="8" y1={y} x2={56 - i * 4} y2={y} stroke={s} strokeWidth="1" />
          ))}
        </svg>
      );
    case "star":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 8 L36 26 L56 32 L36 38 L32 56 L28 38 L8 32 L28 26 Z" stroke={s} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "network":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="4" fill={s} />
          {[[32, 8], [56, 44], [8, 44]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4" fill={s} />
              <line x1="32" y1="32" x2={cx} y2={cy} stroke={s} strokeWidth="1" />
            </g>
          ))}
        </svg>
      );
    default:
      return null;
  }
};

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const imagePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      imagePosRef.current.x = lerp(imagePosRef.current.x, mousePos.x, 0.08);
      imagePosRef.current.y = lerp(imagePosRef.current.y, mousePos.y, 0.08);
      img.style.left = `${imagePosRef.current.x}px`;
      img.style.top = `${imagePosRef.current.y}px`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll(".capability-row");
    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentCapability =
    hoveredIndex !== null ? capabilities[hoveredIndex] : null;

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        backgroundColor: "#101010",
        padding: "120px 0 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "0 40px",
          marginBottom: 60,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(234,229,217,0.35)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Capabilities
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(28px, 4vw, 56px)",
            fontWeight: 400,
            color: "#EAE5D9",
            letterSpacing: "0.01em",
          }}
        >
          The Arsenal
        </h2>
      </div>

      <div>
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="capability-row"
            data-cursor="EXPLORE"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              padding: "28px 40px",
              borderTop: "1px solid rgba(234,229,217,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background-color 0.4s ease",
              backgroundColor:
                hoveredIndex === i ? "rgba(234,229,217,0.02)" : "transparent",
              opacity: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 32 }}>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 13,
                  color: "rgba(234,229,217,0.2)",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  minWidth: 28,
                }}
              >
                {cap.number}
              </span>
              <span
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: "clamp(22px, 2.8vw, 42px)",
                  fontWeight: 400,
                  color: "#EAE5D9",
                  transition: "letter-spacing 0.4s ease",
                  letterSpacing: hoveredIndex === i ? "0.04em" : "0.02em",
                }}
              >
                {cap.title}
              </span>
            </div>
            <div
              style={{
                maxWidth: 280,
                opacity: hoveredIndex === i ? 1 : 0,
                transform: hoveredIndex === i ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  lineHeight: 1.75,
                  color: "rgba(234,229,217,0.5)",
                  letterSpacing: "0.02em",
                  textAlign: "right",
                }}
              >
                {cap.description}
              </p>
            </div>
          </div>
        ))}
        <div
          style={{
            borderTop: "1px solid rgba(234,229,217,0.07)",
          }}
        />
      </div>

      {currentCapability && (
        <div
          ref={imageRef}
          style={{
            position: "fixed",
            width: 220,
            height: 160,
            pointerEvents: "none",
            zIndex: 9000,
            transform: "translate(-50%, -110%)",
            overflow: "hidden",
            background: currentCapability.visual.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hoveredIndex !== null ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <IconSVG type={currentCapability.visual.icon} />
        </div>
      )}
    </section>
  );
}
