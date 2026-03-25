import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                  position: "relative",
                  overflow: "hidden",
                  background: "#0a0a0a",
                }}
              >
                <img
                  src={item.image}
                  alt={item.heading}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: 0.75,
                    mixBlendMode: "luminosity",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.05) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 24,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "rgba(234,229,217,0.35)",
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
