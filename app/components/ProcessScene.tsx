import styles from "./ProcessScene.module.css";

const STEPS = [
  {
    number: "01",
    title: "SPOZNÁME",
    text: "Krátky call alebo stretnutie. Ciele, potreby, problémy a predstava.",
  },
  {
    number: "02",
    title: "NAVRHNEME",
    text: "Štruktúra, obsah, dizajn a konkrétne riešenie, ktoré dáva zmysel.",
  },
  {
    number: "03",
    title: "POSTAVÍME",
    text: "Implementácia, funkcie, testovanie, optimalizácia a doladenie detailov.",
  },
  {
    number: "04",
    title: "SPUSTÍME",
    text: "Launch nie je koniec. Sledujeme výsledky a pripravujeme ďalší rast.",
  },
];

/*
  Desktop: each step is a full-height sticky panel — as you scroll, the next
  step covers the previous one in place ("sticky stage"). The wrapping
  overflow:clip container keeps the stack from bleeding into whatever
  scene follows. Mobile: position:sticky is disabled below 1024px, so the
  steps fall back to a plain stacked list.
*/
export default function ProcessScene() {
  return (
    <div className={styles.wrapper}>
      {STEPS.map((step, index) => (
        <article className={styles.panel} key={step.number}>
          <div className={styles.panelInner}>
            <p className={styles.kicker}>PROCESS — KROK {step.number} / 04</p>
            <span className={styles.number}>{step.number}</span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>

            <div className={styles.progress} aria-hidden="true">
              {STEPS.map((dot, dotIndex) => (
                <span
                  key={dot.number}
                  className={`${styles.dot} ${
                    dotIndex === index ? styles.dotActive : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
