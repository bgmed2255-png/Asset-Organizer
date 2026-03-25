import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const currentLabelRef = useRef("");
  const isExpandedRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);
      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const setLabel = (text: string) => {
      if (currentLabelRef.current === text) return;
      currentLabelRef.current = text;
      label.textContent = text;
    };

    const expand = (text: string) => {
      if (isExpandedRef.current && currentLabelRef.current === text) return;
      isExpandedRef.current = true;
      setLabel(text);
      gsap.to(dot, { width: 80, height: 80, duration: 0.35, ease: "power3.out" });
      gsap.to(label, { opacity: 1, duration: 0.25, delay: 0.1 });
    };

    const collapse = () => {
      if (!isExpandedRef.current) return;
      isExpandedRef.current = false;
      gsap.to(dot, { width: 12, height: 12, duration: 0.35, ease: "power3.out" });
      gsap.to(label, { opacity: 0, duration: 0.2 });
      setTimeout(() => setLabel(""), 300);
    };

    const onMouseEnterClickable = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-cursor]");
      if (el) {
        const cursorText = el.getAttribute("data-cursor") || "VIEW";
        expand(cursorText);
      }
    };

    const onMouseLeaveClickable = () => {
      collapse();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseEnterClickable);
    document.addEventListener("mouseout", onMouseLeaveClickable);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseEnterClickable);
      document.removeEventListener("mouseout", onMouseLeaveClickable);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#EAE5D9",
        zIndex: 99999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontSize: 9,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: "#101010",
          textTransform: "uppercase",
          opacity: 0,
          userSelect: "none",
          lineHeight: 1,
          textAlign: "center",
          padding: "0 4px",
        }}
      />
    </div>
  );
}
