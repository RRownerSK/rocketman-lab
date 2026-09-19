import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import styles from "./WorkGallery.module.css";

type Accent = "orange" | "black" | "cream" | "blue" | "purple";

/*
  Every screenshot ships as a desktop and a mobile crop, each already drawn
  inside its own device frame. Rendering both as <Image> and hiding one with
  CSS would download both megabyte PNGs, so the pair goes through
  getImageProps + <picture>: the browser resolves the media query first and
  fetches exactly one.
*/
type Shot = { src: string; width: number; height: number };

const desktopShot = (slug: string): Shot => ({
  src: `/work/${slug}_desktop.png`,
  width: 1720,
  height: 939,
});

const mobileShot = (slug: string, height = 1685): Shot => ({
  src: `/work/${slug}_mobile.png`,
  width: 880,
  height,
});

/* The gallery is far below the fold, so the swap breakpoint matches the one
   in WorkGallery.module.css where the panel drops out of its sticky stack. */
const DESKTOP_MEDIA = "(min-width: 1025px)";

const ACCENT_CLASS: Record<Accent, string> = {
  orange: styles.panelOrange,
  black: styles.panelBlack,
  cream: styles.panelCream,
  blue: styles.panelBlue,
  purple: styles.panelPurple,
};

const PROJECTS: {
  number: string;
  name: string;
  tags: string;
  accent: Accent;
  url?: string;
  desktop: Shot;
  mobile: Shot;
}[] = [
  {
    number: "01",
    name: "BEH NA BOSO TATRY",
    tags: "WEB / BRAND / EVENT",
    accent: "orange",
    desktop: desktopShot("02_behnabosotatry"),
    mobile: mobileShot("02_behnabosotatry"),
  },
  {
    number: "02",
    name: "PLATKO CATERING",
    tags: "WEB / E-SHOP / IDENTITY",
    accent: "black",
    desktop: desktopShot("05_platkocatering"),
    mobile: mobileShot("05_platkocatering"),
  },
  {
    number: "03",
    name: "APARTMÁN JULI",
    tags: "WEB / FOTO / SEO / EMAIL",
    accent: "cream",
    desktop: desktopShot("03_apartmanjuli"),
    mobile: mobileShot("03_apartmanjuli"),
  },
  {
    number: "04",
    name: "ALIMAH FUSION",
    tags: "WEB / BRAND / SEO",
    accent: "blue",
    desktop: desktopShot("04_ohentanecdivadlo"),
    mobile: mobileShot("04_ohentanecdivadlo", 1699),
  },
  {
    number: "05",
    name: "LOVE COFFEE",
    tags: "E-SHOP / PRODUKTY / MARKETING / SEO",
    accent: "purple",
    desktop: desktopShot("06_lovecoffee"),
    mobile: mobileShot("06_lovecoffee"),
  },
  {
    number: "06",
    name: "KOMPLET FIT",
    tags: "WEB / BRANDING / MARKETING",
    accent: "orange",
    url: "kompletfit.sk",
    desktop: desktopShot("01_kompletfit"),
    mobile: mobileShot("01_kompletfit"),
  },
];

/*
  Digital-poster stack: each project is a full-height sticky panel, so the
  next project slides in and covers the previous one — always exactly one
  clearly readable active project, never a plain card grid.

  Inside a panel the screenshot and the copy sit side by side and swap sides
  on every other project, so the shot gets most of the width instead of being
  a small centred block under the title.
*/
export default function WorkGallery() {
  return (
    <div className={styles.wrapper}>
      {PROJECTS.map((project, index) => {
        const alt = `Ukážka webu — ${project.name}`;

        /* Kept in sync with the max-width rules in WorkGallery.module.css. */
        const desktopSizes = "(max-width: 1600px) 56vw, 900px";
        const mobileSizes = "(max-width: 440px) 78vw, 340px";

        const {
          props: { srcSet: desktopSrcSet },
        } = getImageProps({
          ...project.desktop,
          alt,
          quality: 90,
          sizes: desktopSizes,
        });

        const {
          props: { srcSet: mobileSrcSet, ...imgProps },
        } = getImageProps({
          ...project.mobile,
          alt,
          quality: 90,
          sizes: mobileSizes,
        });

        return (
          <article
            className={`${styles.panel} ${ACCENT_CLASS[project.accent]} ${
              index % 2 === 1 ? styles.panelReverse : ""
            }`.trim()}
            key={project.number}
            style={{ zIndex: index + 1 }}
          >
            <div className={styles.panelInner}>
              <div className={styles.copy}>
                <span className={styles.number}>{project.number} / 06</span>

                <h3 className={styles.title}>{project.name}</h3>

                <p className={styles.tags}>
                  {project.tags}
                  {project.url ? ` — ${project.url}` : ""}
                </p>

                <a
                  className={styles.view}
                  href="#"
                  aria-label={`Otvoriť projekt ${project.name}`}
                >
                  VIEW ↗
                </a>
              </div>

              <picture
                className={styles.shot}
                style={
                  {
                    "--shot-ratio-desktop": `${project.desktop.width} / ${project.desktop.height}`,
                    "--shot-ratio-mobile": `${project.mobile.width} / ${project.mobile.height}`,
                  } as CSSProperties
                }
              >
                <source
                  media={DESKTOP_MEDIA}
                  srcSet={desktopSrcSet}
                  sizes={desktopSizes}
                  width={project.desktop.width}
                  height={project.desktop.height}
                />
                <source
                  srcSet={mobileSrcSet}
                  sizes={mobileSizes}
                  width={project.mobile.width}
                  height={project.mobile.height}
                />
                <img {...imgProps} alt={alt} />
              </picture>
            </div>
          </article>
        );
      })}
    </div>
  );
}
