import styles from "./WorkGallery.module.css";

type Accent = "orange" | "black" | "cream" | "blue" | "purple";

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
}[] = [
  {
    number: "01",
    name: "BEH NA BOSO TATRY",
    tags: "WEB / BRAND / EVENT",
    accent: "orange",
  },
  {
    number: "02",
    name: "PLATKO CATERING",
    tags: "WEB / E-SHOP / IDENTITY",
    accent: "black",
  },
  {
    number: "03",
    name: "APARTMÁN JULI",
    tags: "WEB / FOTO / SEO / EMAIL",
    accent: "cream",
  },
  {
    number: "04",
    name: "ALIMAH FUSION",
    tags: "WEB / BRAND / SEO",
    accent: "blue",
  },
  {
    number: "05",
    name: "LOVE COFFEE",
    tags: "E-SHOP / PRODUKTY / MARKETING / SEO",
    accent: "purple",
  },
  {
    number: "06",
    name: "KOMPLET FIT",
    tags: "WEB / BRANDING / MARKETING",
    accent: "orange",
    url: "kompletfit.sk",
  },
];

/*
  Digital-poster stack: each project is a full-height sticky panel, so the
  next project slides in and covers the previous one — always exactly one
  clearly readable active project, never a plain card grid.
*/
export default function WorkGallery() {
  return (
    <div className={styles.wrapper}>
      {PROJECTS.map((project, index) => (
        <article
          className={`${styles.panel} ${ACCENT_CLASS[project.accent]}`}
          key={project.number}
          style={{ zIndex: index + 1 }}
        >
          <div className={styles.panelInner}>
            <span className={styles.number}>{project.number} / 06</span>

            {/* TODO: nahradiť reálnym screenshotom projektu */}
            <div className={styles.placeholder} aria-hidden="true">
              <span>{project.name}</span>
            </div>

            <div className={styles.meta}>
              <h3 className={styles.title}>{project.name}</h3>
              <p className={styles.tags}>
                {project.tags}
                {project.url ? ` — ${project.url}` : ""}
              </p>
            </div>

            <a
              className={styles.view}
              href="#"
              aria-label={`Otvoriť projekt ${project.name}`}
            >
              VIEW ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
