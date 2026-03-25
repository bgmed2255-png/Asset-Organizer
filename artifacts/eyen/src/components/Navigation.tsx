import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { label: "STUDIO", href: "#studio" },
  { label: "WORKS", href: "#works" },
  { label: "PHILOSOPHY", href: "#philosophy" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );

    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.style.borderBottomColor = "rgba(234,229,217,0.08)";
        nav.style.backdropFilter = "blur(12px)";
      } else {
        nav.style.borderBottomColor = "transparent";
        nav.style.backdropFilter = "none";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

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
          borderBottom: "1px solid transparent",
          transition: "border-color 0.4s ease, backdrop-filter 0.4s ease",
          opacity: 0,
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "#EAE5D9",
          }}
          data-cursor="HOME"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          EYEN
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              data-cursor="GO"
              onClick={() => scrollTo(item.href)}
              style={{
                background: "none",
                border: "none",
                color: "#EAE5D9",
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.7,
                transition: "opacity 0.3s ease",
                padding: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
