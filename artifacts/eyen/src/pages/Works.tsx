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
  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const previewPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".works-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Floating preview follows cursor with lerp
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      previewPos.current.x += (mousePos.current.x - previewPos.current.x) * 0.1;
      previewPos.current.y += (mousePos.current.y - previewPos.current.y) * 0.1;
      if (previewRef.current) {
        previewRef.current.style.transform =
          `translate(${previewPos.current.x + 28}px, ${previewPos.current.y - 100}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#101010", paddingTop: 64, minHeight: "100vh" }}>

      {/* Floating image preview */}
      <div
        ref={previewRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 280,
          height: 175,
          pointerEvents: "none",
          zIndex: 500,
          overflow: "hidden",
          opacity: hoveredIndex !== null ? 1 : 0,
          transition: "opacity 0.4s ease",
          willChange: "transform",
          background: "#0a0a0a",
        }}
      >
        {hoveredIndex !== null && (
          <>
            <img
              src={projects[hoveredIndex]?.cardImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.85 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)" }} />
          </>
        )}
      </div>

      {/* Header */}
      <div style={{ padding: "80px 48px 60px", borderBottom: "1px solid rgba(234,229,217,0.07)" }}>
        <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 20 }}>
          Selected Works
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 40 }}>
          <h1 className="works-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(52px, 8vw, 110px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 0.92, letterSpacing: "-0.01em" }}>
            Work
          </h1>
          <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(234,229,217,0.38)", letterSpacing: "0.04em", maxWidth: 300, textAlign: "right", lineHeight: 1.8, paddingBottom: 8 }}>
            Each brief we accept is a privilege.<br />Here is how we've honoured them.
          </p>
        </div>
      </div>

      {/* Projects list */}
      <div>
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="works-reveal"
            data-cursor="VIEW"
            onClick={() => navigate(`/works/${project.slug}`)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr auto",
              alignItems: "center",
              padding: "0 48px",
              borderBottom: "1px solid rgba(234,229,217,0.07)",
              transition: "background 0.45s ease",
              backgroundColor: hoveredIndex === i ? "rgba(234,229,217,0.025)" : "transparent",
              gap: 32,
            }}
          >
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 13, color: "rgba(234,229,217,0.15)", paddingTop: 40, paddingBottom: 40, alignSelf: "flex-start" }}>
              {String(i + 1).padStart(2, "0")}
            </span>

            <div style={{ paddingTop: 40, paddingBottom: 40 }}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(22px, 3vw, 44px)",
                  fontWeight: 400,
                  color: "#EAE5D9",
                  marginBottom: 10,
                  transition: "letter-spacing 0.4s ease",
                  letterSpacing: hoveredIndex === i ? "0.04em" : "0.01em",
                }}
              >
                {project.title}
              </h2>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: project.accentColor, textTransform: "uppercase" }}>
                  {project.category}
                </span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(234,229,217,0.15)" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase" }}>
                  {project.year}
                </span>
              </div>
            </div>

            <div
              style={{
                width: 40,
                height: 40,
                border: "1px solid rgba(234,229,217,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hoveredIndex === i ? "translateX(4px) rotate(0deg)" : "translateX(0) rotate(0deg)",
                transition: "transform 0.35s ease, background 0.3s ease, border-color 0.3s ease",
                backgroundColor: hoveredIndex === i ? "rgba(234,229,217,0.06)" : "transparent",
                borderColor: hoveredIndex === i ? "rgba(234,229,217,0.25)" : "rgba(234,229,217,0.12)",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M8 4L11 7L8 10" stroke="rgba(234,229,217,0.6)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        ))}
        <div style={{ borderBottom: "1px solid rgba(234,229,217,0.07)" }} />
      </div>

      {/* Gallery grid */}
      <div style={{ padding: "80px 48px 0" }}>
        <p className="works-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.18)", textTransform: "uppercase", marginBottom: 32 }}>
          Visual Index
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {projects.map((project) => (
            <div
              key={`thumb-${project.slug}`}
              className="works-reveal"
              data-cursor="VIEW"
              onClick={() => navigate(`/works/${project.slug}`)}
              style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#0d0d0d" }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) { img.style.opacity = "0.9"; img.style.transform = "scale(1.03)"; }
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) { img.style.opacity = "0.55"; img.style.transform = "scale(1)"; }
              }}
            >
              <img
                src={project.cardImage}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.55, transition: "opacity 0.5s ease, transform 0.6s ease" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 55%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 28, left: 32 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: project.accentColor, textTransform: "uppercase", marginBottom: 6 }}>
                  {project.category} · {project.year}
                </p>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(15px, 1.6vw, 24px)", fontWeight: 400, color: "#EAE5D9" }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bridge strip → Contact */}
      <div
        data-cursor="BEGIN"
        onClick={() => navigate("/contact")}
        style={{
          margin: "80px 48px 0",
          padding: "48px 40px",
          border: "1px solid rgba(234,229,217,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background 0.45s ease",
          marginBottom: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(234,229,217,0.025)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.22em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", marginBottom: 10 }}>
            Ready to begin?
          </p>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, color: "#EAE5D9" }}>
            Start a project with us →
          </p>
        </div>
        <svg width="48" height="2" viewBox="0 0 48 2" fill="none">
          <line x1="0" y1="1" x2="48" y2="1" stroke="rgba(234,229,217,0.15)" strokeWidth="1" />
        </svg>
      </div>

    </div>
  );
}
