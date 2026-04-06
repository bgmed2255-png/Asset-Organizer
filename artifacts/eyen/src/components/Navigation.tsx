import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import EyeLogo from "./EyeLogo";

const pages = [
  { label: "Studio", href: "/studio" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [location, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLanding = location === "/";
  const activeLabel = pages.find((p) => location.startsWith(p.href))?.label ?? null;

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -8, duration: 0.25, ease: "power3.in" });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrolled ? "1px solid rgba(234,229,217,0.06)" : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(16,16,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "border-color 0.5s ease, background-color 0.5s ease, backdrop-filter 0.5s ease",
          opacity: 0,
        }}
      >
        {/* Logo / Home */}
        <button
          data-cursor="HOME"
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <EyeLogo size={18} color="#EAE5D9" opacity={0.9} />
          <span
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "#EAE5D9",
              lineHeight: 1,
            }}
          >
            EYEN
          </span>
        </button>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Desktop nav links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {pages.map((page) => {
              const isActive = location.startsWith(page.href);
              return (
                <button
                  key={page.label}
                  data-cursor="GO"
                  onClick={() => navigate(page.href)}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 9,
                    fontWeight: 400,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "#EAE5D9" : "rgba(234,229,217,0.45)",
                    transition: "color 0.3s ease",
                    padding: 0,
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EAE5D9"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "#EAE5D9" : "rgba(234,229,217,0.45)"; }}
                >
                  {page.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 1,
                        backgroundColor: "rgba(234,229,217,0.4)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay (mobile / hamburger) */}
    </>
  );
}
