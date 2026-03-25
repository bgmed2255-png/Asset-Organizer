import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "The Silence Between Notes",
    category: "Brand Identity",
    year: "2024",
    description:
      "Archetypal depth meets minimalist form. A music label reborn as a cultural institution.",
    bg: "linear-gradient(135deg, #1a1008 0%, #2d1f0e 40%, #101010 100%)",
    accentColor: "#C4A882",
  },
  {
    id: 2,
    title: "Fractured Horizon",
    category: "Visual Identity",
    year: "2024",
    description:
      "Where brutalist architecture meets human vulnerability. A luxury hotel brand that breathes.",
    bg: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #101010 100%)",
    accentColor: "#7B9BA8",
  },
  {
    id: 3,
    title: "The Ritual",
    category: "Brand Strategy",
    year: "2023",
    description:
      "NLP-infused brand language for a wellness brand that converts the skeptical.",
    bg: "linear-gradient(135deg, #120d08 0%, #1c1408 50%, #101010 100%)",
    accentColor: "#B8A06A",
  },
  {
    id: 4,
    title: "Negative Space",
    category: "Campaign",
    year: "2023",
    description:
      "What you don't say is as powerful as what you do. A fashion manifesto in silence.",
    bg: "linear-gradient(135deg, #0e0e0e 0%, #181818 50%, #101010 100%)",
    accentColor: "#E5D5C0",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        const img = card.querySelector(".card-visual");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
                scrub: 1,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#101010",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(234,229,217,0.35)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Selected Works
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 36,
            fontWeight: 400,
            color: "#EAE5D9",
            letterSpacing: "0.02em",
          }}
        >
          Narrative Resonance
        </h2>
      </div>

      <div
        ref={trackRef}
        className="horizontal-section"
        style={{
          height: "100vh",
          alignItems: "center",
          paddingLeft: "10vw",
          gap: "4vw",
          willChange: "transform",
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            data-cursor="VIEW STORY"
            style={{
              flexShrink: 0,
              width: "clamp(300px, 32vw, 480px)",
              height: "70vh",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="card-visual"
              style={{
                position: "absolute",
                inset: 0,
                background: project.bg,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "40px 36px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(234,229,217,0.04) 0%, transparent 60%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 32,
                  left: 36,
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 80,
                  fontWeight: 300,
                  color: "rgba(234,229,217,0.06)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: project.accentColor,
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      color: "rgba(234,229,217,0.3)",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: "clamp(22px, 2.2vw, 32px)",
                    fontWeight: 400,
                    color: "#EAE5D9",
                    lineHeight: 1.15,
                    marginBottom: 16,
                    letterSpacing: "0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    lineHeight: 1.7,
                    color: "rgba(234,229,217,0.55)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {project.description}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 1,
                      backgroundColor: project.accentColor,
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: "rgba(234,229,217,0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    View Story
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ flexShrink: 0, width: "8vw" }} />
      </div>
    </section>
  );
}
