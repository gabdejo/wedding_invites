"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  color: string;
  lightColor: string;
  staggerMs?: number;
  durationMs?: number;
};

// Fades words in left-to-right (reading order), lightColor -> color.
export default function ReadInText({
  text,
  className = "",
  color,
  lightColor,
  staggerMs = 45,
  durationMs = 500,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="motion-reduce:!opacity-100"
          style={{
            opacity: visible ? 1 : 0,
            color: visible ? color : lightColor,
            transition: `opacity ${durationMs}ms ease-out, color ${durationMs}ms ease-out`,
            transitionDelay: `${i * staggerMs}ms`,
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
