import React from "react";
import ScrollFadeIn from "~/components/ScrollFadeIn";

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
  const lines = [
    eyebrow && <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[var(--orange-500)]">{eyebrow}</p>,
    <h1 className="title-1">
      {title}
      {accent && (
        <>
          <br />
          <span className="text-[var(--orange-500)]">{accent}</span>
        </>
      )}
    </h1>,
    body && <p className="text-lg md:text-xl text-neutral-200 max-w-xl">{body}</p>,
    actions && <div className="flex flex-wrap justify-center lg:justify-start gap-4">{actions}</div>,
  ].filter(Boolean);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full flex items-end lg:items-center overflow-hidden pb-12 lg:pb-0">
      <video autoPlay loop muted playsInline preload="auto" poster={poster} className="absolute inset-0 w-full h-full object-cover">
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
    </section>
  );
}
