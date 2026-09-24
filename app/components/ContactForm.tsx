"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

/*
  Posts straight to Formspree from the browser. The endpoint comes from
  .env.local (NEXT_PUBLIC_FORMSPREE_ENDPOINT) and is inlined at build time,
  so after changing it the dev server / build has to be restarted.
*/
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: FieldName[] = ["name", "email", "subject", "message"];

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (!name) errors.name = "Zadajte, prosím, vaše meno.";

  if (!email) errors.email = "Zadajte, prosím, váš e-mail.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "E-mail nemá správny formát, napr. meno@firma.sk.";

  if (!message) errors.message = "Napíšte nám, prosím, správu.";

  return errors;
}

export default function ContactForm() {
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (field: FieldName) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);

    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);

    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      console.error(
        "ContactForm: NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set in .env.local."
      );
      setStatus("error");
      return;
    }

    const subject = String(data.get("subject") ?? "").trim();
    // Formspree uses _subject as the notification e-mail's subject line.
    data.set("_subject", subject || "Nová správa z rocketman.digital");

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Formspree ${response.status}`);

      form.reset();
      setStatus("success");
      // Move focus onto the confirmation so screen readers announce it.
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      console.error("ContactForm: submit failed", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className={styles.success}
        role="status"
        tabIndex={-1}
      >
        <p className={styles.successTitle}>
          Ďakujeme, ozveme sa{" "}
          <span className="scene-accent">čo najskôr.</span>
        </p>
        <p className={styles.successCopy}>
          Vaša správa prišla v poriadku. Odpoveď vám pošleme na e-mail, ktorý
          ste zadali.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  const fieldProps = (field: FieldName) => ({
    id: `contact-${field}`,
    name: field,
    className: styles.input,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onChange: () => clearError(field),
  });

  const fieldError = (field: FieldName) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Kontaktný formulár"
      aria-busy={submitting}
    >
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">
            Meno <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            aria-required="true"
          />
          {fieldError("name")}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
          />
          {fieldError("email")}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-subject">
          Predmet <span className={styles.optional}>(nepovinné)</span>
        </label>
        <input {...fieldProps("subject")} type="text" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Správa <span aria-hidden="true">*</span>
        </label>
        <textarea
          {...fieldProps("message")}
          className={`${styles.input} ${styles.textarea}`}
          rows={6}
          required
          aria-required="true"
        />
        {fieldError("message")}
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
          Správu sa nepodarilo odoslať. Skúste to, prosím, znova alebo nám
          napíšte priamo na{" "}
          <a href="mailto:info@rocketman.digital">info@rocketman.digital</a>.
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={submitting}
          data-magnetic
        >
          {submitting ? "Odosielam…" : "Odoslať ↗"}
        </button>
        <p className={styles.note}>
          Polia označené <span aria-hidden="true">*</span>
          <span className={styles.srOnly}>hviezdičkou</span> sú povinné.
        </p>
      </div>
    </form>
  );
}
