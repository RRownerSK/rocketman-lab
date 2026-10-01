"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { getLenis } from "./lenisInstance";
import styles from "./PricingCalculator.module.css";

/*
  "Kalkulačka letu" — a five-step price estimate in a modal, ending in a lead
  form. Three ways in: the astronaut teaser in the corner, "Cenník" in the
  header and the button in the consultation scene. The last two live in
  server components, so they reach the modal through openPricingCalculator()
  (a window event) via PricingCalculatorButton.

  The teaser sits directly above the scroll-to-top rocket and shows up at the
  same scroll depth; both ride --cookie-banner-offset while the cookie banner
  is up, so none of the three overlap. Closing its speech bubble leaves just
  the round astronaut, and that choice is remembered in localStorage.

  The lead goes to the same Formspree endpoint as ContactForm, with the same
  special field names (email → Reply-To, subject → Subject, _gotcha →
  honeypot). The estimate travels as readable fields plus a `message` that
  sums it all up in one block.
*/

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const OPEN_EVENT = "pricing-calculator:open";
const TEASER_KEY = "pricing-teaser-dismissed";
const TEASER_EVENT = "pricing-teaser:change";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Same check as ContactForm: digits with the usual separators, 9+ digits. */
const isValidPhone = (phone: string) =>
  /^\+?[\d\s/().-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 9;

type ProjectType = "web" | "eshop";

type Package = {
  id: string;
  name: string;
  price: number;
  features: string[];
  badge?: string;
};

const PROJECT_TYPES: { id: ProjectType; label: string; note: string }[] = [
  { id: "web", label: "Webová stránka", note: "Prezentácia, služby, portfólio" },
  { id: "eshop", label: "E-shop", note: "Predaj produktov online" },
];

const PACKAGES: Record<ProjectType, Package[]> = {
  web: [
    {
      id: "start",
      name: "ŠTART",
      price: 350,
      features: [
        "1–3 podstránky",
        "Kontaktný formulár",
        "Responzívny dizajn",
        "Základné SEO",
        "Zabezpečenie + SSL",
        "Zaškolenie",
      ],
    },
    {
      id: "orbit",
      name: "ORBIT",
      price: 550,
      features: [
        "4–7 podstránok",
        "Pokročilý formulár (automatické odpovede)",
        "SEO optimalizácia",
        "Prepojenie Google Analytics / Search Console",
        "Rýchlostná optimalizácia",
        "Základná automatizácia",
      ],
    },
    {
      id: "galaxia",
      name: "GALAXIA",
      price: 850,
      badge: "🔥 Najkomplexnejšie riešenie",
      features: [
        "Individuálny UX návrh",
        "Predajná štruktúra stránky",
        "Pokročilé SEO + analýza kľúčových slov",
        "Integrácia email marketingu",
        "Základný funnel / lead magnet",
        "Automatizácie",
        "Custom prvok",
        "Optimalizácia konverzií",
        "Technická optimalizácia výkonu",
      ],
    },
  ],
  eshop: [
    {
      id: "mesiac",
      name: "MESIAC",
      price: 450,
      features: [
        "One page štruktúra (1–3 produkty)",
        "Platobná brána",
        "Základná automatizácia emailov",
        "Jednoduchý checkout",
        "Responzívny dizajn",
      ],
    },
    {
      id: "planeta",
      name: "PLANÉTA",
      price: 650,
      features: [
        "Kompletný e-shop",
        "Platobné brány",
        "Doprava",
        "Produkty a kategórie",
        "SEO produktov",
        "Základná analytika",
        "Zabezpečenie",
      ],
    },
    {
      id: "sustava",
      name: "SÚSTAVA",
      price: 1150,
      badge: "🔥 Najkomplexnejšie riešenie",
      features: [
        "Pokročilá UX štruktúra",
        "Predajný funnel",
        "Upsell / cross-sell",
        "Email marketing automatizácie",
        "Segmentácia zákazníkov",
        "Optimalizovaný checkout",
        "Pokročilé SEO",
        "Rýchlostná optimalizácia",
        "Integrácia CRM / fakturácie",
        "Custom funkcia",
      ],
    },
  ],
};

type Addon = {
  id: string;
  label: string;
  price: number;
  /* Only offered with these packages; everything else always shows. */
  onlyFor?: string[];
};

const ADDONS: Addon[] = [
  {
    id: "translate",
    label: "Univerzálny prekladač (preklad stránky do ďalšieho jazyka)",
    price: 300,
  },
  {
    id: "gdpr",
    label: "Ochranný štít (GDPR + cookies dokumentácia)",
    price: 50,
  },
  {
    id: "autoreply",
    label: "Pokročilý komunikačný modul (automatické odpovede na formulári)",
    price: 50,
    onlyFor: ["start", "mesiac"],
  },
];

const CARE_LABEL = "Misijná kontrola (mesačná starostlivosť a údržba)";
const CARE_PRICE = 50;
const MODULE_PRICE = 30;
const MAX_MODULES = 30;

const STEPS = ["Misia", "Balík", "Moduly", "Doplnky", "Výsledok"];

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("sk-SK").format(value)} €`;

const addonsFor = (packageId: string | null) =>
  ADDONS.filter((addon) => !addon.onlyFor || addon.onlyFor.includes(packageId ?? ""));

/* Same trigger as ScrollToTop: about one screen scrolled. */
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);

  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};

const isPastFirstScreen = () => window.scrollY > window.innerHeight * 0.9;

const subscribeTeaser = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(TEASER_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(TEASER_EVENT, onChange);
  };
};

/* Held in memory too, so dismissing works even with storage blocked. */
let teaserDismissed = false;

const isTeaserDismissed = () => {
  try {
    return teaserDismissed || window.localStorage.getItem(TEASER_KEY) === "1";
  } catch {
    return teaserDismissed;
  }
};

const dismissTeaser = () => {
  teaserDismissed = true;
  try {
    window.localStorage.setItem(TEASER_KEY, "1");
  } catch {
    // Storage blocked: the in-memory flag covers this page view.
  }
  window.dispatchEvent(new Event(TEASER_EVENT));
};

export const openPricingCalculator = () => {
  window.dispatchEvent(new Event(OPEN_EVENT));
};

/* For server components (header, homepage) that need to open the modal. */
export function PricingCalculatorButton({
  className,
  children,
  magnetic = false,
}: {
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={openPricingCalculator}
      aria-haspopup="dialog"
      data-magnetic={magnetic || undefined}
    >
      {children}
    </button>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function PricingCalculator() {
  const launcherVisible = useSyncExternalStore(
    subscribeScroll,
    isPastFirstScreen,
    () => false
  );
  const teaserCollapsed = useSyncExternalStore(
    subscribeTeaser,
    isTeaserDismissed,
    () => false
  );

  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [packageId, setPackageId] = useState<string | null>(null);
  const [modules, setModules] = useState(0);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [care, setCare] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const selectedPackage =
    PACKAGES[projectType ?? "web"].find((pkg) => pkg.id === packageId) ?? null;
  const availableAddons = addonsFor(packageId);
  const chosenAddons = availableAddons.filter((addon) =>
    addonIds.includes(addon.id)
  );
  const total =
    (selectedPackage?.price ?? 0) +
    modules * MODULE_PRICE +
    chosenAddons.reduce((sum, addon) => sum + addon.price, 0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // The page behind stays put while the modal is up.
      getLenis()?.stop();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const openFromOutside = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, openFromOutside);
    return () => window.removeEventListener(OPEN_EVENT, openFromOutside);
  }, []);

  // New step: start at its top and let screen readers hear its question.
  useEffect(() => {
    if (!open) return;
    bodyRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, open]);

  const reset = () => {
    setStep(0);
    setDirection("forward");
    setProjectType(null);
    setPackageId(null);
    setModules(0);
    setAddonIds([]);
    setCare(false);
    setStatus("idle");
    setEmailError("");
    setPhoneError("");
  };

  const handleClose = () => {
    setOpen(false);
    getLenis()?.start();
    // A sent lead starts the next visit from scratch; anything else is kept.
    if (status === "success") reset();
  };

  /*
    Closes the dialog and syncs state directly rather than waiting for the
    dialog's close event (which only covers Esc here). handleClose may then
    run twice; it is idempotent.
  */
  const closeDialog = () => {
    dialogRef.current?.close();
    handleClose();
  };

  const goTo = (next: number) => {
    setDirection(next > step ? "forward" : "back");
    setStep(next);
  };

  const chooseType = (type: ProjectType) => {
    if (type !== projectType) {
      setProjectType(type);
      setPackageId(null);
      setAddonIds([]);
    }
    goTo(1);
  };

  const choosePackage = (id: string) => {
    setPackageId(id);
    // Drop add-ons the new package does not offer.
    const allowed = addonsFor(id).map((addon) => addon.id);
    setAddonIds((prev) => prev.filter((addonId) => allowed.includes(addonId)));
    goTo(2);
  };

  const toggleAddon = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((addonId) => addonId !== id) : [...prev, id]
    );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPackage) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const meno = String(data.get("meno") ?? "").trim();
    const priezvisko = String(data.get("priezvisko") ?? "").trim();
    const telefon = String(data.get("telefon") ?? "").trim();
    const name = [meno, priezvisko].filter(Boolean).join(" ");

    const nextEmailError = !email
      ? "Zadajte, prosím, váš e-mail."
      : !EMAIL_PATTERN.test(email)
        ? "E-mail nemá správny formát, napr. meno@firma.sk."
        : "";
    const nextPhoneError =
      telefon && !isValidPhone(telefon)
        ? "Telefón nemá správny formát, napr. +421 900 123 456."
        : "";

    setEmailError(nextEmailError);
    setPhoneError(nextPhoneError);

    if (nextEmailError || nextPhoneError) {
      form
        .querySelector<HTMLElement>(`[name="${nextEmailError ? "email" : "telefon"}"]`)
        ?.focus();
      return;
    }

    if (!ENDPOINT) {
      console.error(
        "PricingCalculator: NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set in .env.local."
      );
      setStatus("error");
      return;
    }

    const typeLabel =
      PROJECT_TYPES.find((type) => type.id === projectType)?.label ?? "";
    const addonsText = chosenAddons.length
      ? chosenAddons
          .map((addon) => `${addon.label} (+${formatPrice(addon.price)})`)
          .join(", ")
      : "žiadne";
    const careText = care ? `áno, od ${formatPrice(CARE_PRICE)}/mesiac` : "nie";

    // Formspree's `name` carries the full name; the two halves are folded in.
    data.delete("meno");
    data.delete("priezvisko");
    data.set("email", email);
    if (name) data.set("name", name);
    if (telefon) data.set("telefon", telefon);
    else data.delete("telefon");

    data.set("subject", `Dopyt z kalkulačky letu – ${selectedPackage.name}`);
    data.set("typ_projektu", typeLabel);
    data.set(
      "balik",
      `${selectedPackage.name} (od ${formatPrice(selectedPackage.price)})`
    );
    data.set(
      "extra_moduly",
      `${modules} × ${formatPrice(MODULE_PRICE)} = ${formatPrice(modules * MODULE_PRICE)}`
    );
    data.set("doplnky", addonsText);
    data.set("misijna_kontrola", careText);
    data.set("odhad_ceny", `od ${formatPrice(total)} (jednorazovo)`);
    data.set(
      "message",
      [
        `Kontakt: ${[name, email, telefon].filter(Boolean).join(", ")}`,
        `Typ projektu: ${typeLabel}`,
        `Balík: ${selectedPackage.name} (od ${formatPrice(selectedPackage.price)})`,
        `Extra moduly: ${modules} × ${formatPrice(MODULE_PRICE)}`,
        `Doplnky: ${addonsText}`,
        `Misijná kontrola: ${careText}`,
        `Orientačná cena: od ${formatPrice(total)} jednorazovo`,
      ].join("\n")
    );

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Formspree ${response.status}`);

      setStatus("success");
    } catch (error) {
      console.error("PricingCalculator: submit failed", error);
      setStatus("error");
    }
  };

  const heading = (text: string) => (
    <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
      {text}
    </h3>
  );

  const renderStep = () => {
    if (step === 0) {
      return (
        <>
          {heading("Aký typ misie plánujeme?")}
          <div className={styles.typeGrid}>
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                className={styles.option}
                aria-pressed={projectType === type.id}
                onClick={() => chooseType(type.id)}
              >
                <span className={styles.optionTitle}>{type.label}</span>
                <span className={styles.optionNote}>{type.note}</span>
              </button>
            ))}
          </div>
        </>
      );
    }

    if (step === 1 && projectType) {
      return (
        <>
          {heading("Vyber si balík")}
          <div className={styles.packageGrid}>
            {PACKAGES[projectType].map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                className={`${styles.option} ${styles.package} ${
                  pkg.badge ? styles.recommended : ""
                }`.trim()}
                aria-pressed={packageId === pkg.id}
                onClick={() => choosePackage(pkg.id)}
              >
                {pkg.badge && <span className={styles.badge}>{pkg.badge}</span>}
                <span className={styles.optionTitle}>{pkg.name}</span>
                <span className={styles.packagePrice}>
                  od {formatPrice(pkg.price)}
                </span>
                <ul className={styles.features}>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          {heading(
            "Koľko dodatočných modulov (podstránok) potrebuješ navyše nad rámec balíka?"
          )}
          <p className={styles.hint}>
            Každý modul +{formatPrice(MODULE_PRICE)}.
          </p>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() => setModules((value) => Math.max(0, value - 1))}
              disabled={modules === 0}
              aria-label="Ubrať modul"
            >
              −
            </button>
            <output className={styles.stepperValue} aria-live="polite">
              {modules}
            </output>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() =>
                setModules((value) => Math.min(MAX_MODULES, value + 1))
              }
              disabled={modules === MAX_MODULES}
              aria-label="Pridať modul"
            >
              +
            </button>
          </div>
          <p className={styles.hint}>
            Moduly spolu: +{formatPrice(modules * MODULE_PRICE)}
          </p>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          {heading("Doplnky na palubu")}
          <ul className={styles.addons}>
            {availableAddons.map((addon) => (
              <li key={addon.id}>
                <label className={styles.addon}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={addonIds.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                  />
                  <span className={styles.addonLabel}>{addon.label}</span>
                  <span className={styles.addonPrice}>
                    +{formatPrice(addon.price)}
                  </span>
                </label>
              </li>
            ))}
            <li>
              <label className={styles.addon}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={care}
                  onChange={() => setCare((value) => !value)}
                />
                <span className={styles.addonLabel}>{CARE_LABEL}</span>
                <span className={styles.addonPrice}>
                  od {formatPrice(CARE_PRICE)}/mes.
                </span>
              </label>
            </li>
          </ul>
        </>
      );
    }

    if (step === 4 && selectedPackage) {
      return (
        <>
          {heading("Tvoj letový plán")}
          <dl className={styles.summary}>
            <div className={styles.summaryRow}>
              <dt>Balík {selectedPackage.name}</dt>
              <dd>od {formatPrice(selectedPackage.price)}</dd>
            </div>
            {modules > 0 && (
              <div className={styles.summaryRow}>
                <dt>Extra moduly ({modules}×)</dt>
                <dd>+{formatPrice(modules * MODULE_PRICE)}</dd>
              </div>
            )}
            {chosenAddons.map((addon) => (
              <div key={addon.id} className={styles.summaryRow}>
                <dt>{addon.label}</dt>
                <dd>+{formatPrice(addon.price)}</dd>
              </div>
            ))}
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <dt>Orientačná cena (jednorazovo)</dt>
              <dd>od {formatPrice(total)}</dd>
            </div>
            {care && (
              <div className={`${styles.summaryRow} ${styles.summaryCare}`}>
                <dt>+ Misijná kontrola</dt>
                <dd>od {formatPrice(CARE_PRICE)}/mesiac</dd>
              </div>
            )}
          </dl>
          <p className={styles.disclaimer}>
            Ide o orientačný odhad. Finálnu cenu spresníme na konzultácii podľa
            detailov projektu.
          </p>

          {status === "success" ? (
            <div className={styles.success} role="status">
              <p className={styles.successTitle}>
                Signál prijatý. <span className="scene-accent">Ozveme sa.</span>
              </p>
              <p className={styles.successCopy}>
                Presnú ponuku ti pošleme na zadaný e-mail.
              </p>
            </div>
          ) : (
            <form
              className={styles.lead}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Žiadosť o presnú ponuku"
              aria-busy={status === "submitting"}
            >
              <h4 className={styles.leadTitle}>Chceš presné nacenenie?</h4>
              <p className={styles.leadCopy}>
                Nechaj nám kontakt a pripravíme ti presnú cenovú ponuku na
                mieru.
              </p>

              <div className={styles.leadRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="calc-meno">
                    Meno <span className={styles.optional}>(nepovinné)</span>
                  </label>
                  <input
                    id="calc-meno"
                    name="meno"
                    type="text"
                    className={styles.input}
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="calc-priezvisko">
                    Priezvisko <span className={styles.optional}>(nepovinné)</span>
                  </label>
                  <input
                    id="calc-priezvisko"
                    name="priezvisko"
                    type="text"
                    className={styles.input}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.leadRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="calc-email">
                    E-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="calc-email"
                    name="email"
                    type="email"
                    className={styles.input}
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-required="true"
                    aria-invalid={emailError ? true : undefined}
                    aria-describedby={emailError ? "calc-email-error" : undefined}
                    onChange={() => emailError && setEmailError("")}
                  />
                  {emailError && (
                    <p id="calc-email-error" className={styles.error}>
                      {emailError}
                    </p>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="calc-telefon">
                    Telefón <span className={styles.optional}>(nepovinné)</span>
                  </label>
                  <input
                    id="calc-telefon"
                    name="telefon"
                    type="tel"
                    className={styles.input}
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={phoneError ? true : undefined}
                    aria-describedby={phoneError ? "calc-telefon-error" : undefined}
                    onChange={() => phoneError && setPhoneError("")}
                  />
                  {phoneError && (
                    <p id="calc-telefon-error" className={styles.error}>
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Honeypot: hidden from people, Formspree drops submissions that fill it. */}
              <input
                type="text"
                name="_gotcha"
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {status === "error" && (
                <p className={styles.formError} role="alert">
                  Signál sa nepodarilo odoslať. Skús to, prosím, znova alebo
                  nám napíš priamo na{" "}
                  <a href="mailto:info@rocketman.digital">
                    info@rocketman.digital
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Odosielam…" : "Požiadať o presné nacenenie ↗"}
              </button>
            </form>
          )}
        </>
      );
    }

    return null;
  };

  const showNext = step === 2 || step === 3;

  return (
    <>
      <div
        className={`${styles.teaser} ${launcherVisible ? styles.visible : ""}`.trim()}
        inert={!launcherVisible}
      >
        {teaserCollapsed ? (
          <button
            type="button"
            className={styles.mini}
            onClick={() => setOpen(true)}
            aria-label="Cenová ponuka – otvoriť kalkulačku"
            aria-haspopup="dialog"
          >
            <AstronautArt className={styles.miniArt} />
            {/* Always shown, so a first scroll already explains the icon. */}
            <span className={styles.miniLabel} aria-hidden="true">
              Cenová ponuka
            </span>
          </button>
        ) : (
          <div className={styles.bubbleWrap}>
            <button
              type="button"
              className={styles.bubble}
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
            >
              <AstronautArt className={styles.bubbleArt} />
              <span className={styles.bubbleText}>
                Chceš cenovú kalkuláciu zdarma? 🚀
              </span>
            </button>
            <button
              type="button"
              className={styles.dismiss}
              onClick={dismissTeaser}
              aria-label="Skryť ponuku kalkulačky"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="calc-title"
        onClose={handleClose}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) closeDialog();
        }}
        data-lenis-prevent
      >
        <div className={styles.panel}>
          <header className={styles.header}>
            <div>
              <h2 id="calc-title" className={styles.title}>
                Kalkulačka <span className="scene-accent">letu</span>
              </h2>
              <p className={styles.stepLabel}>
                Krok {step + 1} z {STEPS.length} · {STEPS[step]}
              </p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={closeDialog}
              aria-label="Zavrieť kalkulačku"
            >
              ×
            </button>
          </header>

          <ol className={styles.progress} aria-hidden="true">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={index <= step ? styles.progressDone : undefined}
              />
            ))}
          </ol>

          <div ref={bodyRef} className={styles.body}>
            <div
              key={step}
              className={`${styles.step} ${
                direction === "forward" ? styles.fromRight : styles.fromLeft
              }`}
            >
              {renderStep()}
            </div>
          </div>

          {step > 0 && (
            <footer className={styles.footer}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => goTo(step - 1)}
              >
                ← Späť
              </button>
              {step < 4 && selectedPackage && (
                <span className={styles.running}>
                  od {formatPrice(total)}
                </span>
              )}
              {showNext && (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={() => goTo(step + 1)}
                >
                  Ďalej →
                </button>
              )}
            </footer>
          )}
        </div>
      </dialog>
    </>
  );
}

/* The consultation astronaut (also on the 404 page), cropped to a circle. */
function AstronautArt({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <Image src="/11-consultation-orbit.png" alt="" width={120} height={120} />
    </span>
  );
}
