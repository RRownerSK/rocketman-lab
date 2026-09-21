"use client";

import type { ReactNode } from "react";
import type { SceneThemeName } from "./sceneSystem";

type SceneProps = {
  id?: string;
  theme: SceneThemeName;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  size?: "full" | "content";
  fullBleed?: boolean;
  /*
    Short scenes (the marquee strips) are still on screen long after the
    global background has morphed to a neighbour, so their own theme ink can
    end up white on cream. With this set the scene takes its text colours
    from the *active* theme instead of its own.
  */
  themeAdaptive?: boolean;
};

export default function Scene({
  id,
  theme,
  children,
  className = "",
  frameClassName = "",
  size = "full",
  fullBleed = false,
  themeAdaptive = false,
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
      data-theme-adaptive={themeAdaptive ? "" : undefined}
    >
      <div
        className={`scene-frame ${
          fullBleed ? "scene-frame--full-bleed" : ""
        } ${frameClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
