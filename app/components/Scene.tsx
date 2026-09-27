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
  solid = false,
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
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
