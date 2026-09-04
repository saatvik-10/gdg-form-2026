"use client";

import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { useStepGuard } from "@/lib/useStepGuard";
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
    setIsSubmitted,
  } = useFormContext();

  const ready = useStepGuard(!!personalInfo, "/registration");

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
      router.replace("/registration");
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

      setIsSubmitted(true);
      router.replace("/socials");
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

  if (!ready) return null;

  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center p-4 pt-6 md:p-16'>
      <div className='flex flex-col items-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[400px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        <StepHeader currentStep={3} />

        <section className='flex flex-col items-center justify-center w-full gap-4'>
          <div className='flex flex-col items-center justify-center text-center'>
            <p className='text-sm text-neutral-400'>
              Step 3 of 3
            </p>

            <h1 className="capitalize">{domain} Questions</h1>

            <p className='text-sm text-neutral-400'>
              Answer {answeredCount} / {questions.length} questions.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className='flex flex-col justify-center w-full gap-4'
          >
            {questions.map((q, i) => {
              const color = PALETTE[i % PALETTE.length];

              return (
                <div className='flex flex-col gap-1' key={i}>
                  <label className="text-md text-neutral-200 font-medium">
                    <span
                      style={{ color }}
                    >
                      Q{i + 1}.{" "}
                    </span>
                    {q}
                  </label>

                  <textarea
                    rows={5}
                    required
                    placeholder={examples[i]}
                    value={answers[i]}
                    onChange={(e) =>
                      handleAnswerChange(i, e.target.value)
                    }
                    className="bg-neutral-800 text-neutral-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 mt-1 resize-none placeholder:text-neutral-500"
                    onFocus={(e) => {
                      e.currentTarget.style.outlineColor = color;
                      e.currentTarget.style.borderColor = color;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outlineColor = 'transparent';
                    }}
                  />

                  {errors[i] && (
                    <p className='form-error text-sm' style={{ color: GOOGLE_RED }}>
                      {errors[i]}
                    </p>
                  )}
                </div>
              );
            })}

            {error && (
              <p
                className="text-sm rounded-md bg-red-950/80 border border-red-800 px-4 py-3"
                style={{ color: GOOGLE_RED }}
              >
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className='mt-4 px-4 py-2 rounded-md text-neutral-900 bg-neutral-100 font-medium hover:opacity-90 transition-opacity flex justify-center items-center gap-2'
              style={{
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? (
                <span>Saving Application...</span>
              ) : (
                <>
                  <span>Submit Application</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}