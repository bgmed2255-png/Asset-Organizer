import { Switch, Route, useLocation } from "wouter";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Landing from "@/pages/Landing";
import Studio from "@/pages/Studio";
import Works from "@/pages/Works";
import WorkDetail from "@/pages/WorkDetail";
import Contact from "@/pages/Contact";

function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" }
    );
  }, [location]);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <>
      <SmoothScroller />
      <CustomCursor />
      <Navigation />
      <main>
        <PageTransition>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/studio" component={Studio} />
            <Route path="/works" component={Works} />
            <Route path="/works/:slug" component={WorkDetail} />
            <Route path="/contact" component={Contact} />
            <Route>
              <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#101010", paddingTop: 64 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 64, color: "#EAE5D9", marginBottom: 24 }}>404</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(234,229,217,0.4)", textTransform: "uppercase" }}>
                    Page not found
                  </p>
                </div>
              </div>
            </Route>
          </Switch>
        </PageTransition>
      </main>
    </>
  );
}

export default App;
