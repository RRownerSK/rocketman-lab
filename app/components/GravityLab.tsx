"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./GravityLab.module.css";

type Particle = {
  radiusRatio: number;
  angle: number;
  speed: number;
  size: number;
  warm: boolean;
};

const ORBIT_RATIOS = [0.32, 0.48, 0.64];
const PARTICLE_COUNT = 42;

/*
  Isolated Canvas + vanilla JS + GSAP gravity playground — no Three.js.
  Particles orbit the core; a "gravity target" (real cursor on desktop, an
  auto-roaming point on touch / before the first interaction) bends both
  the particles and the orbit guide-lines toward it. A translucent clear
  each frame produces the trail effect instead of per-particle history.
  prefers-reduced-motion renders one static frame and skips the loop.
*/
export default function GravityLab() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      (_, index) => ({
        radiusRatio: ORBIT_RATIOS[index % ORBIT_RATIOS.length],
        angle: (index / PARTICLE_COUNT) * Math.PI * 2,
        speed: 0.0018 + Math.random() * 0.0016,
        size: 1.6 + Math.random() * 2.2,
        warm: Math.random() > 0.32,
      })
    );

    let target = { x: 0, y: 0 };
    let pointerActive = false;

    const setTarget = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      target = { x: clientX - rect.left, y: clientY - rect.top };
      pointerActive = true;
    };

    const onPointerMove = (event: PointerEvent) => {
      setTarget(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    if (!isTouch && !reduceMotion) {
      stage.addEventListener("pointermove", onPointerMove);
      stage.addEventListener("pointerleave", onPointerLeave);
    }

    const drawStaticFrame = () => {
      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);

      ctx.clearRect(0, 0, width, height);

      ORBIT_RATIOS.forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(cx, cy, ratio * minDim * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(243, 240, 233, 0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        const r = particle.radiusRatio * minDim * 0.5;
        const x = cx + Math.cos(particle.angle) * r;
        const y = cy + Math.sin(particle.angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.warm
          ? "rgba(255, 110, 0, 0.9)"
          : "rgba(243, 240, 233, 0.85)";
        ctx.fill();
      });
    };

    if (reduceMotion) {
      drawStaticFrame();

      return () => {
        resizeObserver.disconnect();
      };
    }

    let idleTime = 0;

    const tick = () => {
      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);

      idleTime += 0.006;

      const idleTarget = {
        x: cx + Math.sin(idleTime * 1.3) * minDim * 0.28,
        y:
          cy +
          Math.sin(idleTime * 0.9) * Math.cos(idleTime * 0.5) * minDim * 0.22,
      };

      const activeTarget = isTouch || !pointerActive ? idleTarget : target;

      // Fade the previous frame toward transparent (not toward an opaque
      // color) so the canvas never accumulates into a solid haze that would
      // bury the core image sitting underneath it — that's the trail.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      // Orbit guide-lines, deformed toward the gravity target.
      ORBIT_RATIOS.forEach((ratio) => {
        const baseR = ratio * minDim * 0.5;
        const segments = 72;

        ctx.beginPath();

        for (let i = 0; i <= segments; i += 1) {
          const theta = (i / segments) * Math.PI * 2;
          const px = cx + Math.cos(theta) * baseR;
          const py = cy + Math.sin(theta) * baseR;

          const dx = activeTarget.x - px;
          const dy = activeTarget.y - py;
          const dist = Math.max(Math.hypot(dx, dy), 1);
          const pull = Math.min(2400 / (dist * dist), 26);

          const wx = px + (dx / dist) * pull;
          const wy = py + (dy / dist) * pull;

          if (i === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }

        ctx.strokeStyle = "rgba(255, 110, 0, 0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Orbiting particles, nudged toward the gravity target.
      particles.forEach((particle) => {
        particle.angle += particle.speed;

        const r = particle.radiusRatio * minDim * 0.5;
        const px = cx + Math.cos(particle.angle) * r;
        const py = cy + Math.sin(particle.angle) * r;

        const dx = activeTarget.x - px;
        const dy = activeTarget.y - py;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const pull = Math.min(4200 / (dist * dist), 46);

        const x = px + (dx / dist) * pull;
        const y = py + (dy / dist) * pull;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.warm
          ? "rgba(255, 110, 0, 0.92)"
          : "rgba(243, 240, 233, 0.88)";
        ctx.fill();
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className={styles.stage} ref={stageRef}>
      <Image
        src="/13-gravity-core.png"
        alt=""
        width={420}
        height={420}
        className={styles.core}
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
