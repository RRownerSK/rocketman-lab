import type { Metadata } from "next";
import Image from "next/image";
import MotionEffects from "../components/MotionEffects";
import SmoothScroll from "../components/SmoothScroll";
import SceneController from "../components/SceneController";
import Scene from "../components/Scene";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";
// The CTA pills are the homepage's own, reused so both pages share one button.
import home from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kontakt — Rocketman",
  description:
    "Napíšte nám alebo zavolajte. Prvé stretnutie je bezplatné — povedzte nám, čo chcete postaviť.",
  alternates: { canonical: "/kontakt" },
};

const EMAIL = "info@rocketman.digital";
const PHONE_DISPLAY = "+421 917 746 172";
const PHONE_HREF = "tel:+421917746172";

/*
  TODO: replace the "#" placeholders with the real profile URLs.
*/
const SOCIALS = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
] as const;

type SocialIcon = (typeof SOCIALS)[number]["icon"];

/* Line icons after Feather (MIT), drawn in currentColor. */
function SocialGlyph({ icon }: { icon: SocialIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  if (icon === "facebook") {
    return (
      <svg {...common}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/*
  Scene order (SceneController reads it straight from the DOM):
    hero black → contact card orange → message form cream → footer black
*/
export default function KontaktPage() {
  return (
    <main>
      <SmoothScroll />
      <SceneController />
      <MotionEffects />

      <div className="scene-deck">
        {/* Scene 00 — HERO */}
        <Scene theme="black" id="top" size="content" className={styles.hero}>
          <SiteHeader current="kontakt" />

          <div className={`scene-copy ${styles.heroCopy}`}>
            <p className="scene-kicker" data-hero-kicker>
              KONTAKT / ROCKETMAN.DIGITAL
            </p>

            <h1 className="scene-title" data-hero-title>
              Kontaktujte
              <br />
              <span className="scene-accent">nás.</span>
            </h1>

            <p data-hero-copy>
              Máte projekt, nápad alebo len otázku? Prvé stretnutie je
              bezplatné a bez záväzkov.
            </p>

            <div className={home.heroActions} data-hero-actions>
              <a
                className={`${home.button} ${home.buttonOrange}`}
                href="#sprava"
                data-magnetic
              >
                NAPÍSAŤ SPRÁVU ↓
              </a>
              <a
                className={`${home.button} ${home.buttonOutline}`}
                href={PHONE_HREF}
                data-magnetic
              >
                ZAVOLAŤ ↗
              </a>
            </div>
          </div>
        </Scene>

        {/* Scene 01 — CONTACT CARD: art left, details right */}
        <Scene theme="orange">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <h2 className="scene-title" data-kinetic>
                KONTAKT
              </h2>

              <ul className={styles.details} data-reveal="up">
                <li className={styles.person}>Filip Bajtoš</li>
                <li>
                  <span className={styles.detailLabel}>E-mail</span>
                  <a className={styles.detailLink} href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <span className={styles.detailLabel}>Telefón</span>
                  <a className={styles.detailLink} href={PHONE_HREF}>
                    {PHONE_DISPLAY}
                  </a>
                </li>
              </ul>

              <ul
                className={styles.socials}
                aria-label="Sociálne siete"
                data-reveal="up"
              >
                {SOCIALS.map((social) => (
                  <li key={social.icon}>
                    <a
                      className={styles.social}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (otvorí sa v novom okne)`}
                      data-magnetic
                    >
                      <SocialGlyph icon={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true" data-tilt>
              <Image
                src="/assets/astronaut.png"
                alt=""
                width={850}
                height={850}
                data-parallax="50"
              />
            </div>
          </div>
        </Scene>

        {/*
          Scene 02 — MESSAGE + FORM. themeAdaptive: the footer below is too
          short to take over at the viewport centre, so the background only
          turns black at the very bottom — while the end of the form is still
          on screen. Its ink follows the active theme so it stays readable.
        */}
        <Scene theme="cream" id="sprava" size="content" themeAdaptive>
          <div className={styles.messageGrid}>
            <div className="scene-copy">
              <p className="scene-kicker">NAPÍŠTE NÁM</p>
              <h2 className={styles.messageTitle} data-kinetic>
                Zanechajte nám správu{" "}
                <span className="scene-accent">nižšie.</span>
              </h2>
              <p data-reveal="up">
                Hľadáte partnera na web, marketing alebo rast? Radi sa
                pustíme do spolupráce. Povedzte nám, čo chcete postaviť, a
                pripravíme ďalší krok.
              </p>
            </div>

            <div data-reveal="up">
              <ContactForm />
            </div>
          </div>
        </Scene>

        <SiteFooter />
      </div>
    </main>
  );
}
