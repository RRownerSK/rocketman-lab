import type { Metadata } from "next";
import Link from "next/link";
import MotionEffects from "./components/MotionEffects";
import SmoothScroll from "./components/SmoothScroll";
import SceneController from "./components/SceneController";
import Scene from "./components/Scene";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import RocketIcon from "./components/RocketIcon";
// The CTA pills are the homepage's own, as on /kontakt.
import home from "./page.module.css";
import styles from "./not-found.module.css";

/*
  Next already adds a noindex to anything answered with a 404; this states it
  outright so the page never depends on that.
*/
export const metadata: Metadata = {
  title: "Stránka nenájdená",
  robots: { index: false, follow: false },
};

/*
  Root not-found: shown for every unmatched URL and for notFound() calls.
  One black scene between the shared header and footer, laid out like the
  other heroes — copy left, art right.
*/
export default function NotFound() {
  return (
    <main>
      <SmoothScroll />
      <SceneController />
      <MotionEffects />

      <div className="scene-deck">
        <Scene theme="black" className={styles.hero}>
          <SiteHeader />

          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker" data-hero-kicker>
                ERROR 404 / LOST IN SPACE
              </p>

              <hgroup data-hero-title>
                <h1 className="scene-title">
                  404.
                  <br />
                  <span className="scene-accent">Mimo orbity.</span>
                </h1>
                <p className={`scene-kicker ${home.subheading}`}>
                  Táto stránka odletela do vesmíru
                </p>
              </hgroup>

              <p data-hero-copy>
                Hľadali sme ju všade, od štartovacej rampy až po poslednú
                orbitu. Nevadí — naštartujeme vás späť tam, kde to dáva zmysel.
              </p>

              <div className={home.heroActions} data-hero-actions>
                <Link
                  className={`${home.button} ${home.buttonOrange}`}
                  href="/"
                  data-magnetic
                >
                  SPÄŤ NA DOMOVSKÚ STRÁNKU ↗
                </Link>
                <Link
                  className={`${home.button} ${home.buttonOutline}`}
                  href="/kontakt"
                  data-magnetic
                >
                  NAPÍSAŤ NÁM
                </Link>
              </div>
            </div>

            <div
              className={`scene-art scene-safe ${styles.art}`}
              aria-hidden="true"
              data-hero-art
            >
              <div className={styles.orbit}>
                <RocketIcon className={styles.rocket} size={260} strokeWidth={1.1} />
              </div>
            </div>
          </div>
        </Scene>

        <SiteFooter />
      </div>
    </main>
  );
}
