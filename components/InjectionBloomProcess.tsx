"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { idx: "01", title: "Site Clearing", desc: "Trim the slope to a stable, uniform profile and clear loose debris before survey work begins." },
  { idx: "02", title: "Resistivity Survey", desc: "Inject current through electrode pairs to map groundwater depth and subsurface stratigraphy, then mark injection points." },
  { idx: "03", title: "Grout Injection", desc: "40mm PVC pipes at 0.5–1m depth, 1m spacing; Vege-Grout applied at 3.7 L/m² by injection and surface spray." },
  { idx: "04", title: "COLUFNAS & Seeding", desc: "Coir erosion-control matting laid over the treated surface, then hydroseeded with seed, fertilizer, and mulch." },
  { idx: "05", title: "Lab Verification", desc: "Disturbed and undisturbed samples tested to BS 1377 for particle size, Atterberg limits, permeability, and shear strength." },
];

export default function InjectionBloomProcess() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const dotsWrapRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const dotsWrap = dotsWrapRef.current;
    if (!field || !dotsWrap) return;

    function buildDots() {
      const w = field!.clientWidth;
      const h = field!.clientHeight;
      const cols = 14;
      const rows = 4;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const d = document.createElement("div");
          d.className = "bloom-dot";
          const x = (c + 0.5) * (w / cols);
          const y = (r + 0.5) * (h / rows);
          d.style.left = `${x - 2.5}px`;
          d.style.top = `${y - 2.5}px`;
          d.dataset.cx = String(c);
          d.dataset.cy = String(r);
          dotsWrap!.appendChild(d);
        }
      }
    }

    function play() {
      if (!builtRef.current) {
        buildDots();
        builtRef.current = true;
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      const dots = dotsWrap!.querySelectorAll<HTMLDivElement>(".bloom-dot");
      const originC = 0;
      const originR = 1.5;
      dots.forEach((d) => {
        const dist = Math.hypot(
          Number(d.dataset.cx) - originC,
          Number(d.dataset.cy) - originR
        );
        timeoutsRef.current.push(
          setTimeout(() => d.classList.add("bloomed"), dist * 70)
        );
      });
      const steps = field!.querySelectorAll<HTMLDivElement>(".step");
      steps.forEach((s, i) =>
        timeoutsRef.current.push(
          setTimeout(() => s.classList.add("in"), 120 + i * 160)
        )
      );
    }

    function reset() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (builtRef.current) {
        dotsWrap!
          .querySelectorAll<HTMLDivElement>(".bloom-dot")
          .forEach((d) => d.classList.remove("bloomed"));
      }
      field!.querySelectorAll<HTMLDivElement>(".step").forEach((s) => s.classList.remove("in"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else reset();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(field);

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bloom-field" ref={fieldRef}>
      <div className="bloom-dots" ref={dotsWrapRef}></div>
      <div className="process-list">
        {STEPS.map((s) => (
          <div className="step" key={s.idx}>
            <span className="idx">{s.idx}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
