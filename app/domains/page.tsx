"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";
import { QUESTIONS, DOMAIN_LABELS } from "@/data/questions";
import StepHeader from "@/components/StepHeader";

const GOOGLE_BLUE = "#4285F4";
const GOOGLE_RED = "#EA4335";
const GOOGLE_YELLOW = "#FBBC05";
const GOOGLE_GREEN = "#34A853";

const PALETTE = [GOOGLE_BLUE, GOOGLE_RED, GOOGLE_YELLOW, GOOGLE_GREEN];

export default function DomainsPage() {
  const router = useRouter();
  const { personalInfo } = useFormContext();

  const handleSelect = (key: string) => {
    if (!personalInfo) {
      router.push("/");
      return;
    }

    router.push(`/questions/${key}`);
  };

  const domainKeys = Object.keys(QUESTIONS);

  return (
    <main className="domains-page">
      <div className="domains-glow domains-glow-blue" />
      <div className="domains-glow domains-glow-green" />

      <div className="domains-container">
        <div className="domains-step-header">
          <StepHeader currentStep={2} />
        </div>

        <section className="domains-card">
          <div className="domains-header">
            <p className="domains-step">STEP 2 OF 3</p>
            <h1>Pick your domain</h1>
          </div>

          <div className="domains-list">
            {domainKeys.map((key, i) => {
              const color = PALETTE[i % PALETTE.length];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className="domain-card"
                  style={
                    {
                      "--domain-color": color,
                    } as React.CSSProperties
                  }
                >
                  <div className="domain-card-content">
                    <span className="domain-card-title">
                      {DOMAIN_LABELS[key]}
                    </span>
                  </div>

                  <span className="domain-card-arrow">→</span>
                </button>
              );
            })}
          </div>

          <p className="domains-footer">
            Select the domain that best matches your interests.
          </p>
        </section>
      </div>
    </main>
  );
}