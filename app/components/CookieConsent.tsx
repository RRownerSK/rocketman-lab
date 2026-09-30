"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./CookieConsent.module.css";

/*
  Cookie banner + settings panel, and the only place Google Analytics loads.

  The stored choice lives in localStorage under "cookie-consent". gtag.js is
  rendered (and so attached to the DOM) only while that choice says
  analytics: true AND a measurement ID is configured — never before, never
  "just in case". The server render and hydration always see "no choice", so
  nothing analytics-related can slip into the HTML either.

  The footer's "Nastavenia cookies" link reopens the panel through
  openCookieSettings(), prefilled with whatever is stored.
*/

type Consent = {
  necessary: true;
  analytics: boolean;
  decided: true;
};

const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent:change";
const OPEN_EVENT = "cookie-consent:open";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PRIVACY_PDF = "/ochrana-osobnych-udajov.pdf";

const readRaw = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/* Parsed once per raw string, so useSyncExternalStore gets a stable object. */
let cachedRaw: string | null = null;
let cachedConsent: Consent | null = null;

const getConsent = (): Consent | null => {
  const raw = readRaw();
  if (raw === cachedRaw) return cachedConsent;

  cachedRaw = raw;
  cachedConsent = null;
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.decided === true) {
      cachedConsent = {
        necessary: true,
        analytics: parsed.analytics === true,
        decided: true,
      };
    }
  } catch {
    // A corrupted value counts as no decision: the banner asks again.
  }
  return cachedConsent;
};

const saveConsent = (analytics: boolean) => {
  const consent: Consent = { necessary: true, analytics, decided: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage blocked: the choice still holds for this page view below.
    cachedRaw = JSON.stringify(consent);
    cachedConsent = consent;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

const noopSubscribe = () => () => {};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(OPEN_EVENT));
};

/* Withdrawn consent: stop gtag sending and drop the _ga cookies it set. */
const disableAnalytics = () => {
  if (!GA_ID) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;

  const domain = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    for (const scope of ["", `; domain=${domain}`, `; domain=.${domain}`]) {
      document.cookie = `${name}=; max-age=0; path=/${scope}`;
    }
  });
};

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getConsent, () => null);
  // False in the server render and during hydration, so the banner never ships in the HTML.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const analyticsOn = consent?.analytics === true;
  const showBanner = hydrated && !consent && !panelOpen;

  useEffect(() => {
    const open = () => {
      setAnalyticsChoice(getConsent()?.analytics === true);
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (panelOpen && !dialog.open) dialog.showModal();
    if (!panelOpen && dialog.open) dialog.close();
  }, [panelOpen]);

  useEffect(() => {
    if (!GA_ID) return;
    if (analyticsOn) {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
    } else if (consent) {
      disableAnalytics();
    }
  }, [analyticsOn, consent]);

  /*
    While the banner is up, publish its height so the scroll-to-top rocket
    can sit above it instead of underneath.
  */
  useEffect(() => {
    const root = document.documentElement;
    const banner = bannerRef.current;
    if (!showBanner || !banner) {
      root.style.removeProperty("--cookie-banner-offset");
      return;
    }

    const update = () =>
      root.style.setProperty(
        "--cookie-banner-offset",
        `${banner.getBoundingClientRect().height + 12}px`
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(banner);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-banner-offset");
    };
  }, [showBanner]);

  const acceptAll = () => saveConsent(true);

  const openPanel = () => {
    setAnalyticsChoice(consent?.analytics === true);
    setPanelOpen(true);
  };

  const savePreferences = () => {
    saveConsent(analyticsChoice);
    setPanelOpen(false);
  };

  return (
    <>
      {showBanner && (
        <div
          ref={bannerRef}
          className={styles.banner}
          role="region"
          aria-label="Súhlas s cookies"
        >
          <p className={styles.text}>
            Tento web používa cookies. Nevyhnutné zabezpečujú jeho fungovanie,
            analytické (Google Analytics) použijeme len s vaším súhlasom.{" "}
            <a href={PRIVACY_PDF} target="_blank" rel="noopener noreferrer">
              Ochrana osobných údajov
            </a>
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              onClick={acceptAll}
            >
              Súhlasím
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.secondary}`}
              onClick={openPanel}
            >
              Vybrať manuálne
            </button>
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="cookie-settings-title"
        onClose={() => setPanelOpen(false)}
        // Lenis would otherwise swallow wheel scrolling inside the panel.
        data-lenis-prevent
      >
        <h2 id="cookie-settings-title" className={styles.title}>
          Nastavenia cookies
        </h2>
        <p className={styles.text}>
          Vyberte, ktoré kategórie cookies povoľujete. Voľbu môžete kedykoľvek
          zmeniť cez odkaz „Nastavenia cookies“ v pätičke.{" "}
          <a href={PRIVACY_PDF} target="_blank" rel="noopener noreferrer">
            Ochrana osobných údajov
          </a>
        </p>

        <ul className={styles.categories}>
          <li className={styles.category}>
            <div>
              <span className={styles.categoryName}>Nevyhnutné</span>
              <span className={styles.categoryNote}>
                Potrebné na fungovanie webu a uloženie tejto voľby. Vždy
                zapnuté.
              </span>
            </div>
            <input
              type="checkbox"
              role="switch"
              className={styles.switch}
              checked
              disabled
              aria-label="Nevyhnutné cookies (vždy zapnuté)"
            />
          </li>
          <li className={styles.category}>
            <label htmlFor="cookie-analytics">
              <span className={styles.categoryName}>
                Analytické (Google Analytics)
              </span>
              <span className={styles.categoryNote}>
                Anonymné štatistiky návštevnosti, ktoré nám pomáhajú web
                zlepšovať.
              </span>
            </label>
            <input
              id="cookie-analytics"
              type="checkbox"
              role="switch"
              className={styles.switch}
              checked={analyticsChoice}
              onChange={(event) => setAnalyticsChoice(event.target.checked)}
            />
          </li>
        </ul>

        <button
          type="button"
          className={`${styles.button} ${styles.primary} ${styles.save}`}
          onClick={savePreferences}
        >
          Uložiť predvoľby
        </button>
      </dialog>

      {GA_ID && analyticsOn && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}

/* Footer link that reopens the settings panel. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Nastavenia cookies
    </button>
  );
}
