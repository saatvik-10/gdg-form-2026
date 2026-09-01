"use client";

import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { QUESTIONS, EXAMPLES } from "@/data/questions";
import { useState } from "react";
import { answersSchema } from "@/validators/questions";
import StepHeader from "@/components/StepHeader";

const GOOGLE_BLUE = "#4285F4";
const GOOGLE_RED = "#EA4335";
const GOOGLE_YELLOW = "#FBBC05";
const GOOGLE_GREEN = "#34A853";

const PALETTE = [GOOGLE_BLUE, GOOGLE_RED, GOOGLE_YELLOW, GOOGLE_GREEN];

export default function DomainQuestionsPage() {
  const { domain } = useParams<{ domain: string }>();
  const router = useRouter();

  const {
    personalInfo,
    setSelectedDomain,
    setRoleAnswers,
  } = useFormContext();

  const questions = QUESTIONS[domain] ?? [];
  const examples = EXAMPLES[domain] ?? [];

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAnswerChange = (index: number, value: string) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);

    if (errors[index]) {
      const nextErrors = { ...errors };
      delete nextErrors[index];
      setErrors(nextErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personalInfo) {
      router.push("/registration");
      return;
    }

    const result = answersSchema.safeParse(answers);

    if (!result.success) {
      const fieldErrors: Record<number, string> = {};

      for (const issue of result.error.issues) {
        const index = issue.path[0] as number;
        fieldErrors[index] = issue.message;
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setError("");

    setSelectedDomain(domain);
    setRoleAnswers(result.data);

    const payload = {
      name: personalInfo.name,
      branch: personalInfo.branch,
      year: personalInfo.year,
      prn: personalInfo.prn,
      preferredRole: domain,
      phone: personalInfo.phone,
      email: personalInfo.email,
      dept: personalInfo.dept,

      roleQuestion1: result.data[0] ?? "",
      roleQuestion2: result.data[1] ?? "",
      roleQuestion3: result.data[2] ?? "",
      roleQuestion4: result.data[3] ?? "",
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok && !data.mockSaved && !data.success) {
        throw new Error(
          data.error || `Server error (${res.status})`
        );
      }

      router.push("/socials");
    } catch (err: unknown) {
      console.error("Submission error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong during submission."
      );

      setIsSubmitting(false);
    }
  };

  const answeredCount = answers.filter(
    (a) => a.trim().length > 0
  ).length;

  return (
    <main className="questions-page">
      <div className="questions-wrapper">
        <div className="questions-step-header">
          <StepHeader currentStep={3} />
        </div>

        <section className="questions-panel">
          <div className="questions-heading">
            <div className="questions-heading-top">
              <div>
                <p className="questions-step">STEP 3 OF 3</p>

                <h1 className="capitalize">
                  {domain} Questions
                </h1>
              </div>

              <div className="questions-progress">
                <span>{answeredCount}</span>

                <span className="questions-progress-total">
                  /{questions.length}
                </span>

                <small>answered</small>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="questions-form"
          >
            {questions.map((q, i) => {
              const color = PALETTE[i % PALETTE.length];

              return (
                <div
                  key={i}
                  className={`question-block ${
                    errors[i] ? "question-error" : ""
                  }`}
                >
                  <label className="question-label">
                    <span
                      className="question-number"
                      style={{
                        backgroundColor: `${color}18`,
                        color,
                      }}
                    >
                      {i + 1}
                    </span>

                    <span>{q}</span>
                  </label>

                  <textarea
                    rows={5}
                    required
                    placeholder={examples[i]}
                    value={answers[i]}
                    onChange={(e) =>
                      handleAnswerChange(i, e.target.value)
                    }
                    className="question-textarea"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = color;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#273449";
                    }}
                  />

                  <div className="question-footer">
                    {errors[i] ? (
                      <p
                        className="question-error-text"
                        style={{ color: GOOGLE_RED }}
                      >
                        {errors[i]}
                      </p>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              );
            })}

            {error && (
              <p
                className="text-sm rounded-xl bg-red-950/80 border border-red-800 px-4 py-3"
                style={{ color: GOOGLE_RED }}
              >
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="questions-submit"
              style={{
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? (
                <span>Saving Application...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <span className="submit-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}