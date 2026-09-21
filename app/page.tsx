import Image from "next/image";
import MotionEffects from "./components/MotionEffects";
import SmoothScroll from "./components/SmoothScroll";
import SceneController from "./components/SceneController";
import Scene from "./components/Scene";
import InfiniteMarquee from "./components/InfiniteMarquee";
import ProcessScene from "./components/ProcessScene";
import WorkGallery from "./components/WorkGallery";
import GravityLab from "./components/GravityLab";
import TrustedBrands from "./components/TrustedBrands";
import styles from "./page.module.css";

/*
  Scene order. SceneController derives the background morph purely from the
  DOM order of [data-scene][data-theme], so this file is the single source of
  truth for the colour flow — there is no separate index list to keep in sync:

    hero black → approach cream → technology orange → services marquee black
    → web black → marketing orange → rast cream → consultation blue
    → pricing cream → process black → work cream → brands black
    → final CTA orange → playground purple → footer black

  THE ROCKETMAN METHOD scene is parked in components/RocketmanMethod.tsx and
  deliberately not rendered here.
*/
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
                <a
                  className={`${styles.button} ${styles.buttonOutline}`}
                  href="#work"
                  data-magnetic
                >
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

        {/*
          Scene 03 — SERVICES MARQUEE. Real continuous strip, not scroll-linked.
          Carries the #services anchor now that the WHAT WE DO scene is gone.
          themeAdaptive: the strip is short enough that the global background
          has already morphed to a neighbouring scene while the words are still
          on screen, so its ink follows the active theme, not its own.
        */}
        <Scene
          theme="black"
          id="services"
          size="content"
          fullBleed
          themeAdaptive
        >
          <InfiniteMarquee
            words={["WEB", "E-SHOP", "BRANDING", "SEO", "AUTOMATION", "AI"]}
            separator="✦"
            ariaLabel="Naše služby"
            durationSeconds={26}
          />
        </Scene>

        {/* Scene 04 — WEB */}
        <Scene theme="black">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">01 / WEB</p>
              <h2 className="scene-title" data-kinetic>
                WEB
              </h2>
              <p className="scene-kicker">
                WEBY • E-SHOPY • AUTOMATIZÁCIE • AI RIEŠENIA
              </p>
              <p data-reveal="up">
                Digitálne priestory s jasnou logikou. Od jednoduchej
                prezentačnej stránky až po e-shop a custom riešenia.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/03-web-ui-orbit.png"
                alt=""
                width={850}
                height={850}
                data-parallax="55"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 05 — MARKETING */}
        <Scene theme="orange">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <p className="scene-kicker">02 / MARKETING</p>
              {/* One long word in the narrower column — scene-title--long
                  keeps it inside the frame instead of running off the right. */}
              <h2 className="scene-title scene-title--long" data-kinetic>
                MARKETING
              </h2>
              <p className="scene-kicker">BRAND • SOCIAL • KAMPANE • SEO</p>
              <p data-reveal="up">
                Komunikácia, ktorá má hlas a charakter. Od vizuálnej identity
                cez obsah až po kampane postavené na výsledkoch.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/04-marketing-megaphone.png"
                alt=""
                width={850}
                height={850}
                data-parallax="55"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 06 — RAST (cream base, strong blue accent moment) */}
        <Scene theme="cream">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">03 / RAST</p>
              <h2 className="scene-title" data-kinetic>
                <span className={styles.blueAccent}>RAST</span>
              </h2>
              <p className="scene-kicker">
                STRATÉGIA • DÁTA • PROCESY • ŠKÁLOVANIE
              </p>
              <p data-reveal="up">
                Rast nie je náhoda. Hľadáme slabé miesta, zjednodušujeme
                procesy a vytvárame{" "}
                <span className={styles.blueAccent}>systém pripravený</span>{" "}
                na ďalší krok.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/05-growth-rocket-analytics.png"
                alt=""
                width={850}
                height={850}
                data-parallax="55"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 07 — BEZPLATNÁ KONZULTÁCIA */}
        <Scene theme="blue">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">NO STRINGS ATTACHED</p>
              <h2 className="scene-title" data-kinetic>
                BEZPLATNÁ
                <br />
                <span className="scene-accent">KONZULTÁCIA.</span>
              </h2>
              <p data-reveal="up">
                Najprv pochopíme projekt, problém a cieľ. Krátky call alebo
                stretnutie, bez záväzkov a bez predajných rečí.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/11-consultation-orbit.png"
                alt=""
                width={900}
                height={900}
                data-parallax="55"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 08 — JASNÁ CENOVÁ PONUKA */}
        <Scene theme="cream">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <p className="scene-kicker">CLEAR FROM DAY ONE</p>
              <h2 className="scene-title" data-kinetic>
                JASNÁ
                <br />
                CENOVÁ
                <br />
                <span className="scene-accent">PONUKA.</span>
              </h2>
              <p data-reveal="up">
                Pred začiatkom dostanete návrh riešenia, rozsah projektu a
                cenu. Bez prekvapení po ceste.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/12-project-blueprint.png"
                alt=""
                width={900}
                height={900}
                data-parallax="55"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 09 — PROCESS (desktop sticky stage, mobile plain stack) */}
        <Scene theme="black" id="process" size="content" fullBleed>
          <ProcessScene />
        </Scene>

        {/*
          Scene 10 — SELECTED WORK gallery / poster stack.
          The old standalone WORK INTRO scene is folded into this heading, so
          the gallery is no longer preceded by a whole extra screen of scroll.
        */}
        <Scene theme="cream" id="work" size="content" fullBleed themeAdaptive>
          <div className={styles.sectionHeading}>
            <p className="scene-kicker">SELECTED WORK</p>
            <h2 className={styles.sectionTitle}>
              NIE KARTY.{" "}
              <span className="scene-accent">DIGITÁLNE PLAGÁTY.</span>
            </h2>
          </div>

          <WorkGallery />
        </Scene>

        {/* Scene 11 — BRANDS WE HAVE WORKED WITH */}
        <Scene theme="black" size="content" fullBleed themeAdaptive>
          <div className={styles.brandsHeading}>
            <p className="scene-kicker">BRANDS WE&apos;VE WORKED WITH</p>
          </div>
          <TrustedBrands />
        </Scene>

        {/* Scene 12 — FINAL CTA */}
        <Scene theme="orange" id="contact">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">HAVE SOMETHING WORTH BUILDING?</p>
              <h2 className="scene-title" data-kinetic>
                READY
                <br />
                FOR
                <br />
                <span className="scene-accent">LAUNCH?</span>
              </h2>
              <p data-reveal="up">
                Prvé stretnutie je bezplatné. Povedzte nám, čo chcete
                postaviť, a pripravíme ďalší krok.
              </p>
              <div className={styles.heroActions}>
                <a
                  className={`${styles.button} ${styles.buttonBlack}`}
                  href="mailto:info@rocketman.digital"
                  data-magnetic
                >
                  START A PROJECT ↗
                </a>
              </div>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/01-astronaut-launch.png"
                alt=""
                width={850}
                height={850}
                data-parallax="50"
              />
            </div>
          </div>
        </Scene>

        {/* Scene 13 — PLAYGROUND / GRAVITY LAB, last scene before the footer */}
        <Scene theme="purple">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">PLAYGROUND</p>
              <h2 className="scene-title" data-kinetic>
                GRAVITY
                <br />
                IS JUST A
                <br />
                <span className="scene-accent">SUGGESTION.</span>
              </h2>
              <p data-reveal="up">MOVE YOUR CURSOR. BREAK SOME RULES.</p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <GravityLab />
            </div>
          </div>
        </Scene>

        {/* Scene 14 — FOOTER */}
        <Scene theme="black" size="content" id="footer">
          <div>
            <div className={styles.footerGrid}>
              <Image
                src="/rocketman-logo.svg"
                alt="Rocketman"
                width={150}
                height={42}
              />
              <p className={styles.footerSlogan}>
                THE TENDENCY TO{" "}
                <span className="scene-accent">GROW.</span>
              </p>
              <nav className={styles.footerNav} aria-label="Pätičková navigácia">
                <a href="#services">SLUŽBY</a>
                <a href="#work">WORK</a>
                <a href="#contact">KONTAKT</a>
              </nav>
            </div>

            <div className={styles.footerBottom}>
              <span>© 2026 ROCKETMAN.DIGITAL</span>
              <span>WEB / MARKETING / GROWTH</span>
            </div>
          </div>
        </Scene>
      </div>
    </main>
  );
}
