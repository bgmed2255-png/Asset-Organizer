import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const [, navigate] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".works-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#101010", paddingTop: 64, minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "80px 48px 60px", borderBottom: "1px solid rgba(234,229,217,0.07)" }}>
        <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 20 }}>
          Selected Works
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 className="works-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px, 6vw, 86px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.0 }}>
            Work
          </h1>
          <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(234,229,217,0.35)", letterSpacing: "0.04em", maxWidth: 280, textAlign: "right", lineHeight: 1.8 }}>
            A curated selection of identity systems and campaigns engineered for cultural resonance.
          </p>
        </div>
      </div>

      {/* Projects list */}
      <div>
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="works-reveal"
            data-cursor="VIEW PROJECT"
            onClick={() => navigate(`/works/${project.slug}`)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr auto",
              alignItems: "center",
              padding: "0 48px",
              borderBottom: "1px solid rgba(234,229,217,0.07)",
              transition: "background 0.5s ease",
              backgroundColor: hoveredIndex === i ? "rgba(234,229,217,0.02)" : "transparent",
              gap: 32,
            }}
          >
            {/* Index */}
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: "rgba(234,229,217,0.18)", letterSpacing: "0.1em", paddingTop: 36, paddingBottom: 36 }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <div style={{ paddingTop: 36, paddingBottom: 36 }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, color: "#EAE5D9", letterSpacing: "0.02em", transition: "letter-spacing 0.4s ease", marginBottom: 8 }}>
                {project.title}
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: project.accentColor, textTransform: "uppercase" }}>
                {project.category}
              </p>
            </div>

            {/* Description preview */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, lineHeight: 1.7, color: "rgba(234,229,217,0.35)", letterSpacing: "0.02em", maxWidth: 360, opacity: hoveredIndex === i ? 1 : 0, transition: "opacity 0.4s ease", paddingTop: 36, paddingBottom: 36 }}>
              {project.tagline}
            </p>

            {/* Year + arrow */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingTop: 36, paddingBottom: 36 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(234,229,217,0.25)" }}>
                {project.year}
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid rgba(234,229,217,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: hoveredIndex === i ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="rgba(234,229,217,0.6)" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Image reveal on hover */}
          </div>
        ))}
      </div>

      {/* Grid view — all project thumbnails */}
      <div style={{ padding: "80px 48px" }}>
        <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", marginBottom: 40 }}>
          Gallery View
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {projects.map((project) => (
            <div
              key={`thumb-${project.slug}`}
              className="works-reveal"
              data-cursor="VIEW PROJECT"
              onClick={() => navigate(`/works/${project.slug}`)}
              style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#0d0d0d" }}
            >
              <img
                src={project.cardImage}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.6, transition: "opacity 0.5s ease, transform 0.6s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.85"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.6"; (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 28, left: 32 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: project.accentColor, textTransform: "uppercase", marginBottom: 8 }}>
                  {project.category} · {project.year}
                </p>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(16px, 1.8vw, 26px)", fontWeight: 400, color: "#EAE5D9" }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
