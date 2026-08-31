"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SCENE_THEMES,
  type SceneThemeName,
} from "./sceneSystem";

export default function SceneController() {
  const layerA = useRef<HTMLDivElement>(null);
  const layerB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scenes = gsap.utils.toArray<HTMLElement>(
      "[data-scene][data-theme]"
    );

    const firstLayer = layerA.current;
    const secondLayer = layerB.current;

    if (!scenes.length || !firstLayer || !secondLayer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frontLayer = firstLayer;
    let backLayer = secondLayer;
    let activeTheme = "";

    const getTheme = (themeName?: string | null) => {
      const safeName =
        themeName && themeName in SCENE_THEMES
          ? (themeName as SceneThemeName)
          : "black";

      return SCENE_THEMES[safeName];
    };

    const applyTheme = (
      themeName?: string | null,
      immediate = false
    ) => {
      const theme = getTheme(themeName);

      if (!immediate && activeTheme === theme.name) return;

      activeTheme = theme.name;
      document.documentElement.dataset.activeTheme = theme.name;

      if (immediate || reduceMotion) {
        frontLayer.style.background = theme.background;
        backLayer.style.background = theme.background;

        gsap.set(frontLayer, {
          opacity: 1,
          scale: 1,
        });

        gsap.set(backLayer, {
          opacity: 0,
          scale: 1.03,
        });

        return;
      }

      const outgoing = frontLayer;
      const incoming = backLayer;

      incoming.style.background = theme.background;

      gsap.killTweensOf([outgoing, incoming]);

      gsap.set(incoming, {
        opacity: 0,
        scale: 1.035,
      });

      gsap
        .timeline({
          defaults: {
            overwrite: true,
          },
          onComplete: () => {
            frontLayer = incoming;
            backLayer = outgoing;

            gsap.set(backLayer, {
              opacity: 0,
              scale: 1.03,
            });
          },
        })
        .to(
          outgoing,
          {
            opacity: 0,
            duration: 0.48,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          incoming,
          {
            opacity: 1,
            scale: 1,
            duration: 0.56,
            ease: "power2.out",
          },
          0
        );
    };

    const viewportCenter = window.scrollY + window.innerHeight / 2;

    const initialScene =
      scenes.find((scene) => {
        const top = scene.offsetTop;
        const bottom = top + scene.offsetHeight;

        return viewportCenter >= top && viewportCenter < bottom;
      }) ?? scenes[0];

    applyTheme(initialScene.dataset.theme, true);

    const sceneTriggers = scenes.map((scene) =>
      ScrollTrigger.create({
        trigger: scene,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => applyTheme(scene.dataset.theme),
        onEnterBack: () => applyTheme(scene.dataset.theme),
      })
    );

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
      () => {
        let snapPoints: number[] = [];

        const calculateSnapPoints = () => {
          const maxScroll = ScrollTrigger.maxScroll(window);

          if (maxScroll <= 0) {
            snapPoints = [0];
            return;
          }

          snapPoints = scenes
            .filter((scene) => scene.dataset.snap !== "false")
            .map((scene) =>
              gsap.utils.clamp(0, 1, scene.offsetTop / maxScroll)
            )
            .filter(
              (point, index, all) =>
                index === 0 || Math.abs(point - all[index - 1]) > 0.002
            );
        };

        calculateSnapPoints();

        const snapTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          snap: {
            snapTo: (progress) =>
              snapPoints.length
                ? gsap.utils.snap(snapPoints, progress)
                : progress,
            delay: 0.12,
            duration: {
              min: 0.16,
              max: 0.48,
            },
            ease: "power2.inOut",
            inertia: false,
          },
        });

        const onRefresh = () => calculateSnapPoints();

        ScrollTrigger.addEventListener("refresh", onRefresh);

        return () => {
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          snapTrigger.kill();
        };
      }
    );

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(refreshTimer);
      sceneTriggers.forEach((trigger) => trigger.kill());
      mm.revert();

      delete document.documentElement.dataset.activeTheme;

      gsap.killTweensOf([frontLayer, backLayer]);
    };
  }, []);

  return (
    <div className="scene-background" aria-hidden="true">
      <div
        ref={layerA}
        className="scene-background-layer scene-background-layer-a"
      />
      <div
        ref={layerB}
        className="scene-background-layer scene-background-layer-b"
      />
    </div>
  );
}
