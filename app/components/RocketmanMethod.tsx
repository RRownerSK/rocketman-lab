import Image from "next/image";
import styles from "./RocketmanMethod.module.css";

/*
  THE ROCKETMAN METHOD — BUILD / LAUNCH / SCALE.

  Parked on purpose: this scene is no longer part of the homepage flow, it is
  only lifted out of page.tsx into its own module so it stays intact for a
  future sub-page. Drop it back in with:

    <Scene theme="black" size="content" fullBleed>
      <RocketmanMethod />
    </Scene>

  Sticky stack wrapped in overflow:clip so it is guaranteed to end exactly at
  its own bottom edge and never bleed into the scene that follows.
*/
export default function RocketmanMethod() {
  return (
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
              Štruktúra, obsah, dizajn a technológia musia fungovať ako jeden
              systém. Najprv logika, potom efekty.
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
              Testovanie, výkon, analytika a ostrý štart. Launch je moment, keď
              dizajn prestáva byť návrhom a začne pracovať.
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
              Dáta, nové funkcie, automatizácie a ďalšie kroky podľa toho, čo
              reálne funguje. Nie podľa pocitu.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
