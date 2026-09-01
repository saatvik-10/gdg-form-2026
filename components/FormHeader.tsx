"use client";
import Image from "next/image";

const GOOGLE_BLUE = "#4285F4";

const STEPS = [
  { label: "Details" },
  { label: "Domain" },
  { label: "Questions" },
  { label: "Embarked" },
];

type FormHeaderProps = {
  currentStep: number;
};

export default function FormHeader({ currentStep }: FormHeaderProps) {
  return (
    <div className="w-full mb-4">

      <div
        className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl"
        style={{ backgroundColor: "#111827" }}
      >
        <div className="relative shrink-0" style={{ width: 40, height: 40 }}>
          <Image
            src="/assets/gdg-logo.png"
            alt="GDG MIT-WPU"
            width={40}
            height={40}
            className="object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/gdg-logo.svg";
            }}
            priority
          />
        </div>
        <div className="leading-tight">
          <p className="text-white font-extrabold text-base tracking-wide leading-none">
            GDG MIT-WPU
          </p>
          <p
            className="text-xs font-semibold tracking-widest uppercase mt-0.5"
            style={{ color: "#94a3b8" }}
          >
            Recruitment Form
          </p>
        </div>
      </div>

      <div className="flex items-start w-full">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={step.label} className="flex flex-col items-center flex-1 min-w-0">
              <div className="flex items-center w-full">

                <div
                  className={`flex-1 h-px ${i === 0 ? "opacity-0" : ""}`}
                  style={{
                    backgroundColor: stepNum <= currentStep ? GOOGLE_BLUE : "#334155",
                  }}
                />

                <div
                  className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all z-10"
                  style={{
                    backgroundColor:
                      isActive || isCompleted ? GOOGLE_BLUE : "transparent",
                    borderColor:
                      isActive || isCompleted ? GOOGLE_BLUE : "#475569",
                    color: isActive || isCompleted ? "#fff" : "#64748b",
                    boxShadow: isActive
                      ? `0 0 0 3px rgba(66,133,244,0.25)`
                      : "none",
                  }}
                >
                  {isCompleted ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>

                <div
                  className={`flex-1 h-px ${i === STEPS.length - 1 ? "opacity-0" : ""}`}
                  style={{
                    backgroundColor:
                      stepNum < currentStep ? GOOGLE_BLUE : "#334155",
                  }}
                />
              </div>

              <p
                className="mt-1.5 text-[10px] sm:text-xs font-medium text-center leading-tight truncate w-full px-0.5"
                style={{
                  color: isActive ? "#e2e8f0" : isCompleted ? GOOGLE_BLUE : "#475569",
                }}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
