"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current?.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  }, []);

  // Autoplay is blocked until the browser sees user interaction — catch the
  // first tap/scroll/keypress anywhere on the page and retry once. Only
  // fires once ever, so a later manual pause (via the button) isn't undone
  // by the guest's next scroll.
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    function tryPlay() {
      audioRef.current?.play().then(() => setPlaying(true), () => {});
      events.forEach((e) => window.removeEventListener(e, tryPlay));
    }
    events.forEach((e) => window.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, tryPlay));
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/soledad_el_mar_full.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#5D7B9F] shadow-lg ring-1 ring-black/10 transition-colors hover:bg-[#5D7B9F] hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {!playing && <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" />}
        </svg>
      </button>
    </>
  );
}
