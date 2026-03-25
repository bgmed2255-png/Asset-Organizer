import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  {
    heading: "The Human as Storyteller.",
    body: "Every brand is a story waiting to be remembered. We use NLP frameworks and Jungian archetypes to construct narratives that bypass the rational mind and speak directly to identity. When a customer encounters an EYEN brand, they don't just see a logo — they recognize themselves.",
    label: "01 — Narrative Architecture",
  },
  {
    heading: "The Yin and Yang of Branding.",
    body: "Logic and emotion are not opposites — they are dance partners. We engineer campaigns that satisfy the analytical left brain while simultaneously seducing the emotional right. The result is a brand experience that feels inevitable, like a song you've always known.",
    label: "02 — Duality Principle",
  },
  {
    heading: "Engineering Tribes.",
    body: "The most powerful force in marketing is belonging. We design tribal signals — visual, verbal, and behavioral cues — that transform customers into evangelists. Using mentalism principles and social psychology, we create the conditions for cult-like devotion.",
    label: "03 — Tribe Formation",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement[]>([]);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      philosophyItems.forEach((_, i) => {
        const heading = headingsRef.current[i];
        if (!heading) return;

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
    <section
      id="philosophy"
      ref={sectionRef}
      style={{
        backgroundColor: "#101010",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          ref={stickyRef}
          style={{
            width: "50%",
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 60px 80px 40px",
            borderRight: "1px solid rgba(234,229,217,0.06)",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.25em",
              color: "rgba(234,229,217,0.35)",
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            The Philosophy
          </p>

          <div style={{ position: "relative", minHeight: 280 }}>
            {philosophyItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) headingsRef.current[i] = el;
                }}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: "clamp(28px, 3.5vw, 52px)",
                    fontWeight: 400,
                    color: "#EAE5D9",
                    lineHeight: 1.15,
                    letterSpacing: "0.01em",
                  }}
                >
                  {item.heading}
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "rgba(234,229,217,0.3)",
                    textTransform: "uppercase",
                    marginTop: 24,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: "50%",
            paddingLeft: 60,
            paddingRight: 40,
          }}
        >
          {philosophyItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) panelsRef.current[i] = el;
              }}
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px 0",
                borderBottom:
                  i < philosophyItems.length - 1
                    ? "1px solid rgba(234,229,217,0.06)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 1,
                  backgroundColor: "rgba(234,229,217,0.2)",
                  marginBottom: 40,
                }}
              />
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  lineHeight: 1.9,
                  color: "rgba(234,229,217,0.65)",
                  letterSpacing: "0.03em",
                  maxWidth: 440,
                }}
              >
                {item.body}
              </p>

              <div
                style={{
                  marginTop: 60,
                  width: "100%",
                  aspectRatio: "16/9",
                  background:
                    i === 0
                      ? "linear-gradient(135deg, #1a1008 0%, #2d2010 100%)"
                      : i === 1
                      ? "linear-gradient(135deg, #0d1117 0%, #0a0f1a 100%)"
                      : "linear-gradient(135deg, #120810 0%, #1a0f18 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i === 0 && (
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <path
                        d="M40 10 C16 10 8 40 8 40 C8 40 16 70 40 70 C64 70 72 40 72 40 C72 40 64 10 40 10Z"
                        stroke="rgba(234,229,217,0.15)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <circle cx="40" cy="40" r="14" fill="rgba(234,229,217,0.1)" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <line x1="10" y1="40" x2="70" y2="40" stroke="rgba(234,229,217,0.12)" strokeWidth="1" />
                      <circle cx="40" cy="40" r="24" stroke="rgba(234,229,217,0.08)" strokeWidth="1" />
                      <circle cx="40" cy="40" r="12" stroke="rgba(234,229,217,0.12)" strokeWidth="1" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      {[0, 1, 2, 3, 4, 5].map((j) => {
                        const angle = (j * 60 * Math.PI) / 180;
                        const x = 40 + 24 * Math.cos(angle);
                        const y = 40 + 24 * Math.sin(angle);
                        return (
                          <circle
                            key={j}
                            cx={x}
                            cy={y}
                            r={4}
                            fill="rgba(234,229,217,0.12)"
                          />
                        );
                      })}
                      <circle cx="40" cy="40" r="4" fill="rgba(234,229,217,0.2)" />
                    </svg>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 24,
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: "rgba(234,229,217,0.2)",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
