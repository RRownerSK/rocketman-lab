"use client";

import type { CSSProperties } from "react";
import styles from "./InfiniteMarquee.module.css";

type InfiniteMarqueeProps = {
  words: string[];
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
  ariaLabel,
  theme = "dark",
  variant = "text",
  separator,
  durationSeconds = 30,
  reverse = false,
}: InfiniteMarqueeProps) {
  const sequence = separator ? words.flatMap((word) => [word, separator]) : words;
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
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={separator && item === separator ? styles.dot : styles.item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
