import Image from "next/image";
import Link from "next/link";
import { CookieSettingsLink } from "./CookieConsent";
import Scene from "./Scene";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  /* Same rule as SiteHeader: in-page hashes on "/", routed links elsewhere. */
  home?: boolean;
};

export default function SiteFooter({ home = false }: SiteFooterProps) {
  const section = (hash: string) => (home ? hash : `/${hash}`);

  return (
    <Scene
      theme="black"
      size="content"
      id="footer"
      solid
      className={styles.footer}
    >
      <div>
        <div className={styles.footerGrid}>
          <Image
            src="/rocketman-logo.svg"
            alt="Rocketman"
            width={150}
            height={42}
          />
          <p className={styles.footerSlogan}>
            THE TENDENCY TO <span className="scene-accent">GROW.</span>
          </p>
          <nav className={styles.footerNav} aria-label="Pätičková navigácia">
            <Link href={section("#services")}>SLUŽBY</Link>
            <Link href={section("#work")}>WORK</Link>
            <Link href="/kontakt">KONTAKT</Link>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 ROCKETMAN.DIGITAL</span>
          <span>WEB / MARKETING / GROWTH</span>
        </div>

        <div className={styles.footerLegal}>
          <a
            href="/ochrana-osobnych-udajov.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ochrana osobných údajov
          </a>
          <CookieSettingsLink className={styles.footerLegalButton} />
        </div>
      </div>
    </Scene>
  );
}
