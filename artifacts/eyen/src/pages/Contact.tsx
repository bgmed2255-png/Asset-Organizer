import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EyeLogo from "@/components/EyeLogo";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>(".contact-reveal").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.08 }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#101010", paddingTop: 64, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 64px)" }}>
        {/* Left — main contact */}
        <div style={{ padding: "100px 48px", borderRight: "1px solid rgba(234,229,217,0.07)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p className="contact-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 32 }}>
              New Projects
            </p>
            <h1 className="contact-reveal" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: "#EAE5D9", lineHeight: 1.05, letterSpacing: "0.01em", marginBottom: 40 }}>
              Let's engineer something unforgettable.
            </h1>
            <p className="contact-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.9, color: "rgba(234,229,217,0.5)", letterSpacing: "0.03em", maxWidth: 380, marginBottom: 48 }}>
              We work with a limited number of clients each year to ensure the depth each brand deserves. Tell us about your project.
            </p>

            <div className="contact-reveal" style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
                New Business
              </p>
              <a
                href="mailto:hello@eyen.studio"
                data-cursor="WRITE"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(17px, 1.8vw, 24px)", color: "#EAE5D9", textDecoration: "none", borderBottom: "1px solid rgba(234,229,217,0.2)", paddingBottom: 4, transition: "border-color 0.3s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(234,229,217,0.6)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(234,229,217,0.2)")}
              >
                hello@eyen.studio
              </a>
            </div>

            <div className="contact-reveal">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.2em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
                Press & Partnerships
              </p>
              <a
                href="mailto:press@eyen.studio"
                data-cursor="WRITE"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(17px, 1.8vw, 24px)", color: "#EAE5D9", textDecoration: "none", borderBottom: "1px solid rgba(234,229,217,0.2)", paddingBottom: 4, transition: "border-color 0.3s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(234,229,217,0.6)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(234,229,217,0.2)")}
              >
                press@eyen.studio
              </a>
            </div>
          </div>

          <div className="contact-reveal">
            <EyeLogo size={36} color="#EAE5D9" opacity={0.12} />
          </div>
        </div>

        {/* Right — info */}
        <div style={{ padding: "100px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p className="contact-reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.35)", textTransform: "uppercase", marginBottom: 48 }}>
              Where to Find Us
            </p>

            {[
              { city: "London", address: "The Collective, Shoreditch, E2" },
              { city: "New York", address: "The Greenwich Hotel District, SoHo" },
              { city: "Dubai", address: "DIFC, The Gate Building" },
            ].map((office) => (
              <div key={office.city} className="contact-reveal" style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid rgba(234,229,217,0.07)" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(16px, 1.5vw, 22px)", color: "#EAE5D9", marginBottom: 8, lineHeight: 1.2 }}>
                  {office.city}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(234,229,217,0.35)", letterSpacing: "0.03em", lineHeight: 1.75 }}>
                  {office.address}
                </p>
              </div>
            ))}
          </div>

          <div className="contact-reveal">
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 9, letterSpacing: "0.25em", color: "rgba(234,229,217,0.25)", textTransform: "uppercase", marginBottom: 20 }}>
              Social
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Instagram", "LinkedIn", "Behance"].map((s) => (
                <a
                  key={s}
                  href="#"
                  data-cursor="OPEN"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.15em", color: "rgba(234,229,217,0.3)", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s ease", display: "flex", alignItems: "center", gap: 12 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(234,229,217,0.7)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(234,229,217,0.3)")}
                >
                  <span style={{ width: 16, height: 1, backgroundColor: "currentColor", display: "inline-block" }} />
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "24px 48px", borderTop: "1px solid rgba(234,229,217,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(234,229,217,0.2)", letterSpacing: "0.2em" }}>EYEN</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.2em", color: "rgba(234,229,217,0.15)", textTransform: "uppercase" }}>
          © 2023–2026 EYEN Studio
        </p>
      </div>

    </div>
  );
}
