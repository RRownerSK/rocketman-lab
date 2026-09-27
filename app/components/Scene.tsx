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
  /*
    The scene paints its own opaque background instead of relying on the
    global morph, and SceneController leaves it out of the morph. For the
    footer: it is too short to ever reach the viewport centre, so waiting on
    the morph left its cream ink on whatever light scene came before it.
  */
  solid?: boolean;
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
  solid = false,
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
      data-theme-adaptive={themeAdaptive ? "" : undefined}
      data-scene-solid={solid ? "" : undefined}
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
