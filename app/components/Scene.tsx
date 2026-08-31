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
};

export default function Scene({
  id,
  theme,
  children,
  className = "",
  frameClassName = "",
  snap = true,
  size = "full",
}: SceneProps) {
  return (
    <section
      id={id}
      className={`scene scene--${size} ${className}`.trim()}
      data-scene
      data-theme={theme}
      data-snap={snap ? "true" : "false"}
    >
      <div className={`scene-frame ${frameClassName}`.trim()}>{children}</div>
    </section>
  );
}
