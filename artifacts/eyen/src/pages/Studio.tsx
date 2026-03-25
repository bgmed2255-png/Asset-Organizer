import { useEffect, useRef } from "react";
import gsap from "gsap";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement[]>([]);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".studio-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });

      philosophyItems.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: panelsRef.current[i],
          start: "top center",
          end: "bottom center",
          onEnter: () => showHeading(i),
          onEnterBack: () => showHeading(i),
        });
      });

      function showHeading(activeIndex: number) {
        headingsRef.current.forEach((h, i) => {
          gsap.to(h, {
            opacity: i === activeIndex ? 1 : 0,
            y: i === activeIndex ? 0 : 20,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      }

      gsap.set(headingsRef.current[0], { opacity: 1, y: 0 });
      headingsRef.current.slice(1).forEach((h) => gsap.set(h, { opacity: 0, y: 20 }));
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#101010", paddingTop: 64 }}>

      {/* Hero banner */}
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px 48px",
          borderBottom: "1px solid rgba(234,229,217,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 80, right: 48, opacity: 0.06, pointerEvents: "none" }}>
          <EyeLogo size={160} color="#EAE5D9" />
        </div>
        <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 32 }}>
          The Studio
        </p>
        <h1 className="studio-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.05, maxWidth: 720, letterSpacing: "0.01em" }}>
          We don't make brands.<br />We engineer belief.
        </h1>
        <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.5)", maxWidth: 480, marginTop: 32, letterSpacing: "0.03em" }}>
          EYEN is a branding agency built on the intersection of neurolinguistic programming, Jungian psychology, and uncompromising visual craft. We work with a curated selection of clients each year — not because exclusivity is a brand strategy, but because depth requires time.
        </p>
      </div>

      {/* Team */}
      <div style={{ padding: "100px 48px", borderBottom: "1px solid rgba(234,229,217,0.07)" }}>
        <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 48 }}>
          The People
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", backgroundColor: "rgba(234,229,217,0.07)" }}>
          {team.map((member) => (
            <div
              key={member.name}
              className="studio-reveal"
              style={{ padding: "40px 32px", backgroundColor: "#101010" }}
            >
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 400, color: "#EAE5D9", marginBottom: 8 }}>
                {member.name}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "rgba(234,229,217,0.4)", textTransform: "uppercase", marginBottom: 20 }}>
                {member.role}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(234,229,217,0.2)" }}>
                Since {member.since}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy — split screen */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div
          ref={stickyRef}
          style={{ width: "50%", position: "sticky", top: 64, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 60px 80px 48px", borderRight: "1px solid rgba(234,229,217,0.06)" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 40 }}>
            The Philosophy
          </p>
          <div style={{ position: "relative", minHeight: 280 }}>
            {philosophyItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => { if (el) headingsRef.current[i] = el; }}
                style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0 }}
              >
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 3vw, 46px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.15, letterSpacing: "0.01em" }}>
                  {item.heading}
                </h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", marginTop: 24 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: "50%", paddingLeft: 60, paddingRight: 48 }}>
          {philosophyItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { if (el) panelsRef.current[i] = el; }}
              style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 0", borderBottom: i < philosophyItems.length - 1 ? "1px solid rgba(234,229,217,0.06)" : "none" }}
            >
              <div style={{ width: 40, height: 1, backgroundColor: "rgba(234,229,217,0.2)", marginBottom: 40 }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.9, color: "rgba(234,229,217,0.65)", letterSpacing: "0.03em", maxWidth: 440 }}>
                {item.body}
              </p>
              <div style={{ marginTop: 60, width: "100%", aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
                <img src={item.image} alt={item.heading} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.75 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.05) 100%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24, fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase" }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div style={{ padding: "100px 0 80px", borderTop: "1px solid rgba(234,229,217,0.07)" }}>
        <div style={{ padding: "0 48px", marginBottom: 60 }}>
          <p className="studio-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 16 }}>
            Capabilities
          </p>
          <h2 className="studio-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 400, color: "#EAE5D9" }}>
            The Arsenal
          </h2>
        </div>
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="studio-reveal"
            style={{ padding: "24px 48px", borderTop: "1px solid rgba(234,229,217,0.07)", display: "flex", alignItems: "baseline", gap: 32 }}
          >
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 12, color: "rgba(234,229,217,0.2)", fontWeight: 300, letterSpacing: "0.1em", minWidth: 28 }}>
              {cap.num}
            </span>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 38px)", fontWeight: 400, color: "#EAE5D9", letterSpacing: "0.02em" }}>
              {cap.title}
            </span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(234,229,217,0.07)" }} />
      </div>

    </div>
  );
}
