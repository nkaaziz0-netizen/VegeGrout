"use client";

import { useEffect, useRef } from "react";
import { openQuoteModal } from "@/lib/events";

export default function RootGrowthHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heroText = heroTextRef.current;
    if (!section || !heroText) return;

    const rootPaths = Array.from(
      section.querySelectorAll<SVGPathElement>(".hv-root")
    );
    const nodes = Array.from(
      section.querySelectorAll<SVGCircleElement>(".hv-node")
    );
    const tags = Array.from(
      section.querySelectorAll<HTMLDivElement>(".hv-tag")
    );

    function play() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      rootPaths.forEach((p, i) =>
        timeoutsRef.current.push(
          setTimeout(() => p.classList.add("grown"), 150 + i * 110)
        )
      );
      timeoutsRef.current.push(
        setTimeout(() => nodes.forEach((n) => n.classList.add("grown")), 1150)
      );
      tags.forEach((t, i) =>
        timeoutsRef.current.push(
          setTimeout(() => t.classList.add("show"), 1300 + i * 120)
        )
      );
      timeoutsRef.current.push(
        setTimeout(() => heroText!.classList.add("in"), 500)
      );
    }

    function reset() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      rootPaths.forEach((p) => p.classList.remove("grown"));
      nodes.forEach((n) => n.classList.remove("grown"));
      tags.forEach((t) => t.classList.remove("show"));
      heroText!.classList.remove("in");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else reset();
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="wrap hero-grid">
        <div className="hero-text" ref={heroTextRef}>
          <div className="eyebrow">Patented Bio-Grout · MY-174566-A</div>
          <h1>
            Turns loose soil into <em>living stone.</em>
          </h1>
          <p className="lede">
            A self-sustaining, maintenance-free ground stabilization system
            made from vegetable waste — engineered to stop slope failure and
            green the land at the same time.
          </p>
          <div className="hero-ctas">
            <a className="btn-primary" href="#" onClick={(e) => { e.preventDefault(); openQuoteModal(); }}>
              💬 Talk to our engineers
            </a>
            <a className="btn-ghost" href="/technology">
              See how it works
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="num">46%</div>
              <div className="lbl">lower capital cost vs conventional grout</div>
            </div>
            <div>
              <div className="num">~1000%</div>
              <div className="lbl">savings on annual maintenance</div>
            </div>
            <div>
              <div className="num">TRL 7</div>
              <div className="lbl">field-proven, revenue-generating</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <svg viewBox="0 0 500 440" preserveAspectRatio="xMidYMax slice">
            <path className="hv-root" d="M250,440 C245,360 200,330 150,290 C115,262 95,225 88,175" />
            <path className="hv-root" d="M250,440 C255,355 300,325 355,285 C390,258 415,220 425,170" />
            <path className="hv-root" d="M250,440 C248,345 225,305 195,265 C172,235 162,200 165,160" />
            <path className="hv-root" d="M250,440 C252,348 278,308 312,268 C338,237 350,202 344,162" />
            <path className="hv-root" d="M250,440 C246,375 195,360 130,345 C95,337 65,322 40,300" />
            <path className="hv-root" d="M250,440 C254,377 308,364 375,352 C412,345 448,330 470,308" />
            <circle className="hv-node" cx="88" cy="175" r="5" />
            <circle className="hv-node" cx="425" cy="170" r="5" />
            <circle className="hv-node" cx="165" cy="160" r="5" />
            <circle className="hv-node" cx="344" cy="162" r="5" />
          </svg>
          <div className="hv-tag" style={{ top: "14%" }}>SURFACE — COLUFNAS + SEED</div>
          <div className="hv-tag" style={{ top: "40%" }}>GROUT ZONE — 0.5–1.0m</div>
          <div className="hv-tag" style={{ top: "66%" }}>GROUNDWATER FLOW</div>
          <div className="hv-tag" style={{ top: "88%" }}>STABILIZED PROFILE</div>
        </div>
      </div>
    </section>
  );
}
