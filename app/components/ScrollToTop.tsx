"use client";

import { useSyncExternalStore } from "react";
import RocketIcon from "./RocketIcon";
import { getLenis } from "./lenisInstance";
import styles from "./ScrollToTop.module.css";

/*
  Floating "back to top" rocket. Shows up once the page has been scrolled
  about one screen down and flies the reader back to the top.

  Scrolling goes through Lenis when it is running, so the trip back uses the
  same smoothing as the wheel instead of a native smooth scroll fighting it.
  Without Lenis (reduced motion), it falls back to window.scrollTo.
*/

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};

const isPastFirstScreen = () => window.scrollY > window.innerHeight * 0.9;

export default function ScrollToTop() {
  const visible = useSyncExternalStore(subscribe, isPastFirstScreen, () => false);

  const scrollToTop = () => {
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`.trim()}
      onClick={scrollToTop}
      aria-label="Späť na začiatok stránky"
      title="Späť na začiatok stránky"
      // Hidden means out of the tab order and the accessibility tree too.
      inert={!visible}
    >
      <RocketIcon size={26} className={styles.icon} />
    </button>
  );
}
