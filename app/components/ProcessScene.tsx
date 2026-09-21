"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProcessScene.module.css";

const STEPS = [
  {
    number: "01",
    title: "SPOZNÁME",
    text: "Krátky call alebo stretnutie. Ciele, potreby, problémy a predstava.",
  },
  {
    number: "02",
    title: "NAVRHNEME",
    text: "Štruktúra, obsah, dizajn a konkrétne riešenie, ktoré dáva zmysel.",
  },
  {
    number: "03",
    title: "POSTAVÍME",
    text: "Implementácia, funkcie, testovanie, optimalizácia a doladenie detailov.",
  },
  {
    number: "04",
    title: "SPUSTÍME",
    text: "Launch nie je koniec. Sledujeme výsledky a pripravujeme ďalší rast.",
  },
];

const STACKED = "(max-width: 1024px)";

/*
  Desktop: one sticky full-height stage, with the four steps stacked on top of
  each other and crossfaded by scroll position.

  This used to be four sticky panels of 100svh each, so the section cost 400svh
  of page for 300svh of scrolling — three full screens to get through four
  sentences. The stage now owns its scroll budget explicitly (see
  --process-step-scroll in the stylesheet), which is what makes the section
  read as one compact block instead of a long stretch of scrolling.

  Mobile: the stage is disabled below 1024px and the steps fall back to a plain
  stacked list, so there is nothing to drive and every step is simply visible.
  The server render marks step 01 active, so the section is never blank before
  hydration or without JS.
*/
export default function ProcessScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const stacked = window.matchMedia(STACKED);
    let trigger: ScrollTrigger | undefined;

    const build = () => {
      trigger?.kill();
      trigger = undefined;

      if (stacked.matches) {
        setActive(0);
        return;
      }

      trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          /* Equal share of the stage per step, last one included. */
          const index = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );

          setActive(index);
        },
      });
    };

    build();
    stacked.addEventListener("change", build);

    return () => {
      stacked.removeEventListener("change", build);
      trigger?.kill();
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.stage}>
        {STEPS.map((step, index) => (
          <article
            className={styles.panel}
            key={step.number}
            data-state={
              index === active ? "active" : index < active ? "before" : "after"
            }
          >
            <div className={styles.panelInner}>
              <p className={styles.kicker}>PROCESS — KROK {step.number} / 04</p>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>

              <div className={styles.progress} aria-hidden="true">
                {STEPS.map((dot, dotIndex) => (
                  <span
                    key={dot.number}
                    className={`${styles.dot} ${
                      dotIndex === index ? styles.dotActive : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
