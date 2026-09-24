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

    /*
      clamp() on the last scene only: a short footer never gets its top up to
      the viewport centre — the page runs out first — so without it the
      background stayed on the previous theme and the footer's cream ink sat
      on cream. Clamped, the switch lands on the last scrollable pixel.
      Clamping every scene is not safe: the hero's start clamps to 0 and a
      load straight onto /#work then repaints the hero's black over it.
    */
    const lastScene = scenes[scenes.length - 1];

    const sceneTriggers = scenes.map((scene) =>
      ScrollTrigger.create({
        trigger: scene,
        start: scene === lastScene ? "clamp(top 50%)" : "top 50%",
        end: "bottom 50%",
        onEnter: () => applyTheme(scene.dataset.theme),
        onEnterBack: () => applyTheme(scene.dataset.theme),
      })
    );

    /*
      No scroll snapping. It used to run as one global trigger whose snap
      points were the tops of full-height scenes only, so anywhere over a
      short interstitial — either marquee — or inside a long one — the work
      gallery, the process stack — the nearest point was a whole section away
      and the page yanked you off whatever you were trying to read.
    */

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(refreshTimer);
      sceneTriggers.forEach((trigger) => trigger.kill());

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
