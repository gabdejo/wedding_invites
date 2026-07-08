"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["photoCarousel"] };

const AUTOPLAY_PX_PER_SECOND = 50;//18;
const RESUME_DELAY_MS = 2500;

export default function PhotoCarouselSection({ content }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paused = useRef(false);
  const photos = content.photos;
  const loopedPhotos = [...photos, ...photos, ...photos];

  const wrap = (el: HTMLDivElement) => {
    const oneSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft < oneSetWidth * 0.5) {
      el.scrollLeft += oneSetWidth;
    } else if (el.scrollLeft > oneSetWidth * 1.5) {
      el.scrollLeft -= oneSetWidth;
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
    let position = el.scrollLeft;

    let frameId: number;
    let lastTime: number | null = null;
    let wasPaused = false;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;
      if (!paused.current) {
        if (wasPaused) position = el.scrollLeft;
        el.style.scrollSnapType = "none";
        position += (AUTOPLAY_PX_PER_SECOND * delta) / 1000;
        const oneSetWidth = el.scrollWidth / 3;
        if (position < oneSetWidth * 0.5) position += oneSetWidth;
        else if (position > oneSetWidth * 1.5) position -= oneSetWidth;
        el.scrollLeft = position;
      }
      wasPaused = paused.current;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const pause = () => {
    paused.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    const el = scrollerRef.current;
    if (el) el.style.scrollSnapType = "x mandatory";
  };

  const scheduleResume = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      paused.current = false;
    }, RESUME_DELAY_MS);
  };

  const handleScroll = () => {
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      wrap(el);
    }, 150);
  };

  return (
    <section className="bg-[#faf8f4] py-6" id="photo-carousel">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onPointerDown={pause}
        onPointerUp={scheduleResume}
        onPointerCancel={scheduleResume}
        onWheel={() => {
          pause();
          scheduleResume();
        }}
        className="flex snap-x snap-mandatory gap-1 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {loopedPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative shrink-0 snap-center overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]"
            style={{
              width: "min(76vw, 320px)",
              aspectRatio: photo.orientation === "landscape" ? "4 / 3" : "3 / 4",
            }}
          >
            {photo.imagePath && (
              <Image src={photo.imagePath} alt={photo.alt} fill className="object-cover" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
