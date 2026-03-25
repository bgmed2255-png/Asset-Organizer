import { useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import EyeLogo from "@/components/EyeLogo";

gsap.registerPlugin(ScrollTrigger);

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const project = projects.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".detail-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      gsap.fromTo(".hero-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(".hero-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, [slug, project]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#101010", paddingTop: 64 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, color: "#EAE5D9" }}>Project not found</p>
          <button onClick={() => navigate("/works")} style={{ marginTop: 24, background: "none", border: "none", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(234,229,217,0.5)", textTransform: "uppercase" }}>
            ← Back to Works
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#101010", paddingTop: 64, minHeight: "100vh" }}>

      {/* Hero image */}
      <div
        ref={heroRef}
        style={{ height: "75vh", position: "relative", overflow: "hidden", background: project.bg }}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="hero-overlay"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(16,16,16,0.88) 0%, rgba(16,16,16,0.2) 100%)" }} />

        {/* Content */}
        <div className="hero-content" style={{ position: "absolute", bottom: 60, left: 48, right: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", opacity: 0 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: project.accentColor, textTransform: "uppercase", marginBottom: 16 }}>
              {project.category} · {project.year}
            </p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.05 }}>
              {project.title}
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap", maxWidth: 280 }}>
              {project.services.slice(0, 3).map((s) => (
                <span key={s} style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.18em", color: "rgba(234,229,217,0.4)", textTransform: "uppercase", border: "1px solid rgba(234,229,217,0.15)", padding: "5px 10px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back nav */}
      <div style={{ padding: "24px 48px", borderBottom: "1px solid rgba(234,229,217,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          data-cursor="BACK"
          onClick={() => navigate("/works")}
          style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 12, fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.4)", textTransform: "uppercase" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M6 5L3 8L6 11" stroke="rgba(234,229,217,0.4)" strokeWidth="1" />
          </svg>
          All Works
        </button>
        <EyeLogo size={20} color="#EAE5D9" opacity={0.15} />
      </div>

      {/* Main content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ padding: "80px 48px 80px", borderRight: "1px solid rgba(234,229,217,0.07)" }}>
          <p className="detail-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 24 }}>
            Overview
          </p>
          <p className="detail-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.6, letterSpacing: "0.01em" }}>
            {project.description}
          </p>

          <div style={{ marginTop: 60 }}>
            <p className="detail-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 24 }}>
              Services
            </p>
            {project.services.map((s) => (
              <div key={s} className="detail-reveal" style={{ padding: "14px 0", borderTop: "1px solid rgba(234,229,217,0.07)", fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.08em", color: "rgba(234,229,217,0.55)" }}>
                {s}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(234,229,217,0.07)" }} />
          </div>
        </div>

        <div style={{ padding: "80px 48px 80px" }}>
          <div className="detail-reveal" style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 20 }}>
              The Challenge
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.55)", letterSpacing: "0.03em" }}>
              {project.challenge}
            </p>
          </div>
          <div className="detail-reveal" style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 20 }}>
              The Solution
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.55)", letterSpacing: "0.03em" }}>
              {project.solution}
            </p>
          </div>
          <div className="detail-reveal">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 20 }}>
              The Result
            </p>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(16px, 1.8vw, 22px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.65, letterSpacing: "0.01em" }}>
              {project.result}
            </p>
          </div>
        </div>
      </div>

      {/* Project images */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, margin: "0 0 2px" }}>
        {project.detailImages.map((img, i) => (
          <div key={i} className="detail-reveal" style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
            <img src={img} alt={`${project.title} ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.8 }} />
          </div>
        ))}
      </div>

      {/* Next project */}
      <div style={{ borderTop: "1px solid rgba(234,229,217,0.07)" }}>
        {(() => {
          const currentIdx = projects.findIndex((p) => p.slug === slug);
          const next = projects[(currentIdx + 1) % projects.length];
          return (
            <div
              data-cursor="NEXT PROJECT"
              onClick={() => navigate(`/works/${next.slug}`)}
              style={{ padding: "60px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.4s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(234,229,217,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", marginBottom: 12 }}>
                  Next Project
                </p>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 400, color: "#EAE5D9" }}>
                  {next.title}
                </h3>
              </div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M12 24H36M28 16L36 24L28 32" stroke="rgba(234,229,217,0.4)" strokeWidth="1.5" />
              </svg>
            </div>
          );
        })()}
      </div>

    </div>
  );
}
