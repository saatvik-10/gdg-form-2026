import Image from "next/image";

const STEPS = ["Details", "Domain", "Questions"];

export default function StepHeader({
  currentStep,
}: {
  currentStep: 1 | 2 | 3;
}) {
  return (
    <header className="step-header">
      <div className="step-brand">
        <Image
          src="/assets/logo.png"
          alt="GDG logo"
          width={72}
          height={54}
          className="step-logo"
          priority
        />

        <div className="step-brand-text">
          <h2>GDG MIT-WPU</h2>
          <p>Recruitment Form</p>
        </div>
      </div>

      <div className="step-progress">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isDone = stepNumber < currentStep;

          return (
            <div className="step-item" key={label}>
              <div className="step-content">
                <div
                  className={`step-circle ${
                    isActive || isDone ? "active" : ""
                  }`}
                >
                  {isDone ? "✓" : stepNumber}
                </div>

                <span className={isActive ? "active-label" : ""}>
                  {label}
                </span>
              </div>

              {stepNumber < STEPS.length && (
                <div
                  className={`step-line ${isDone ? "completed" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .step-header {
          width: 100%;
        }

        .step-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .step-logo {
          width: 64px;
          height: 48px;
          object-fit: contain;
        }

        .step-brand-text {
          text-align: center;
        }

        .step-brand-text h2 {
          margin: 0;
          color: #ffffff;
          font-size: 25px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .step-brand-text p {
          margin: 5px 0 0;
          color: #94a3b8;
          font-size: 10px;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .step-progress {
          display: flex;
          align-items: flex-start;
          width: 100%;
          margin-top: 20px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          flex: 1;
          min-width: 0;
        }

        .step-item:last-child {
          flex: 0 0 auto;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 46px;
        }

        .step-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #1e293b;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .step-circle.active {
          background: #4285f4;
          color: #ffffff;
        }

        .step-content span {
          margin-top: 7px;
          color: #64748b;
          font-size: 10px;
          white-space: nowrap;
        }

        .step-content span.active-label {
          color: #ffffff;
          font-weight: 600;
        }

        .step-line {
          flex: 1;
          height: 1px;
          margin-top: 17px;
          background: #1e293b;
        }

        .step-line.completed {
          background: #4285f4;
        }

        @media (max-width: 600px) {
          .step-brand {
            gap: 10px;
          }

          .step-logo {
            width: 52px;
            height: 40px;
          }

          .step-brand-text h2 {
            font-size: 21px;
          }

          .step-brand-text p {
            font-size: 8px;
            letter-spacing: 0.17em;
          }

          .step-progress {
            margin-top: 17px;
          }

          .step-circle {
            width: 30px;
            height: 30px;
            font-size: 11px;
          }

          .step-content {
            min-width: 42px;
          }

          .step-content span {
            margin-top: 6px;
            font-size: 9px;
          }

          .step-line {
            margin-top: 15px;
          }
        }

        @media (max-width: 380px) {
          .step-brand-text h2 {
            font-size: 19px;
          }

          .step-logo {
            width: 48px;
          }

          .step-content {
            min-width: 38px;
          }

          .step-circle {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </header>
  );
}