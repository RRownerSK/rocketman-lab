import Image from "next/image";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  /*
    On the homepage the section links stay plain in-page hashes; everywhere
    else they have to route back to "/" first.
  */
  home?: boolean;
  current?: "kontakt";
};

export default function SiteHeader({ home = false, current }: SiteHeaderProps) {
  const section = (hash: string) => (home ? hash : `/${hash}`);

  return (
    <header className={styles.nav} data-hero-nav>
      <Link href={home ? "#top" : "/"} aria-label="Rocketman domov">
        <Image
          src="/rocketman-logo.svg"
          alt="Rocketman"
          width={152}
          height={42}
          priority
        />
      </Link>

      <nav className={styles.navLinks} aria-label="Hlavná navigácia">
        <Link href={section("#work")}>WORK</Link>
        <Link href={section("#services")}>SLUŽBY</Link>
        <Link href={section("#process")}>PROCES</Link>
        <Link
          href="/kontakt"
          aria-current={current === "kontakt" ? "page" : undefined}
        >
          KONTAKT
        </Link>
      </nav>
    </header>
  );
}
