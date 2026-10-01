"use client";

/* eslint-disable @next/next/no-img-element -- absolutely placed animation layers, not content images */

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./AstronautLaunch.module.css";

/*
  Animated launching astronaut: replaces the flat 01-astronaut-launch.png.
  Built from public/astronaut-snippet.html — the art is cut into layers in
  /public/astronaut, placed in percentages of a square stage. The astronaut
  and flame fly in once and then bob; the dots, cube and speed lines drift
  on their own loops (--dur / --d / --r per layer).

  Off screen every animation is paused, so it costs nothing once the hero
  has been scrolled past.
*/

type Layer = {
  kind: "dot" | "cube" | "line";
  src: string;
  left: string;
  top: string;
  width: string;
  vars: Record<string, string>;
};

const DECO: Layer[] = [
  { kind: "dot", src: "dot7.webp", left: "40.351%", top: "18.740%", width: "3.349%", vars: { "--dur": "3.22s", "--d": "-0.66s", "--r": "8deg" } },
  { kind: "cube", src: "cube10.webp", left: "25.279%", top: "22.249%", width: "15.630%", vars: { "--dur": "3.89s", "--d": "-1.69s", "--r": "-14deg" } },
  { kind: "dot", src: "dot34.webp", left: "26.475%", top: "37.480%", width: "3.190%", vars: { "--dur": "3.32s", "--d": "-3.50s", "--r": "11deg" } },
  { kind: "dot", src: "dot38.webp", left: "72.169%", top: "43.780%", width: "3.509%", vars: { "--dur": "3.51s", "--d": "-2.38s", "--r": "7deg" } },
  { kind: "line", src: "line41.webp", left: "21.770%", top: "46.491%", width: "5.024%", vars: { "--dur": "1.40s", "--d": "-1.42s" } },
  { kind: "line", src: "line42.webp", left: "53.270%", top: "46.970%", width: "18.820%", vars: { "--dur": "1.18s", "--d": "-1.00s" } },
  { kind: "line", src: "line44.webp", left: "17.384%", top: "48.246%", width: "13.796%", vars: { "--dur": "0.94s", "--d": "-1.05s" } },
  { kind: "line", src: "line48.webp", left: "20.016%", top: "50.159%", width: "14.035%", vars: { "--dur": "1.29s", "--d": "-1.49s" } },
  { kind: "line", src: "line50.webp", left: "69.298%", top: "50.718%", width: "4.705%", vars: { "--dur": "1.39s", "--d": "-0.43s" } },
  { kind: "dot", src: "dot66.webp", left: "64.833%", top: "56.539%", width: "3.828%", vars: { "--dur": "3.02s", "--d": "-2.67s", "--r": "-13deg" } },
  { kind: "dot", src: "dot72.webp", left: "60.526%", top: "61.085%", width: "2.951%", vars: { "--dur": "2.97s", "--d": "-2.44s", "--r": "6deg" } },
  { kind: "line", src: "line79.webp", left: "41.547%", top: "65.630%", width: "16.507%", vars: { "--dur": "1.03s", "--d": "-0.43s" } },
  { kind: "line", src: "line96.webp", left: "44.258%", top: "70.893%", width: "11.404%", vars: { "--dur": "1.34s", "--d": "-0.60s" } },
  { kind: "line", src: "line118.webp", left: "37.480%", top: "80.223%", width: "6.539%", vars: { "--dur": "1.45s", "--d": "-0.74s" } },
  { kind: "line", src: "line124.webp", left: "24.402%", top: "84.609%", width: "12.041%", vars: { "--dur": "1.00s", "--d": "-0.60s" } },
  { kind: "dot", src: "dot138.webp", left: "35.726%", top: "86.364%", width: "2.951%", vars: { "--dur": "2.84s", "--d": "-0.55s", "--r": "14deg" } },
  { kind: "dot", src: "dot165.webp", left: "42.504%", top: "92.982%", width: "0.957%", vars: { "--dur": "2.85s", "--d": "-1.66s", "--r": "12deg" } },
  { kind: "dot", src: "dot189.webp", left: "38.118%", top: "96.093%", width: "1.116%", vars: { "--dur": "3.93s", "--d": "-0.60s", "--r": "-8deg" } },
];

type AstronautLaunchProps = {
  /* Above the fold (hero): fetch the two big layers first. */
  priority?: boolean;
  parallax?: string;
};

export default function AstronautLaunch({
  priority = false,
  parallax,
}: AstronautLaunchProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) =>
      el.classList.toggle(styles.paused, !entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  return (
    <div ref={ref} className={styles.astro} data-parallax={parallax}>
      <div className={styles.deco}>
        {DECO.map((layer) => (
          <img
            key={layer.src}
            className={`${styles.layer} ${styles[layer.kind]}`}
            src={`/astronaut/${layer.src}`}
            alt=""
            loading={loading}
            draggable={false}
            style={
              {
                left: layer.left,
                top: layer.top,
                width: layer.width,
                ...layer.vars,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.enter}>
        <div className={styles.rig}>
          <img
            className={`${styles.layer} ${styles.flame}`}
            src="/astronaut/flame.webp"
            alt=""
            loading={loading}
            fetchPriority={fetchPriority}
            draggable={false}
            style={{ left: "2.233%", top: "41.228%", width: "44.817%" }}
          />
          <img
            className={styles.layer}
            src="/astronaut/body.webp"
            alt=""
            loading={loading}
            fetchPriority={fetchPriority}
            draggable={false}
            style={{ left: "28.708%", top: "5.183%", width: "69.777%" }}
          />
        </div>
      </div>
    </div>
  );
}
