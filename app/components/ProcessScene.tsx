import type { ReactNode } from "react";
import RocketIcon from "./RocketIcon";
import styles from "./ProcessScene.module.css";

/* Line icons after Feather (MIT), 24px grid, drawn in currentColor. */
const lineIcon = (children: ReactNode) => (
  <svg
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const STEPS = [
  {
    number: "01",
    title: "SPOZNÁME",
    text: "Krátky call alebo stretnutie. Ciele, potreby, problémy a predstava.",
    icon: lineIcon(
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    number: "02",
    title: "NAVRHNEME",
    text: "Štruktúra, obsah, dizajn a konkrétne riešenie, ktoré dáva zmysel.",
    icon: lineIcon(
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
  },
  {
    number: "03",
    title: "POSTAVÍME",
    text: "Implementácia, funkcie, testovanie, optimalizácia a doladenie detailov.",
    icon: lineIcon(
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    number: "04",
    title: "SPUSTÍME",
    text: "Launch nie je koniec. Sledujeme výsledky a pripravujeme ďalší rast.",
    icon: <RocketIcon size={26} />,
  },
];

/*
  Four equal cards in one centred row.

  It used to be a single left-aligned path: dots joined by a line that simply
  stopped after step 04, with the whole block hugging the left edge — it read
  as a flow that ran out rather than a finished section. Each step is now a
  self-contained card of the same size, the row is centred under a centred
  kicker, and nothing points off the edge. Still no JavaScript and no sticky
  stage. Below 1025px the cards go 2×2, below 561px they stack.
*/
export default function ProcessScene() {
  return (
    <div className={styles.section}>
      <p className={`scene-kicker ${styles.kicker}`}>PROCESS</p>

      <ol className={styles.track}>
        {STEPS.map((step) => (
          <li className={styles.step} key={step.number} data-reveal="up">
            <div className={styles.head}>
              <span className={styles.number}>{step.number}</span>
              <span className={styles.icon}>{step.icon}</span>
            </div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
