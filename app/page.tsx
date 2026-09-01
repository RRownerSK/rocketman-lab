import Image from "next/image";
import MotionEffects from "./components/MotionEffects";
import SmoothScroll from "./components/SmoothScroll";
import SceneController from "./components/SceneController";
import Scene from "./components/Scene";
import InfiniteMarquee from "./components/InfiniteMarquee";
import ProcessScene from "./components/ProcessScene";
import WorkGallery from "./components/WorkGallery";
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

        {/* Scene 04 — WHAT WE DO */}
        <Scene theme="cream" id="services">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">WHAT WE DO</p>
              <h2 className="scene-title" data-kinetic>
                TRI SMERY.
                <br />
                <span className="scene-accent">JEDEN CIEĽ.</span>
              </h2>
            </div>

            <div className="scene-copy" data-reveal="right">
              <p>
                Web, marketing a rast nevnímame ako tri oddelené služby.
                Spájame ich do jedného systému.
              </p>
              <p>
                Cieľ je jednoduchý: aby značka lepšie vyzerala, lepšie
                fungovala a mala kam rásť.
              </p>
            </div>
          </div>
        </Scene>

        {/* Scene 05 — WEB */}
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

        {/* Scene 06 — MARKETING */}
        <Scene theme="orange">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <p className="scene-kicker">02 / MARKETING</p>
              <h2 className="scene-title" data-kinetic>
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

        {/* Scene 07 — RAST (cream base, strong blue accent moment) */}
        <Scene theme="cream">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">03 / RAST</p>
              <h2 className="scene-title" data-kinetic>
                <span className={styles.blueUnderline}>RAST</span>
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

        {/* Scene 08 — BEZPLATNÁ KONZULTÁCIA */}
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

        {/* Scene 09 — JASNÁ CENOVÁ PONUKA */}
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

        {/* Scene 10 — PROCESS (desktop sticky stage, mobile plain stack) */}
        <Scene theme="black" id="process" size="content" snap={false} fullBleed>
          <ProcessScene />
        </Scene>

        {/* Scene 11 — WORK INTRO */}
        <Scene theme="cream">
          <div className="scene-copy">
            <p className="scene-kicker">SELECTED WORK</p>
            <h2 className="scene-title" data-kinetic>
              NIE KARTY.
              <br />
              <span className="scene-accent">DIGITÁLNE PLAGÁTY.</span>
            </h2>
            <p data-reveal="up">
              Vybrané projekty, pri ktorých sme riešili rozdielne problémy,
              značky aj ciele.
            </p>
          </div>
        </Scene>

        {/* Scene 12 — SELECTED WORK gallery / poster stack */}
        <Scene theme="cream" id="work" size="content" snap={false} fullBleed>
          <WorkGallery />
        </Scene>

        {/*
          Scene 13 — THE ROCKETMAN METHOD (BUILD / LAUNCH / SCALE)
          Sticky stack wrapped in overflow:clip so it is guaranteed to end
          exactly at its own bottom edge and never bleed into Playground.
        */}
        <Scene theme="black" size="content" snap={false} fullBleed>
          <div className={styles.methodWrapper}>
            <article className={styles.methodStep}>
              <div className={styles.methodStepInner}>
                <div className={styles.methodArt} aria-hidden="true" data-tilt>
                  <Image
                    src="/06-build-modules-isometric.png"
                    alt=""
                    width={650}
                    height={650}
                  />
                </div>
                <div className={styles.methodCopy}>
                  <span>THE ROCKETMAN METHOD — 01 / BUILD</span>
                  <h3>POSTAVÍME PEVNÝ ZÁKLAD.</h3>
                  <p>
                    Štruktúra, obsah, dizajn a technológia musia fungovať ako
                    jeden systém. Najprv logika, potom efekty.
                  </p>
                </div>
              </div>
            </article>

            <article className={`${styles.methodStep} ${styles.methodStepReverse}`}>
              <div className={styles.methodStepInner}>
                <div className={styles.methodArt} aria-hidden="true" data-tilt>
                  <Image
                    src="/07-launch-burst-arrow.png"
                    alt=""
                    width={650}
                    height={650}
                  />
                </div>
                <div className={styles.methodCopy}>
                  <span>02 / LAUNCH</span>
                  <h3>SPUSTÍME TO MEDZI ĽUDÍ.</h3>
                  <p>
                    Testovanie, výkon, analytika a ostrý štart. Launch je
                    moment, keď dizajn prestáva byť návrhom a začne pracovať.
                  </p>
                </div>
              </div>
            </article>

            <article className={styles.methodStep}>
              <div className={styles.methodStepInner}>
                <div className={styles.methodArt} aria-hidden="true" data-tilt>
                  <Image
                    src="/08-growth-chart-orbit.png"
                    alt=""
                    width={650}
                    height={650}
                  />
                </div>
                <div className={styles.methodCopy}>
                  <span>03 / SCALE</span>
                  <h3>MERIAME. UPRAVUJEME. RASTIEME.</h3>
                  <p>
                    Dáta, nové funkcie, automatizácie a ďalšie kroky podľa
                    toho, čo reálne funguje. Nie podľa pocitu.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Scene>
      </div>
    </main>
  );
}
