import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { projects } from "@/data/projects";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EyeLogo from "@/components/EyeLogo";

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  {
    heading: "The Human as Storyteller.",
    body: "Every brand is a story waiting to be remembered. We use NLP frameworks and Jungian archetypes to construct narratives that bypass the rational mind and speak directly to identity. When a customer encounters an EYEN brand, they don't just see a logo — they recognize themselves.",
    label: "01 — Narrative Architecture",
    image: "/images/philosophy-1.png",
  },
  {
    heading: "The Yin and Yang of Branding.",
    body: "Logic and emotion are not opposites — they are dance partners. We engineer campaigns that satisfy the analytical left brain while simultaneously seducing the emotional right. The result is a brand experience that feels inevitable, like a song you've always known.",
    label: "02 — Duality Principle",
    image: "/images/philosophy-2.png",
  },
  {
    heading: "Engineering Tribes.",
    body: "The most powerful force in marketing is belonging. We design tribal signals — visual, verbal, and behavioral cues — that transform customers into evangelists. Using mentalism principles and social psychology, we create the conditions for cult-like devotion.",
    label: "03 — Tribe Formation",
    image: "/images/philosophy-3.png",
  },
];

const capabilities = [
  { num: "01", title: "Subliminal Narrative Cues" },
  { num: "02", title: "Archetypal Signature Design" },
  { num: "03", title: "Implicit Identity Association" },
  { num: "04", title: "NLP Brand Language Systems" },
  { num: "05", title: "Mentalism & Pattern Interrupt" },
  { num: "06", title: "Tribe Formation Strategy" },
];

const team = [
  { name: "Ava N.", role: "Creative Director", since: "2023" },
  { name: "Marcus T.", role: "Brand Strategist", since: "2023" },
  { name: "Yui K.", role: "Visual Identity", since: "2023" },
  { name: "Leon W.", role: "NLP Architect", since: "2024" },
];

export default function Studio() {
  const [, navigate] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement[]>([]);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".studio-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%" } }
        );
      });

      philosophyItems.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: panelsRef.current[i],
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => showHeading(i),
          onEnterBack: () => showHeading(i),
        });
      });

      function showHeading(activeIndex: number) {
        headingsRef.current.forEach((h, i) => {
          gsap.to(h, {
            opacity: i === activeIndex ? 1 : 0,
            y: i === activeIndex ? 0 : 16,
            duration: 0.55,
            ease: "power3.out",
          });
        });
      }

      gsap.set(headingsRef.current[0], { opacity: 1, y: 0 });
      headingsRef.current.slice(1).forEach((h) => gsap.set(h, { opacity: 0, y: 16 }));
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#101010", paddingTop: 64 }}>

      {/* Hero banner */}
      <div
        style={{
          minHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px 48px",
          borderBottom: "1px solid rgba(234,229,217,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "50%", right: 60, transform: "translateY(-55%)", opacity: 0.055, pointerEvents: "none" }}>
          <EyeLogo size={180} color="#EAE5D9" />
        </div>
        <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", marginBottom: 28 }}>
          The Studio
        </p>
        <h1 className="studio-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(38px, 6vw, 84px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.04, maxWidth: 700, letterSpacing: "0.005em" }}>
          We don't make brands.<br />We engineer belief.
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 48, maxWidth: 900 }}>
          <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.45)", letterSpacing: "0.025em" }}>
            EYEN is a branding agency built on the intersection of neurolinguistic programming, Jungian psychology, and uncompromising visual craft.
          </p>
          <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.45)", letterSpacing: "0.025em" }}>
            We work with a curated selection of clients each year — not because exclusivity is a strategy, but because depth requires time. A brand built at speed is a brand built to fail.
          </p>
        </div>
      </div>

      {/* Team */}
      <div style={{ padding: "80px 48px 0", borderBottom: "1px solid rgba(234,229,217,0.07)" }}>
        <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", marginBottom: 48 }}>
          The People
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: "rgba(234,229,217,0.06)", marginBottom: 0 }}>
          {team.map((member, i) => (
            <div
              key={member.name}
              className="studio-reveal"
              style={{ padding: "36px 32px 40px", backgroundColor: "#101010", borderBottom: "1px solid rgba(234,229,217,0.06)" }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.18em", color: "rgba(234,229,217,0.2)", marginBottom: 20 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 400, color: "#EAE5D9", marginBottom: 6 }}>
                {member.name}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 24 }}>
                {member.role}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "rgba(234,229,217,0.18)", textTransform: "uppercase" }}>
                Since {member.since}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy — sticky split */}
      <div style={{ display: "flex" }}>
        {/* Sticky left */}
        <div
          style={{
            width: "45%",
            position: "sticky",
            top: 64,
            height: "calc(100vh - 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 60px 60px 48px",
            borderRight: "1px solid rgba(234,229,217,0.06)",
          }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.28)", textTransform: "uppercase", marginBottom: 40 }}>
            The Philosophy
          </p>
          <div style={{ position: "relative", minHeight: 300 }}>
            {philosophyItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => { if (el) headingsRef.current[i] = el; }}
                style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0 }}
              >
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(24px, 2.8vw, 44px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.15, letterSpacing: "0.005em" }}>
                  {item.heading}
                </h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.22em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase", marginTop: 28 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling right panels */}
        <div style={{ width: "55%", paddingLeft: 60, paddingRight: 48 }}>
          {philosophyItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { if (el) panelsRef.current[i] = el; }}
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px 0",
                borderBottom: i < philosophyItems.length - 1 ? "1px solid rgba(234,229,217,0.06)" : "none",
              }}
            >
              <div style={{ width: 32, height: 1, backgroundColor: "rgba(234,229,217,0.15)", marginBottom: 36 }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.92, color: "rgba(234,229,217,0.6)", letterSpacing: "0.03em", maxWidth: 420 }}>
                {item.body}
              </p>
              <div style={{ marginTop: 56, width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
                <img
                  src={item.image}
                  alt={item.heading}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.7 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.05) 100%)" }} />
                <div style={{ position: "absolute", bottom: 18, left: 20, fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase" }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div style={{ padding: "80px 0 0", borderTop: "1px solid rgba(234,229,217,0.07)" }}>
        <div style={{ padding: "0 48px 48px" }}>
          <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.28)", textTransform: "uppercase", marginBottom: 14 }}>
            Capabilities
          </p>
          <h2 className="studio-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 4vw, 54px)", fontWeight: 400, color: "#EAE5D9" }}>
            The Arsenal
          </h2>
        </div>
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="studio-reveal"
            style={{ padding: "22px 48px", borderTop: "1px solid rgba(234,229,217,0.07)", display: "flex", alignItems: "baseline", gap: 28 }}
          >
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 12, color: "rgba(234,229,217,0.18)", letterSpacing: "0.08em", minWidth: 26 }}>
              {cap.num}
            </span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(18px, 2.4vw, 36px)", fontWeight: 400, color: "#EAE5D9", letterSpacing: "0.015em" }}>
              {cap.title}
            </span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(234,229,217,0.07)" }} />
      </div>

      {/* Bridge → Works */}
      <div
        data-cursor="EXPLORE"
        onClick={() => navigate("/works")}
        style={{
          margin: "0 48px",
          padding: "48px 0",
          borderTop: "1px solid rgba(234,229,217,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "opacity 0.4s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "rgba(234,229,217,0.28)", textTransform: "uppercase", marginBottom: 10 }}>
            The proof
          </p>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, color: "#EAE5D9" }}>
            See the work →
          </p>
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase" }}>
          {projects.length} Projects
        </span>
      </div>

    </div>
  );
}

