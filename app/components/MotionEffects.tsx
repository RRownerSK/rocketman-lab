"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // ------------------------------------------------
      // HERO
      // ------------------------------------------------
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .from(".nav", { y: -20, opacity: 0, duration: 0.55 })
        .from(".eyebrow", { y: 18, opacity: 0, duration: 0.55 }, "-=0.15")
        .from(".hero h1", { y: 75, opacity: 0, duration: 0.95 }, "-=0.25")
        .from(".hero-punchline", { y: 25, opacity: 0, duration: 0.55 }, "-=0.45")
        .from(".hero-description", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-actions", { y: 15, opacity: 0, duration: 0.45 }, "-=0.25")
        .from(
          ".hero-astronaut",
          {
            x: 260,
            y: 150,
            rotation: 22,
            scale: 0.68,
            opacity: 0,
            duration: 1.3,
          },
          "-=0.9"
        )
        .from(
          ".orbit-one",
          { scale: 0.35, rotation: -90, opacity: 0, duration: 1 },
          "-=1.05"
        )
        .from(
          ".orbit-two",
          { scale: 0.5, rotation: 90, opacity: 0, duration: 0.9 },
          "-=0.85"
        )
        .from(".hero-foot", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2");

      gsap.to(".orbit-one", {
        rotation: "+=360",
        duration: 38,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-two", {
        rotation: "-=360",
        duration: 52,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-astronaut", {
        y: -14,
        x: 5,
        rotation: 3,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-copy", {
        yPercent: 18,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-art", {
        yPercent: 25,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // ------------------------------------------------
      // SEAMLESS COLOR FLOW V5
      // ------------------------------------------------
      // Multiple transition geometries keep the color changes varied:
      // wipe, wipe-right, diagonal and radial.
      const colorTransitions =
        gsap.utils.toArray<HTMLElement>(".color-transition");

      colorTransitions.forEach((transition) => {
        const shape = transition.dataset.transition || "wipe";

        let fromClip = "inset(100% 0 0 0)";
        let toClip = "inset(0% 0 0 0)";

        if (shape === "wipe-right") {
          fromClip = "inset(0 100% 0 0)";
          toClip = "inset(0 0% 0 0)";
        }

        if (shape === "diagonal") {
          fromClip =
            "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
          toClip =
            "polygon(0 18%, 100% 0, 100% 100%, 0 100%)";
        }

        if (shape === "radial") {
          fromClip = "circle(0% at 50% 100%)";
          toClip = "circle(150% at 50% 100%)";
        }

        gsap.fromTo(
          transition,
          { clipPath: fromClip },
          {
            clipPath: toClip,
            ease: "none",
            scrollTrigger: {
              trigger: transition.parentElement,
              start: "bottom 92%",
              end: "bottom 28%",
              scrub: 1,
            },
          }
        );
      });

      // ------------------------------------------------
      // GENERAL REVEALS
      // ------------------------------------------------
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      revealEls.forEach((el) => {
        const direction = el.dataset.reveal || "up";
        const vars: gsap.TweenVars = {
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        };

        if (direction === "left") vars.x = -70;
        else if (direction === "right") vars.x = 70;
        else vars.y = 70;

        gsap.from(el, {
          ...vars,
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
          },
        });
      });

      // ------------------------------------------------
      // CLIP PATH REVEALS
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
            },
          }
        );
      });

      // ------------------------------------------------
      // MANIFEST
      // ------------------------------------------------
      gsap.from(".manifest-title span", {
        scale: 0.82,
        transformOrigin: "left center",
        opacity: 0.25,
        duration: 0.9,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".manifest-title",
          start: "top 72%",
        },
      });

      gsap.to(".manifest-title", {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifest",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ------------------------------------------------
      // PARALLAX IMAGES
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 60);
        gsap.fromTo(
          el,
          { y: amount * 0.5 },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          }
        );
      });

      // ------------------------------------------------
      // MARQUEES
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track, index) => {
        gsap.to(track, {
          xPercent: index % 2 === 0 ? -18 : 18,
          ease: "none",
          scrollTrigger: {
            trigger: track.closest(".marquee"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // ------------------------------------------------
      // SERVICES
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>(".service-section").forEach((section, index) => {
        const image = section.querySelector(".service-art img");

        if (image) {
          gsap.from(image, {
            x: index % 2 === 0 ? 90 : -90,
            y: 20,
            scale: 0.82,
            rotation: index % 2 === 0 ? 6 : -6,
            opacity: 0,
            duration: 0.95,
            ease: "back.out(1.25)",
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
            },
          });
        }
      });

      // ------------------------------------------------
      // PROJECTS
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>(".project").forEach((project, index) => {
        gsap.from(project, {
          x: index % 2 === 0 ? -65 : 65,
          y: 30,
          opacity: 0,
          scale: 0.975,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 84%",
          },
        });

        const button = project.querySelector("a");

        if (button) {
          gsap.from(button, {
            scale: 0,
            rotation: -60,
            duration: 0.55,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: project,
              start: "top 82%",
            },
          });
        }
      });

      // ------------------------------------------------
      // BUILD / LAUNCH / SCALE
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>(".mission-step").forEach((step, index) => {
        const art = step.querySelector(".mission-art img");
        const copy = step.querySelector(".mission-copy");

        if (art) {
          gsap.from(art, {
            x: index % 2 === 0 ? -80 : 80,
            y: 35,
            scale: 0.72,
            rotation: index % 2 === 0 ? -10 : 10,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.25)",
            scrollTrigger: {
              trigger: step,
              start: "top 76%",
            },
          });
        }

        if (copy) {
          gsap.from(copy, {
            x: index % 2 === 0 ? 65 : -65,
            opacity: 0,
            duration: 0.85,
            scrollTrigger: {
              trigger: step,
              start: "top 76%",
            },
          });
        }
      });

      // ------------------------------------------------
      // PLAYGROUND ROCKET
      // ------------------------------------------------
      gsap.fromTo(
        ".playground-art img",
        { x: 180, y: 120, rotation: 18, scale: 0.72 },
        {
          x: -45,
          y: -75,
          rotation: -8,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".playground",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        }
      );

      // ------------------------------------------------
      // MAGNETIC BUTTONS
      // ------------------------------------------------
      if (window.matchMedia("(pointer: fine)").matches) {
        const magnets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");

        magnets.forEach((el) => {
          const move = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
              x: x * 0.18,
              y: y * 0.18,
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

          (el as HTMLElement & { __magnetCleanup?: () => void }).__magnetCleanup =
            () => {
              el.removeEventListener("mousemove", move);
              el.removeEventListener("mouseleave", leave);
            };
        });
      }

      // ------------------------------------------------
      // CUSTOM CURSOR FOLLOWER
      // ------------------------------------------------
      const cursor = document.querySelector<HTMLElement>(".rocket-cursor");

      if (cursor && window.matchMedia("(pointer: fine)").matches) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.22,
          ease: "power3",
        });

        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.22,
          ease: "power3",
        });

        const onMove = (event: MouseEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        window.addEventListener("mousemove", onMove);

        (cursor as HTMLElement & { __cursorCleanup?: () => void }).__cursorCleanup =
          () => window.removeEventListener("mousemove", onMove);
      }


      // ------------------------------------------------
      // SECTION DEPTH — subtle title drift near scene changes
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>(
        ".service-copy h2, .split-copy h2, .final-cta h2"
      ).forEach((title, index) => {
        gsap.fromTo(
          title,
          { yPercent: index % 2 === 0 ? 4 : -4 },
          {
            yPercent: index % 2 === 0 ? -4 : 4,
            ease: "none",
            scrollTrigger: {
              trigger: title.closest("section") || title,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );
      });

      // ------------------------------------------------
      // SCROLL PROGRESS
      // ------------------------------------------------
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });

      // ------------------------------------------------
      // KINETIC TYPOGRAPHY
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-kinetic]").forEach((el, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          el,
          { xPercent: -3 * direction },
          {
            xPercent: 3 * direction,
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
      // OVERSIZED INDEX / LABEL DRIFT
      // ------------------------------------------------
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35 },
          {
            y: -45,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // ------------------------------------------------
      // MISSION STICKY STACK
      // ------------------------------------------------
      const missionCards = gsap.utils.toArray<HTMLElement>(".mission-step");

      missionCards.forEach((card, index) => {
        if (index === missionCards.length - 1) return;

        gsap.to(card, {
          scale: 0.93,
          opacity: 0.38,
          filter: "blur(2px)",
          ease: "none",
          scrollTrigger: {
            trigger: missionCards[index + 1],
            start: "top 72%",
            end: "top 30%",
            scrub: 1,
          },
        });
      });

      // ------------------------------------------------
      // 3D TILT — DESKTOP ONLY
      // ------------------------------------------------
      if (window.matchMedia("(pointer: fine)").matches) {
        const tiltEls = gsap.utils.toArray<HTMLElement>("[data-tilt]");

        tiltEls.forEach((el) => {
          const move = (event: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;

            gsap.to(el, {
              rotationY: px * 10,
              rotationX: py * -10,
              transformPerspective: 900,
              transformOrigin: "center center",
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
            el as HTMLElement & {
              __tiltCleanup?: () => void;
            }
          ).__tiltCleanup = () => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          };
        });

        // Cursor grows on interactive elements.
        const cursor = document.querySelector<HTMLElement>(".rocket-cursor");
        const interactive = document.querySelectorAll<HTMLElement>(
          "a, button, [data-magnetic], .project"
        );

        if (cursor) {
          interactive.forEach((el) => {
            const enter = () =>
              gsap.to(cursor, {
                scale: 2.5,
                opacity: 0.55,
                duration: 0.2,
              });

            const leave = () =>
              gsap.to(cursor, {
                scale: 1,
                opacity: 0.95,
                duration: 0.25,
              });

            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);

            (
              el as HTMLElement & {
                __cursorHoverCleanup?: () => void;
              }
            ).__cursorHoverCleanup = () => {
              el.removeEventListener("mouseenter", enter);
              el.removeEventListener("mouseleave", leave);
            };
          });
        }
      }

      // Final layout refresh
      const refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => {
        window.clearTimeout(refreshTimer);
      };
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
        >("a, button, [data-magnetic], .project")
        .forEach((el) => el.__cursorHoverCleanup?.());

      const cursor = document.querySelector<
        HTMLElement & { __cursorCleanup?: () => void }
      >(".rocket-cursor");

      cursor?.__cursorCleanup?.();

      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
