"use client";

import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Shield,
} from "lucide-react";
import { VALIDATION_MESSAGES, LEAD_FORM_TEXTS } from "@/lib/constants";
import type { ApiResponse } from "@/app/api/leads/route";

// --- Validation Schema ---
const LeadFormSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.nameRequired)
    .min(2, VALIDATION_MESSAGES.nameMin)
    .max(80, VALIDATION_MESSAGES.nameMax)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, VALIDATION_MESSAGES.nameInvalid),
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.emailRequired)
    .email(VALIDATION_MESSAGES.emailInvalid)
    .max(255, VALIDATION_MESSAGES.emailMax),
});

type LeadFormValues = z.infer<typeof LeadFormSchema>;

// --- Animation variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

// --- Checkmark SVG path animation ---
function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      className="relative mb-5 flex items-center justify-center"
    >
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(68% 0.22 148 / 0.2) 0%, transparent 70%)",
          border: "1px solid oklch(68% 0.22 148 / 0.3)",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid oklch(68% 0.22 148 / 0.5)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M8 20 L17 29 L33 12"
            stroke="oklch(78% 0.18 148)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.6, ease: "easeOut", delay: 0.2 },
              opacity: { duration: 0.1, delay: 0.2 },
            }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

// --- Success State ---
function SuccessState({ name }: { name: string }) {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      key="success"
      variants={successVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center py-8 text-center"
    >
      <AnimatedCheckmark />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        style={{
          background: "oklch(68% 0.22 148 / 0.1)",
          border: "1px solid oklch(68% 0.22 148 / 0.3)",
          color: "oklch(78% 0.18 148)",
        }}
      >
        <Sparkles size={11} />
        {LEAD_FORM_TEXTS.success.badge}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 font-display text-2xl font-bold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {LEAD_FORM_TEXTS.success.title(firstName)}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-3 text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {LEAD_FORM_TEXTS.success.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 w-full rounded-xl p-4"
        style={{
          background: "var(--glass-base)",
          border: "1px solid var(--color-border-subtle)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          {LEAD_FORM_TEXTS.success.disclaimer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// --- Input Field Component ---
interface InputFieldProps {
  id: string;
  name: keyof LeadFormValues;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  errorId: string;
  error?: string;
  disabled?: boolean;
  register: ReturnType<typeof useForm<LeadFormValues>>["register"];
}

function InputField({
  id,
  label,
  type,
  placeholder,
  icon,
  errorId,
  error,
  disabled,
  register,
  name,
}: InputFieldProps) {
  const hasError = Boolean(error);

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {label}
      </label>

      <div className="relative">
        {/* Icon */}
        <div
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
          style={{
            color: hasError
              ? "var(--color-error-500)"
              : "var(--color-text-tertiary)",
          }}
        >
          {icon}
        </div>

        {/* Input */}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={name === "email" ? "email" : "given-name"}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name)}
          className="w-full rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: "var(--glass-base)",
            border: `1px solid ${
              hasError
                ? "var(--color-error-500)"
                : "var(--color-border-default)"
            }`,
            color: "var(--color-text-primary)",
            caretColor: "var(--color-brand-500)", // Atualizado para Púrpura
          }}
          onFocus={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor = "var(--color-brand-500)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px oklch(58% 0.22 290 / 0.12)"; // Halo púrpura (Hue 290)
            }
          }}
          onBlur={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor = "var(--color-border-default)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        />
      </div>

      {/* Error message */}
      <AnimatePresence mode="wait">
        {hasError && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "var(--color-error-500)" }}
          >
            <AlertCircle size={11} strokeWidth={2.5} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Main LeadForm Component ---
export function LeadForm() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string>("");

  const nameErrorId = useId();
  const emailErrorId = useId();
  const nameFieldId = useId();
  const emailFieldId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(LeadFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LeadFormValues) => {
    setFormStatus("submitting");
    setApiError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        setSubmittedName(data.name);
        setFormStatus("success");
        reset();
      } else {
        setApiError(result.message || LEAD_FORM_TEXTS.errors.generic);
        setFormStatus("error");

        setTimeout(() => {
          setFormStatus("idle");
          setApiError(null);
        }, 5000);
      }
    } catch (networkError) {
      console.error("[LeadForm] Network error:", networkError);
      setApiError(LEAD_FORM_TEXTS.errors.network);
      setFormStatus("error");

      setTimeout(() => {
        setFormStatus("idle");
        setApiError(null);
      }, 6000);
    }
  };

  const isSubmitting = formStatus === "submitting";

  return (
    <div
      className="glass-strong relative w-full overflow-hidden rounded-3xl p-6 sm:p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Decorative corner glow - Atualizado para Hue 290 */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(58% 0.22 290 / 0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <AnimatePresence mode="wait">
        {formStatus === "success" ? (
          <SuccessState key="success" name={submittedName} />
        ) : (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Form header */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <motion.div
                variants={itemVariants}
                className="mb-3 inline-flex items-center gap-2"
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(58% 0.22 290 / 0.15)", // Fundo Púrpura sutil
                    border: "1px solid oklch(58% 0.22 290 / 0.3)",
                  }}
                >
                  <Sparkles
                    size={13}
                    style={{ color: "var(--color-brand-400)" }}
                  />
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-brand-400)" }}
                >
                  {LEAD_FORM_TEXTS.badge}
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="font-display text-xl font-bold leading-snug"
                style={{ color: "var(--color-text-primary)" }}
              >
                {LEAD_FORM_TEXTS.title}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-1.5 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {LEAD_FORM_TEXTS.subtitle}
              </motion.p>
            </motion.div>

            {/* Form fields */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4"
            >
              <InputField
                id={nameFieldId}
                name="name"
                label={LEAD_FORM_TEXTS.fields.name.label}
                type="text"
                placeholder={LEAD_FORM_TEXTS.fields.name.placeholder}
                icon={<User size={15} strokeWidth={2} />}
                errorId={nameErrorId}
                error={errors.name?.message}
                disabled={isSubmitting}
                register={register}
              />

              <InputField
                id={emailFieldId}
                name="email"
                label={LEAD_FORM_TEXTS.fields.email.label}
                type="email"
                placeholder={LEAD_FORM_TEXTS.fields.email.placeholder}
                icon={<Mail size={15} strokeWidth={2} />}
                errorId={emailErrorId}
                error={errors.email?.message}
                disabled={isSubmitting}
                register={register}
              />

              {/* API Error */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-2.5 rounded-xl p-3.5 text-sm"
                    style={{
                      background: "oklch(62% 0.24 25 / 0.1)", // Vermelho Erro
                      border: "1px solid oklch(62% 0.24 25 / 0.3)",
                      color: "var(--color-error-500)",
                    }}
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0"
                    />
                    <p>{apiError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.015, y: -1 }}
                  whileTap={isSubmitting ? {} : { scale: 0.985 }}
                  className="animate-pulse-glow cursor-pointer relative mt-1 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    // Gradiente Púrpura atualizado
                    background:
                      "linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-800) 100%)",
                    boxShadow: isSubmitting
                      ? "none"
                      : "0 4px 20px -4px oklch(58% 0.22 290 / 0.6), 0 1px 3px oklch(0% 0 0 / 0.2)",
                  }}
                  aria-busy={isSubmitting}
                >
                  {/* Shimmer effect */}
                  {!isSubmitting && (
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, oklch(100% 0 0 / 0.12) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                      }}
                    />
                  )}

                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={16}
                        strokeWidth={2.5}
                        className="animate-spin"
                      />
                      <span>{LEAD_FORM_TEXTS.button.loading}</span>
                    </>
                  ) : (
                    <>
                      <span>{LEAD_FORM_TEXTS.button.default}</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Trust signal */}
              <motion.p
                variants={itemVariants}
                className="flex items-center justify-center gap-1.5 text-center text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <Shield size={11} strokeWidth={2} />
                {LEAD_FORM_TEXTS.trustSignal}
              </motion.p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
