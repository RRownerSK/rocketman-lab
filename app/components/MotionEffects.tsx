"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  V6 motion layer for the full Scene-system homepage.
  Kept deliberately narrow: hero intro, controlled reveals, parallax on
  large illustrations, kinetic type on selected headlines, magnetic CTAs,
  desktop tilt + custom cursor. No global scroll snap / no scroll-progress —
  the color system itself lives entirely in SceneController.
*/
export default function MotionEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // ------------------------------------------------
      // HERO INTRO
      // Not every page's hero has every part (/kontakt has no art), so a
      // step only joins the timeline when its target exists — otherwise GSAP
      // warns about a missing target on every load.
      // ------------------------------------------------
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      const heroStep = (
        selector: string,
        vars: gsap.TweenVars,
        position?: string
      ) => {
        if (document.querySelector(selector)) {
          intro.from(selector, vars, position);
        }
      };

      heroStep("[data-hero-nav]", { y: -20, opacity: 0, duration: 0.5 });
      heroStep(
        "[data-hero-kicker]",
        { y: 18, opacity: 0, duration: 0.5 },
        "-=0.15"
      );
      heroStep(
        "[data-hero-title]",
        { y: 70, opacity: 0, duration: 0.9 },
        "-=0.25"
      );
      heroStep(
        "[data-hero-copy]",
        { y: 20, opacity: 0, duration: 0.5 },
        "-=0.35"
      );
      heroStep(
        "[data-hero-actions]",
        { y: 15, opacity: 0, duration: 0.45 },
        "-=0.25"
      );
      heroStep(
        "[data-hero-art]",
        {
          x: 200,
          y: 120,
          rotation: 16,
          scale: 0.75,
          opacity: 0,
          duration: 1.1,
        },
        "-=0.85"
      );

      // ------------------------------------------------
      // GENERAL REVEALS
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const direction = el.dataset.reveal || "up";
        const vars: gsap.TweenVars = {
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        };

        if (direction === "left") vars.x = -60;
        else if (direction === "right") vars.x = 60;
        else vars.y = 60;

        gsap.from(el, {
          ...vars,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ------------------------------------------------
      // KINETIC TYPOGRAPHY — selected headlines only
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-kinetic]").forEach((el, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          el,
          { xPercent: -2.5 * direction },
          {
            xPercent: 2.5 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      });

      // ------------------------------------------------
      // PARALLAX — large illustrations
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 50);

        gsap.fromTo(
          el,
          { y: amount * 0.5 },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-scene]") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      const pointerFine = window.matchMedia("(pointer: fine)").matches;

      if (pointerFine) {
        // ------------------------------------------------
        // MAGNETIC CTA
        // ------------------------------------------------
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const move = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
              x: x * 0.22,
              y: y * 0.22,
              scale: 1.04,
              duration: 0.25,
              ease: "power2.out",
            });
          };

          const leave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "elastic.out(1, 0.4)",
            });
          };

          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);

          (
            el as HTMLElement & { __magnetCleanup?: () => void }
          ).__magnetCleanup = () => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          };
        });

        // ------------------------------------------------
        // TILT — illustrations, desktop only
        // ------------------------------------------------
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          const move = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;

            gsap.to(el, {
              rotationY: px * 8,
              rotationX: py * -8,
              transformPerspective: 900,
              duration: 0.35,
              ease: "power2.out",
            });
          };

          const leave = () => {
            gsap.to(el, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.45)",
            });
          };

          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);

          (
            el as HTMLElement & { __tiltCleanup?: () => void }
          ).__tiltCleanup = () => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          };
        });

        // ------------------------------------------------
        // CUSTOM CURSOR
        // ------------------------------------------------
        const cursor = document.querySelector<HTMLElement>("[data-cursor]");

        if (cursor) {
          gsap.set(cursor, { xPercent: -50, yPercent: -50 });

          const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.22,
            ease: "power3",
          });
          const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.22,
            ease: "power3",
          });

          // The dot is CSS-hidden until it has a real position, otherwise it
          // sits blended at 0,0 in the corner until the pointer first moves.
          let revealed = false;

          const onMove = (event: MouseEvent) => {
            xTo(event.clientX);
            yTo(event.clientY);

            if (!revealed) {
              revealed = true;
              gsap.set(cursor, { opacity: 0.95 });
            }
          };

          window.addEventListener("mousemove", onMove);

          (
            cursor as HTMLElement & { __cursorCleanup?: () => void }
          ).__cursorCleanup = () =>
            window.removeEventListener("mousemove", onMove);

          const interactive = document.querySelectorAll<HTMLElement>(
            "a, button, [data-magnetic]"
          );

          interactive.forEach((el) => {
            const enter = () =>
              gsap.to(cursor, { scale: 2.2, opacity: 0.55, duration: 0.2 });
            const leave = () =>
              gsap.to(cursor, { scale: 1, opacity: 0.9, duration: 0.25 });

            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);

            (
              el as HTMLElement & { __cursorHoverCleanup?: () => void }
            ).__cursorHoverCleanup = () => {
              el.removeEventListener("mouseenter", enter);
              el.removeEventListener("mouseleave", leave);
            };
          });
        }
      }

      const refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => window.clearTimeout(refreshTimer);
    });

    return () => {
      document
        .querySelectorAll<HTMLElement & { __magnetCleanup?: () => void }>(
          "[data-magnetic]"
        )
        .forEach((el) => el.__magnetCleanup?.());

      document
        .querySelectorAll<HTMLElement & { __tiltCleanup?: () => void }>(
          "[data-tilt]"
        )
        .forEach((el) => el.__tiltCleanup?.());

      document
        .querySelectorAll<
          HTMLElement & { __cursorHoverCleanup?: () => void }
        >("a, button, [data-magnetic]")
        .forEach((el) => el.__cursorHoverCleanup?.());

      document
        .querySelectorAll<HTMLElement & { __cursorCleanup?: () => void }>(
          "[data-cursor]"
        )
        .forEach((el) => el.__cursorCleanup?.());

      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div className="custom-cursor" data-cursor aria-hidden="true" />;
}
