import React, { useRef, useState } from "react";
import ScrollFadeIn from "~/components/ScrollFadeIn";
import Button from "~/hkit/Button";

type HeroBannerProps = {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  body?: string;
  actions?: React.ReactNode;
  videoSrc: string;
  poster?: string;
};

export default function HeroBanner({ eyebrow, title, accent, body, actions, videoSrc, poster }: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
    setPaused(video.paused);
  };

  const lines = [
    eyebrow && <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[var(--red-500)]">{eyebrow}</p>,
    <h1 className="title-1">
      {title}
      {accent && (
        <>
          <br />
          <span className="text-[var(--red-500)]">{accent}</span>
        </>
      )}
    </h1>,
    body && <p className="text-lg md:text-xl text-neutral-200 max-w-xl">{body}</p>,
    actions && <div className="flex flex-wrap justify-center lg:justify-start gap-4">{actions}</div>,
  ].filter(Boolean);

  return (
    <section className="relative h-screen min-h-[600px] w-screen shrink-0 flex items-end lg:items-center overflow-hidden pb-12 lg:pb-0">
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" poster={poster} className="absolute inset-0 w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[var(--neutral-900)] via-[var(--neutral-900)]/60 to-transparent" />
      <div className="relative w-full max-w-6xl mx-auto px-4 lg:px-8 flex flex-col gap-4 md:gap-6 items-center lg:items-start text-center lg:text-left">
        {lines.map((line, i) => (
          <ScrollFadeIn key={i} delay={i * 0.15}>
            {line}
          </ScrollFadeIn>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 opacity-60 hover:opacity-100 transition-opacity">
        <Button variant="tertiary" size="sm" label={paused ? "Play video" : "Pause video"} onClick={togglePlay} />
      </div>
    </section>
  );
}
