import Image from "next/image";

const STEPS = ["Details", "Domain", "Questions"];

export default function StepHeader({
  currentStep,
}: {
  currentStep: 1 | 2 | 3;
}) {
  return (
    <header className="w-full">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Image
          src="/assets/logo.png"
          alt="GDG logo"
          width={72}
          height={54}
          className="object-contain w-[48px] h-auto min-[380px]:w-[52px] min-[380px]:h-[40px] sm:w-[64px] sm:h-[48px]"
          priority
        />

        <div className="text-xl text-center font-medium text-neutral-100 tracking-tight leading-tight">
          <h2>GDG MIT-WPU</h2>
          <p className="text-xs text-neutral-400 tracking-normal">Recruitment Form</p>
        </div>
      </div>

      <div className="flex items-start w-full mt-[17px] sm:mt-5">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isDone = stepNumber < currentStep;

          return (
            <div className="flex items-start flex-1 min-w-0 last:flex-none" key={label}>
              <div className="flex flex-col items-center min-w-[38px] min-[380px]:min-w-[42px] sm:min-w-[46px]">
                <div
                  className={`flex items-center justify-center rounded-full flex-shrink-0 font-semibold w-[28px] h-[28px] min-[380px]:w-[30px] min-[380px]:h-[30px] sm:w-[34px] sm:h-[34px] text-[11px] sm:text-xs ${
                    isActive || isDone
                      ? "bg-[#4285f4] text-white"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {isDone ? "✓" : stepNumber}
                </div>

                <span
                  className={`mt-[6px] sm:mt-[7px] text-[12px] sm:text-xs whitespace-nowrap ${
                    isActive ? "text-white font-semibold" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </div>

              {stepNumber < STEPS.length && (
                <div
                  className={`flex-1 h-[1px] mt-[15px] sm:mt-[17px] ${
                    isDone ? "bg-[#4285f4]" : "bg-slate-800"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}