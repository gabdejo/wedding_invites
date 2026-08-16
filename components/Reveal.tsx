"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  durationMs?: number;
  /** Delays the fade-in transition itself, counted from when this element enters the viewport. */
  delayMs?: number;
  /** Stays hidden even after entering the viewport until this turns true. Default true (no gate). */
  gate?: boolean;
  /** Fires once, the first time this element scrolls into view. */
  onIntersect?: () => void;
};

export default function Reveal({
  children,
  className = "",
  durationMs = 700,
  delayMs = 0,
  gate = true,
  onIntersect,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          onIntersect?.();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = intersected && gate;

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${durationMs}ms`, transitionDelay: `${delayMs}ms` }}
      className={`transition-all ease-out motion-reduce:transition-none motion-reduce:!opacity-100 motion-reduce:!translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
