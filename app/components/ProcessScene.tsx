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
  One plain section: the four steps sit side by side on a single path, all
  readable at a glance.

  This used to be a sticky stage that held the page for four separate scroll
  gestures before it let you move on. No sticky, no scroll-driven state, no
  JavaScript at all — the section scrolls past like any other. Below 1025px it
  becomes two columns and then one, and the connecting path drops out with the
  row it belonged to.
*/
export default function ProcessScene() {
  return (
    <div className={styles.section}>
      <p className="scene-kicker">PROCESS</p>

      <ol className={styles.track}>
        {STEPS.map((step) => (
          <li className={styles.step} key={step.number}>
            <span className={styles.number}>{step.number}</span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
