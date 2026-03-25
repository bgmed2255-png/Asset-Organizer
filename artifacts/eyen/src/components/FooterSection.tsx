import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".contact-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    }, section);

    if (eyeRef.current) {
      gsap.to(eyeRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: "#101010",
        padding: "120px 40px 60px",
        borderTop: "1px solid rgba(234,229,217,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 80,
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            className="contact-text"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.25em",
              color: "rgba(234,229,217,0.35)",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Ready to Begin?
          </p>
          <h2
            className="contact-text"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 400,
              color: "#EAE5D9",
              lineHeight: 1.1,
              letterSpacing: "0.01em",
              marginBottom: 32,
            }}
          >
            Let's engineer something unforgettable.
          </h2>
          <p
            className="contact-text"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              lineHeight: 1.8,
              color: "rgba(234,229,217,0.5)",
              letterSpacing: "0.03em",
              maxWidth: 360,
              marginBottom: 40,
            }}
          >
            New projects, collaborations, and conversations. We work with a
            limited number of clients each year to ensure the depth each brand
            deserves.
          </p>
          <a
            href="mailto:hello@eyen.studio"
            data-cursor="WRITE"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "#EAE5D9",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid rgba(234,229,217,0.3)",
              paddingBottom: 8,
            }}
            className="contact-text"
          >
            hello@eyen.studio
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 40 }}>
          <svg
            ref={eyeRef}
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.4 }}
          >
            <path
              d="M40 10 C18 10 8 40 8 40 C8 40 18 70 40 70 C62 70 72 40 72 40 C72 40 62 10 40 10Z"
              stroke="#EAE5D9"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="40" cy="40" r="14" fill="#EAE5D9" opacity="0.6" />
          </svg>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "rgba(234,229,217,0.25)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Offices
            </p>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 14,
                color: "rgba(234,229,217,0.45)",
                lineHeight: 1.8,
              }}
            >
              London · New York · Dubai
            </p>
          </div>
        </div>
      </div>

      <div
        className="contact-line"
        style={{
          height: 1,
          backgroundColor: "rgba(234,229,217,0.08)",
          marginBottom: 40,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(234,229,217,0.25)",
            letterSpacing: "0.15em",
          }}
        >
          EYEN
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(234,229,217,0.2)",
            textTransform: "uppercase",
          }}
        >
          © 2023–2026 EYEN Studio. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Instagram"].map((item) => (
            <a
              key={item}
              href="#"
              data-cursor="OPEN"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: "rgba(234,229,217,0.25)",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(234,229,217,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(234,229,217,0.25)")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
