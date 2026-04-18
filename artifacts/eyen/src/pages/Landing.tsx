import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EyeLogo from "@/components/EyeLogo";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const BEIGE = "#EAE5D9";
const BLACK = "#101010";


export default function Landing() {
  const [, navigate] = useLocation();

  const heroRef        = useRef<HTMLDivElement>(null);
  const heroImgRef     = useRef<HTMLDivElement>(null);
  const lettersRef     = useRef<HTMLDivElement>(null);
  const scrollHintRef  = useRef<HTMLDivElement>(null);

  const statRef        = useRef<HTMLElement>(null);
  const stat2Ref       = useRef<HTMLElement>(null);
  const stat3Ref       = useRef<HTMLElement>(null);
  const stat4Ref       = useRef<HTMLElement>(null);

  const philosophyRef  = useRef<HTMLDivElement>(null);
  const philoImgRef    = useRef<HTMLDivElement>(null);
  const philoTextRef   = useRef<HTMLDivElement>(null);

  const marqRef        = useRef<HTMLDivElement>(null);
  const worksRef       = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);
  const eyeCtaRef      = useRef<HTMLDivElement>(null);

  const pinRef         = useRef<HTMLDivElement>(null);
  const wordsContRef   = useRef<HTMLDivElement>(null);

  const manifestoRef  = useRef<HTMLDivElement>(null);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. HERO ENTRANCE ─────────────────────────────────────
      const letters = lettersRef.current?.querySelectorAll(".hero-letter");
      const tl = gsap.timeline({ delay: 0.2 });

      // Image: scale from 1.08 to 1 as it enters
      tl.fromTo(heroImgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }, 0
      );

      if (letters) {
        tl.fromTo(Array.from(letters),
          { y: "108%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.07 }, 0.3
        );
      }

      tl.fromTo(scrollHintRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.4
      );

      // Scroll hint bounce
      gsap.to(scrollHintRef.current?.querySelector(".scroll-arrow") ?? null, {
        y: 6, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.2,
      });

      // ── 2. HERO PARALLAX ─────────────────────────────────────
      gsap.to(heroImgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      // Hero letters fade out as you scroll away
      gsap.to(lettersRef.current, {
        opacity: 0, y: -60,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "30% top", end: "80% top", scrub: 1 },
      });

      // ── 3. PINNED STATEMENT ───────────────────────────────────
      // Reveal words one by one while pinned
      const wordEls = wordsContRef.current?.querySelectorAll(".pin-word");
      if (wordEls && wordEls.length) {
        // Set all words dim initially
        gsap.set(wordEls, { opacity: 0.08, color: BEIGE });
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: `+=${wordEls.length * 120}`,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
          },
        });

        wordEls.forEach((w, i) => {
          pinTl.to(w, { opacity: 1, duration: 0.4, ease: "power1.out" }, i * 0.4);
        });
      }

      // ── 4. PHILOSOPHY SECTION ─────────────────────────────────
      // Image parallax
      gsap.fromTo(philoImgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8, ease: "none",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top bottom", end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Text lines reveal
      const textLines = philoTextRef.current?.querySelectorAll(".text-line");
      if (textLines) {
        gsap.fromTo(Array.from(textLines),
          { clipPath: "inset(0 0 100% 0)", y: 20, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1,
            duration: 1, ease: "power4.out", stagger: 0.14,
            scrollTrigger: {
              trigger: philoTextRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // ── 5. STATS COUNT-UP ─────────────────────────────────────
      [[statRef, 8], [stat2Ref, 140], [stat3Ref, 12], [stat4Ref, 3]].forEach(([ref, target]) => {
        const el = (ref as React.RefObject<HTMLElement>).current;
        if (!el) return;
        const numEl = el.querySelector(".stat-num");
        if (!numEl) return;
        const obj = { val: 0 };
        gsap.fromTo(obj, { val: 0 }, {
          val: target as number,
          duration: 2.2,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate: () => { numEl.textContent = `${Math.round(obj.val)}${(target as number) >= 100 ? "+" : (target as number) >= 10 ? "+" : "+"}`; },
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // ── 6. WORKS CARDS ────────────────────────────────────────
      const cards = worksRef.current?.querySelectorAll(".work-card");
      if (cards) {
        gsap.fromTo(Array.from(cards),
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 1.1, ease: "power3.out", stagger: 0.14,
            scrollTrigger: { trigger: worksRef.current, start: "top 80%" },
          }
        );
      }

      // ── 7. MANIFESTO LINES ───────────────────────────────────
      const manifestoLines = manifestoRef.current?.querySelectorAll(".manifesto-line");
      if (manifestoLines) {
        gsap.fromTo(Array.from(manifestoLines),
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0,
            duration: 1.1, ease: "power3.out", stagger: 0.18,
            scrollTrigger: { trigger: manifestoRef.current, start: "top 82%" },
          }
        );
      }

      // ── 8. CTA SECTION ────────────────────────────────────────
      const ctaLines = ctaRef.current?.querySelectorAll(".cta-line");
      if (ctaLines) {
        gsap.fromTo(Array.from(ctaLines),
          { clipPath: "inset(0 0 100% 0)", y: 30 },
          {
            clipPath: "inset(0 0 0% 0)", y: 0,
            duration: 1.2, ease: "power4.out", stagger: 0.18,
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(eyeCtaRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 75%" },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: BLACK, position: "relative" }}>
      {/* FILM GRAIN */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px", opacity: 0.45, mixBlendMode: "overlay",
      }} />

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
        {/* Background image */}
        <div ref={heroImgRef} style={{ position: "absolute", inset: 0, opacity: 0 }}>
          <img
            src="/images/hero-crowd.png"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Layered overlays: heavy bottom, lighter top */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(16,16,16,0.55) 0%, rgba(16,16,16,0.2) 40%, rgba(16,16,16,0.85) 80%, rgba(16,16,16,0.97) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(16,16,16,0.3) 0%, transparent 50%, rgba(16,16,16,0.3) 100%)" }} />
        </div>

        {/* Corner metadata */}
        <div style={{ position: "absolute", top: 88, right: 28, zIndex: 2, textAlign: "right" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.24em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase", lineHeight: 2 }}>
            Branding Agency<br />Est. 2023
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 96, left: 28, zIndex: 2 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.24em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase" }}>
            London · New York · Dubai
          </p>
        </div>

        {/* WORDMARK */}
        <div ref={lettersRef} style={{ position: "absolute", inset: "auto 0 0 0", zIndex: 2, display: "flex", alignItems: "flex-end", paddingBottom: "clamp(6px, 1.2vh, 14px)" }}>
          {["E","Y","E","N"].map((char, i) => (
            <div key={i} className="hero-letter" style={{
              flex: "1 0 0",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontWeight: 400,
              fontSize: "min(24.5vw, 52vh)",
              color: BEIGE,
              textAlign: "center",
              lineHeight: 0.85,
              opacity: 0,
              userSelect: "none",
            }}>{char}</div>
          ))}
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 7, letterSpacing: "0.35em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase" }}>Scroll</p>
          <svg className="scroll-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 7l5 5 5-5" stroke="rgba(234,229,217,0.3)" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — PINNED STATEMENT
      ═══════════════════════════════════════════════════ */}
      <section ref={pinRef} style={{ backgroundColor: BLACK, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "0 clamp(28px, 6vw, 100px)" }}>
        <div ref={wordsContRef} style={{ maxWidth: 1100, width: "100%" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", marginBottom: 40 }}>
            Our philosophy
          </p>
          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 6.5vw, 96px)", fontWeight: 400, lineHeight: 1.12, color: BEIGE, display: "flex", flexWrap: "wrap", gap: "0.15em 0.3em" }}>
            {["We", "don't", "build", "brands.", "We", "engineer", "belief."].map((w, i) => (
              <span key={i} className="pin-word" style={{ display: "inline-block", opacity: 0.08, willChange: "opacity" }}>{w}</span>
            ))}
          </div>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(14px, 1.6vw, 22px)", color: "rgba(234,229,217,0.32)", marginTop: 56, lineHeight: 1.7 }}>
            The space between a product and a movement is a brand.<br />
            We occupy that space with deliberate intention.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — PHILOSOPHY / IMAGE SPLIT
      ═══════════════════════════════════════════════════ */}
      <section ref={philosophyRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", overflow: "hidden" }}>
        {/* Left: image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div ref={philoImgRef} style={{ position: "absolute", inset: "-15% 0", willChange: "transform" }}>
            <img src="/images/hero-crowd.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #101010 100%)" }} />
          </div>
        </div>

        {/* Right: text */}
        <div ref={philoTextRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px clamp(40px, 5vw, 90px) 100px clamp(40px, 5vw, 72px)" }}>
          <div className="text-line" style={{ overflow: "hidden", marginBottom: 24 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(234,229,217,0.22)", textTransform: "uppercase" }}>
              The solitary figure
            </p>
          </div>
          <div className="text-line" style={{ overflow: "hidden", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 4vw, 62px)", fontWeight: 400, color: BEIGE, lineHeight: 1.15, margin: 0 }}>
              Every great brand<br />is this man.
            </h2>
          </div>
          <div className="text-line" style={{ overflow: "hidden", marginBottom: 28 }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(15px, 1.5vw, 20px)", color: "rgba(234,229,217,0.5)", lineHeight: 1.75, margin: 0 }}>
              Completely still. Absolutely clear.<br />
              Surrounded by noise that cannot touch it.
            </p>
          </div>
          <div className="text-line" style={{ overflow: "hidden" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(10px, 0.85vw, 13px)", lineHeight: 1.9, color: "rgba(234,229,217,0.3)", margin: 0, letterSpacing: "0.02em", maxWidth: 420 }}>
              We study the psychology of belief before we design a single mark.
              The logo is the last thing we create. The first is the story
              that makes your customer feel like they found something
              they always knew existed.
            </p>
          </div>
          <div className="text-line" style={{ overflow: "hidden", marginTop: 52 }}>
            <button onClick={() => navigate("/studio")} style={{ background: "none", border: "1px solid rgba(234,229,217,0.2)", padding: "14px 32px", fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(234,229,217,0.55)", textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s ease" }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "rgba(234,229,217,0.6)"; (e.target as HTMLElement).style.color = BEIGE; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(234,229,217,0.2)"; (e.target as HTMLElement).style.color = "rgba(234,229,217,0.55)"; }}
            >
              Our Process →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — STATS
      ═══════════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(234,229,217,0.08)", borderBottom: "1px solid rgba(234,229,217,0.08)", backgroundColor: BLACK }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { ref: statRef,   num: "8+",   label: "Years of practice",       sub: "Since 2017" },
            { ref: stat2Ref,  num: "140+",  label: "Brands engineered",       sub: "Across 12 markets" },
            { ref: stat3Ref,  num: "12+",   label: "Countries active",        sub: "Three continents" },
            { ref: stat4Ref,  num: "3+",    label: "Award categories won",    sub: "D&AD, Cannes, Clio" },
          ].map(({ ref, num, label, sub }, i) => (
            <div key={i} ref={ref as any} style={{
              padding: "clamp(40px, 6vh, 80px) clamp(28px, 4vw, 60px)",
              borderLeft: i > 0 ? "1px solid rgba(234,229,217,0.07)" : "none",
              opacity: 0,
            }}>
              <div className="stat-num" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 400, color: BEIGE, lineHeight: 1, marginBottom: 16 }}>
                {num}
              </div>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(13px, 1.2vw, 18px)", color: "rgba(234,229,217,0.5)", lineHeight: 1.4, marginBottom: 8 }}>{label}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase" }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — MARQUEE STRIP
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#0c0c0c", padding: "22px 0", overflow: "hidden", borderBottom: "1px solid rgba(234,229,217,0.06)" }}>
        <div ref={marqRef} style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
          {[0, 1].map(rep => (
            <div key={rep} style={{ display: "flex", gap: 0, animation: "marquee 28s linear infinite", flexShrink: 0 }}>
              {["Brand Strategy", "Visual Identity", "Digital Experience", "Campaign Direction", "Art Direction", "Typography Systems", "Brand Architecture"].map((item, j) => (
                <span key={j} style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 24px)", color: "rgba(234,229,217,0.22)", paddingRight: "clamp(32px, 4vw, 64px)" }}>
                  {item} <span style={{ color: "rgba(234,229,217,0.1)", fontStyle: "normal", fontSize: "0.6em", verticalAlign: "middle" }}>◆</span>&nbsp;&nbsp;
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — SELECTED WORKS
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(80px, 12vh, 160px) clamp(28px, 5vw, 80px)", backgroundColor: BLACK }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 64 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(234,229,217,0.22)", textTransform: "uppercase", marginBottom: 14 }}>Selected Works</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 60px)", fontWeight: 400, color: BEIGE, margin: 0, lineHeight: 1 }}>
              What we've made
            </h2>
          </div>
          <button onClick={() => navigate("/works")} style={{ background: "none", border: "none", fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 4, transition: "color 0.3s" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(234,229,217,0.75)"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(234,229,217,0.35)"}
          >
            View all →
          </button>
        </div>

        <div ref={worksRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 3vw, 48px)" }}>
          {projects.slice(0, 3).map((project, i) => (
            <div key={project.slug} className="work-card" style={{ opacity: 0 }}>
              <button onClick={() => navigate(`/works/${project.slug}`)}
                onMouseEnter={() => setHoveredWork(i)}
                onMouseLeave={() => setHoveredWork(null)}
                style={{
                  display: "block", width: "100%", background: "none", border: "none",
                  cursor: "none", textAlign: "left",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5", marginBottom: 20 }}>
                  <img src={project.cardImage} alt={project.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transform: hoveredWork === i ? "scale(1.04)" : "scale(1)",
                      transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
                      filter: hoveredWork === i ? "brightness(0.85)" : "brightness(0.7) saturate(0.3)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 16, right: 16, width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(234,229,217,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
                    transform: hoveredWork === i ? "scale(1)" : "scale(0)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M8 2H12V6" stroke={BEIGE} strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>

                {/* Meta */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.22em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase" }}>{project.category}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase" }}>{project.year}</p>
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(18px, 1.8vw, 26px)", fontWeight: 400, color: hoveredWork === i ? BEIGE : "rgba(234,229,217,0.75)", margin: "0 0 6px", transition: "color 0.4s ease", lineHeight: 1.2 }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(12px, 1.1vw, 16px)", color: "rgba(234,229,217,0.3)", margin: 0, lineHeight: 1.5 }}>
                  {project.tagline}
                </p>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — BRAND CONCEPT MANIFESTO
      ═══════════════════════════════════════════════════ */}
      <section ref={manifestoRef} style={{ backgroundColor: "#0c0c0c", padding: "clamp(80px, 14vh, 180px) clamp(28px, 8vw, 140px)", borderTop: "1px solid rgba(234,229,217,0.06)" }}>
        <div style={{ maxWidth: 900 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", marginBottom: 48 }}>
            Why EYEN
          </p>
          {[
            "Most agencies build brands that look good in award submissions.",
            "We build brands that change how people see themselves.",
            "Because the highest-performing brands are not aesthetic decisions —",
            "they are belief systems, carefully engineered.",
          ].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", marginBottom: i === 2 ? 0 : "clamp(12px, 1.5vh, 20px)" }}>
              <p className="manifesto-line" style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(18px, 2.2vw, 34px)",
                fontWeight: 400,
                color: i < 2 ? "rgba(234,229,217,0.85)" : "rgba(234,229,217,0.38)",
                lineHeight: 1.45,
                margin: 0,
                fontStyle: i >= 2 ? "italic" : "normal",
              }}>{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8 — CTA
      ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: BLACK, padding: "clamp(100px, 18vh, 240px) clamp(28px, 6vw, 100px)", borderTop: "1px solid rgba(234,229,217,0.06)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div ref={eyeCtaRef} style={{ marginBottom: 48, opacity: 0 }}>
          <EyeLogo size={40} color={BEIGE} opacity={0.35} />
        </div>

        <div ref={ctaRef} style={{ overflow: "hidden", marginBottom: 0 }}>
          <h2 className="cta-line" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(38px, 7vw, 110px)", fontWeight: 400, color: BEIGE, margin: "0 0 20px", lineHeight: 1, letterSpacing: "-0.01em" }}>
            Begin something
          </h2>
          <h2 className="cta-line" style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "clamp(38px, 7vw, 110px)", fontWeight: 400, color: "rgba(234,229,217,0.35)", margin: "0 0 60px", lineHeight: 1, letterSpacing: "-0.01em" }}>
            that matters.
          </h2>
          <div className="cta-line" style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button onClick={() => navigate("/contact")} style={{
              background: BEIGE, border: "none", padding: "18px 48px",
              fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.3em",
              color: BLACK, textTransform: "uppercase", cursor: "pointer",
              transition: "opacity 0.4s ease",
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.8"}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}
            >
              Start a Project
            </button>
            <button onClick={() => navigate("/works")} style={{
              background: "none", border: "1px solid rgba(234,229,217,0.2)", padding: "18px 48px",
              fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.3em",
              color: "rgba(234,229,217,0.45)", textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.4s ease",
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "rgba(234,229,217,0.5)"; (e.target as HTMLElement).style.color = BEIGE; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(234,229,217,0.2)"; (e.target as HTMLElement).style.color = "rgba(234,229,217,0.45)"; }}
            >
              See Our Work
            </button>
          </div>
        </div>

        <div style={{ marginTop: 100, width: "100%", borderTop: "1px solid rgba(234,229,217,0.07)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(234,229,217,0.15)", textTransform: "uppercase" }}>
            © EYEN Studio 2024
          </span>
          <div style={{ display: "flex", gap: 32 }}>
            {["Instagram", "LinkedIn", "Twitter"].map(s => (
              <a key={s} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(234,229,217,0.2)", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(234,229,217,0.6)"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(234,229,217,0.2)"}
              >{s}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
