"use client";

import { useEffect, useRef } from "react";

export default function StaggerGroup({
  children,
  itemSelector,
  className = "",
  staggerMs = 130,
}: {
  children: React.ReactNode;
  itemSelector: string;
  className?: string;
  staggerMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>(itemSelector)
    );
    if (!items.length) return;

    function play() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      items.forEach((item, i) =>
        timeoutsRef.current.push(
          setTimeout(() => item.classList.add("in"), i * staggerMs)
        )
      );
    }
    function reset() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      items.forEach((item) => item.classList.remove("in"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else reset();
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [itemSelector, staggerMs]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
