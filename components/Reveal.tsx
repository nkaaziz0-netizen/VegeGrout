"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error — dynamic tag, ref typing is intentionally loose here
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
