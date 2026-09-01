"use client";

import type { ReactNode } from "react";
import type { SceneThemeName } from "./sceneSystem";

type SceneProps = {
  id?: string;
  theme: SceneThemeName;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  snap?: boolean;
  size?: "full" | "content";
  fullBleed?: boolean;
};

export default function Scene({
  id,
  theme,
  children,
  className = "",
  frameClassName = "",
  snap = true,
  size = "full",
  fullBleed = false,
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
      data-snap={snap ? "true" : "false"}
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
