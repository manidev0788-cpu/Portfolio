"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { validateContactFields } from "@/lib/contact/validate";
import { cn } from "@/utils/cn";

const easeLux = [0.22, 1, 0.36, 1];
const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

function fieldClass(hasError) {
  return cn(
    "min-h-12 w-full rounded-xl border bg-black/25 px-4 py-[0.7rem]",
    "text-[0.9275rem] text-foreground placeholder:text-muted/55",
    "outline-none shadow-[inset_0_1px_2px_rgb(0_0_0/_/0.12)] backdrop-blur-sm",
    "transition-[border-color,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
    hasError
      ? "border-red-400/45 focus:border-red-400/55 focus:ring-1 focus:ring-red-400/30"
      : "border-white/[0.08] focus:border-accent-start/30 focus:ring-1 focus:ring-accent-start/25"
  );
}

function FormFeedback({ status, message, prefersReducedMotion }) {
  if (!message) return null;
  const isSuccess = status === "success";
  const Icon = isSuccess ? CheckCircle2 : XCircle;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeLux }}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-[0.875rem] leading-relaxed",
        isSuccess
          ? "border-accent-start/25 bg-accent-start/10 text-accent-start"
          : "border-red-400/30 bg-red-500/10 text-red-200"
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p>{message}</p>
    </motion.div>
  );
}

function buildErrorMessage(errors) {
  if (Object.keys(errors).length > 0) {
    return "Please fix the highlighted fields and try again.";
  }
  return "Please check your entries and try again.";
}

export default function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const honeypotRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const isSubmitting = submitStatus === "loading";

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (feedbackMessage && submitStatus === "error") {
      setFeedbackMessage("");
      setSubmitStatus("idle");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    const { valid, errors, data } = validateContactFields(form);

    if (!valid) {
      setFieldErrors(errors);
      setSubmitStatus("error");
      setFeedbackMessage(buildErrorMessage(errors));
      return;
    }

    setFieldErrors({});
    setSubmitStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _hp: honeypotRef.current?.value ?? "",
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        const apiErrors = payload.errors ?? {};
        setFieldErrors(apiErrors);
        setSubmitStatus("error");
        setFeedbackMessage(payload.error ?? buildErrorMessage(apiErrors));
        return;
      }

      setSubmitStatus("success");
      setFeedbackMessage("Thank you! Your message was sent successfully. I'll get back to you soon.");
      setForm(EMPTY_FORM);
      if (honeypotRef.current) honeypotRef.current.value = "";
    } catch {
      setSubmitStatus("error");
      setFeedbackMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <form className="relative mt-8 flex flex-col gap-5 sm:mt-10" noValidate onSubmit={handleSubmit}>
      <AnimatePresence mode="wait">
        {feedbackMessage ? (
          <FormFeedback
            key={submitStatus}
            status={submitStatus}
            message={feedbackMessage}
            prefersReducedMotion={reduced}
          />
        ) : null}
      </AnimatePresence>

      {/* Honeypot — uncontrolled so browser autofill cannot block real submissions */}
      <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <input
          ref={honeypotRef}
          type="text"
          name="bot-field"
          tabIndex={-1}
          autoComplete="off"
          readOnly
          defaultValue=""
        />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[0.8125rem] font-medium text-foreground/90">Name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className={fieldClass(Boolean(fieldErrors.name))}
        />
        {fieldErrors.name ? (
          <span id="contact-name-error" className="text-[0.8125rem] text-red-300">
            {fieldErrors.name}
          </span>
        ) : null}
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-medium text-foreground/90">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className={fieldClass(Boolean(fieldErrors.email))}
          />
          {fieldErrors.email ? (
            <span id="contact-email-error" className="text-[0.8125rem] text-red-300">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.8125rem] font-medium text-foreground/90">Subject</span>
          <input
            name="subject"
            type="text"
            autoComplete="off"
            required
            placeholder="Project inquiry"
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
            className={fieldClass(Boolean(fieldErrors.subject))}
          />
          {fieldErrors.subject ? (
            <span id="contact-subject-error" className="text-[0.8125rem] text-red-300">
              {fieldErrors.subject}
            </span>
          ) : null}
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[0.8125rem] font-medium text-foreground/90">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={cn(
            fieldClass(Boolean(fieldErrors.message)),
            "min-h-[140px] resize-y py-3 sm:py-[0.9rem]"
          )}
        />
        {fieldErrors.message ? (
          <span id="contact-message-error" className="text-[0.8125rem] text-red-300">
            {fieldErrors.message}
          </span>
        ) : null}
      </label>

      <div className="pt-2">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={
            isSubmitting || reduced
              ? undefined
              : { scale: 1.015, transition: { duration: 0.25, ease: easeLux } }
          }
          whileTap={isSubmitting || reduced ? undefined : { scale: 0.995 }}
          className={cn(
            "relative inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full sm:w-auto sm:min-w-[12.75rem]",
            "bg-[linear-gradient(103deg,#7cf7d4_0%,#aaf5d8_42%,#d9ff63_100%)]",
            "px-10 py-[0.7rem] text-[0.875rem] font-semibold text-[#071d1d]",
            "shadow-[0_12px_32px_-8px_rgb(124_247_212/_/0.22),0_4px_12px_rgb(0_0_0/_/0.12)]",
            "ring-1 ring-white/26 transition-[filter,box-shadow,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:brightness-[1.04] hover:shadow-[0_16px_40px_-6px_rgb(124_247_212/_/0.28)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-start",
            "disabled:cursor-not-allowed disabled:opacity-65"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            "Submit Message"
          )}
        </motion.button>
      </div>
    </form>
  );
}
