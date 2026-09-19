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
};

export default function Scene({
  id,
  theme,
  children,
  className = "",
  frameClassName = "",
  size = "full",
  fullBleed = false,
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
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
