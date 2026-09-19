"use client";

import type { CSSProperties, ReactNode } from "react";
import styles from "./InfiniteMarquee.module.css";

type InfiniteMarqueeProps = {
  /* Plain strings for the kinetic type strip. */
  words?: string[];
  /* Pre-rendered nodes for the logo strip. Takes precedence over words. */
  items?: ReactNode[];
  ariaLabel: string;
  theme?: "dark" | "light";
  variant?: "text" | "logo";
  separator?: string;
  durationSeconds?: number;
  reverse?: boolean;
};

/*
  Real continuous CSS-driven marquee (not scroll-linked parallax).
  Content is duplicated once so the track can loop seamlessly at -50%.
*/
export default function InfiniteMarquee({
  words,
  items,
  ariaLabel,
  theme = "dark",
  variant = "text",
  separator,
  durationSeconds = 30,
  reverse = false,
}: InfiniteMarqueeProps) {
  const source: ReactNode[] = items ?? words ?? [];
  const sequence = separator
    ? source.flatMap((item) => [item, separator])
    : source;
  const loop = [...sequence, ...sequence];

  const trackStyle = {
    "--marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <div
      className={`${styles.marquee} ${
        theme === "light" ? styles.marqueeLight : styles.marqueeDark
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      <div
        className={`${styles.track} ${
          variant === "logo" ? styles.trackLogo : styles.trackText
        } ${reverse ? styles.trackReverse : ""}`}
        style={trackStyle}
        aria-hidden="true"
      >
        {/* The sequence is static and never reorders, so the index is a
            stable key even for non-string items. */}
        {loop.map((item, index) => (
          <span
            key={index}
            className={separator && item === separator ? styles.dot : styles.item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
