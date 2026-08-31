"use client";

export type SceneThemeName =
  | "black"
  | "cream"
  | "orange"
  | "blue"
  | "purple";

export type SceneTheme = {
  name: SceneThemeName;
  background: string;
};

export const SCENE_THEMES: Record<SceneThemeName, SceneTheme> = {
  black: {
    name: "black",
    background:
      "radial-gradient(80% 70% at 82% 12%, rgba(255,110,0,.16) 0%, rgba(255,110,0,0) 54%), #050505",
  },

  cream: {
    name: "cream",
    background:
      "radial-gradient(70% 62% at 84% 14%, rgba(255,110,0,.10) 0%, rgba(255,110,0,0) 56%), radial-gradient(60% 60% at 10% 90%, rgba(12,0,255,.055) 0%, rgba(12,0,255,0) 58%), #F3F0E9",
  },

  orange: {
    name: "orange",
    background:
      "radial-gradient(74% 70% at 82% 12%, rgba(122,48,207,.19) 0%, rgba(122,48,207,0) 52%), linear-gradient(135deg, #FF6E00 0%, #FF7B18 100%)",
  },

  blue: {
    name: "blue",
    background:
      "radial-gradient(72% 70% at 80% 14%, rgba(255,110,0,.30) 0%, rgba(255,110,0,0) 48%), linear-gradient(140deg, #0C00FF 0%, #2116FF 56%, #7A30CF 122%)",
  },

  purple: {
    name: "purple",
    background:
      "radial-gradient(74% 72% at 80% 14%, rgba(255,110,0,.26) 0%, rgba(255,110,0,0) 47%), linear-gradient(145deg, #7A30CF 0%, #6123BA 58%, #0C00FF 132%)",
  },
};
