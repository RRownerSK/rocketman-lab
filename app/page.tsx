import Image from "next/image";
import MotionEffects from "./components/MotionEffects";
import SmoothScroll from "./components/SmoothScroll";
import SceneController from "./components/SceneController";
import Scene from "./components/Scene";
import InfiniteMarquee from "./components/InfiniteMarquee";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <SceneController />
      <MotionEffects />

      <div className="scene-deck">
        {/* Scene 00 — HERO */}
        <Scene theme="black" id="top">
          <header className={styles.nav} data-hero-nav>
            <a href="#top" aria-label="Rocketman domov">
              <Image
                src="/rocketman-logo.svg"
                alt="Rocketman"
                width={152}
                height={42}
                priority
              />
            </a>

            <nav className={styles.navLinks} aria-label="Hlavná navigácia">
              <a href="#work">WORK</a>
              <a href="#services">SLUŽBY</a>
              <a href="#process">PROCES</a>
              <a href="#contact">KONTAKT</a>
            </nav>
          </header>

          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker" data-hero-kicker>
                DIGITAL STUDIO / EST. 2026
              </p>

              <h1 className="scene-title" data-hero-title>
                WE DON&apos;T
                <br />
                BUILD WEBSITES.
                <br />
                <span className="scene-accent">WE BUILD MOMENTUM.</span>
              </h1>

              <p data-hero-copy>
                Web, marketing a digitálne riešenia pre značky, ktoré nechcú
                zostať stáť na mieste.
              </p>

              <div className={styles.heroActions} data-hero-actions>
                <a
                  className={`${styles.button} ${styles.buttonOrange}`}
                  href="#contact"
                  data-magnetic
                >
                  BEZPLATNÁ KONZULTÁCIA ↗
                </a>
                <a className={styles.textLink} href="#work">
                  POZRIEŤ WORK ↓
                </a>
              </div>
            </div>

            <div
              className="scene-art scene-safe"
              aria-hidden="true"
              data-tilt
              data-hero-art
            >
              <Image
                src="/01-astronaut-launch.png"
                alt=""
                width={900}
                height={900}
                priority
                data-parallax="50"
              />
            </div>
          </div>

          <div className={styles.heroFoot}>
            <span>DESIGN / WEB / MARKETING / GROWTH</span>
            <span>SCROLL TO LAUNCH ↓</span>
          </div>
        </Scene>

        {/* Scene 01 — APPROACH */}
        <Scene theme="cream">
          <div className="scene-copy">
            <p className="scene-kicker">01 / APPROACH</p>
            <h2 className="scene-title" data-kinetic>
              Dizajn,
              <br />
              ktorý
              <br />
              <span className="scene-accent">komunikuje.</span>
            </h2>
            <p data-reveal="up">
              Pekný web nestačí. Každý detail musí mať dôvod, smer a úlohu.
              Dizajn má človeka viesť, nie len zaplniť obrazovku.
            </p>
          </div>
        </Scene>

        {/* Scene 02 — TECHNOLOGY */}
        <Scene theme="orange">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">02 / TECHNOLOGY</p>
              <h2 className="scene-title" data-kinetic>
                Technológia,
                <br />
                ktorá šetrí
                <br />
                <span className="scene-accent">čas.</span>
              </h2>
              <p data-reveal="up">
                Navrhujeme digitálne riešenia, ktoré nerobia viac práce. Robia
                správnu prácu jednoduchšie.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/03-web-ui-orbit.png"
                alt=""
                width={900}
                height={900}
                data-parallax="60"
              />
            </div>
          </div>
        </Scene>

        {/* SERVICES MARQUEE — real continuous strip, not scroll-linked */}
        <Scene theme="black" size="content" snap={false} fullBleed>
          <InfiniteMarquee
            words={["WEB", "E-SHOP", "BRANDING", "SEO", "AUTOMATION", "AI"]}
            separator="✦"
            ariaLabel="Naše služby"
            theme="dark"
            durationSeconds={26}
          />
        </Scene>
      </div>
    </main>
  );
}
