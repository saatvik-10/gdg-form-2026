"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { useStepGuard } from "@/lib/useStepGuard";
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
  
  const [submittedRoles, setSubmittedRoles] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const ready = useStepGuard(!!personalInfo, "/registration");

  useEffect(() => {
    fetch("/api/applications/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.submittedRoles) {
          setSubmittedRoles(data.submittedRoles);
        }
      })
      .catch((err) => console.error("Failed to fetch submitted roles", err));
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelect = (key: string) => {
    if (submittedRoles.includes(key)) {
      showToast(`You have already submitted an application for ${DOMAIN_LABELS[key]}.`);
      return;
    }
    router.replace(`/questions/${key}`);
  };

  const domainKeys = Object.keys(QUESTIONS);

  if (!ready) return null;

  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center p-4 pt-6 md:p-16'>
      <div className='flex flex-col items-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[400px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        <StepHeader currentStep={2} />

        <section className='flex flex-col items-center justify-center w-full gap-4'>
          <div className='flex flex-col items-center justify-center text-center'>
            <p className='text-sm text-neutral-400'>
              Step 2 of 3
            </p>

            <h1>Pick your domain</h1>
            
            <p className='text-sm text-neutral-400'>
              Select the domain that best matches your interests.
            </p>
          </div>

          <div className="flex flex-col justify-center w-full gap-4 mt-4">
            {domainKeys.map((key) => {
              const isAlreadySubmitted = submittedRoles.includes(key);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={`w-full aspect-[452/72] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl overflow-hidden relative bg-neutral-800 transition-all duration-300 ${
                    isAlreadySubmitted 
                      ? "opacity-50 grayscale cursor-not-allowed" 
                      : "hover:scale-[1.02] cursor-pointer"
                  }`}
                >
                  {/* Fallback content behind the image in case it fails to load */}
                  <div className="absolute inset-0 flex justify-between items-center px-4">
                    <span className="font-medium text-neutral-100">
                      {DOMAIN_LABELS[key]}
                    </span>
                    <span className="text-neutral-400">→</span>
                  </div>

                  <img
                    src={`/assets/${key}.png`}
                    alt={DOMAIN_LABELS[key]}
                    className="relative z-10 w-full h-full object-cover bg-neutral-900"
                    onError={(e) => {
                      // Hide the image if it doesn't exist, revealing the fallback text
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {isAlreadySubmitted && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                      <span className="bg-neutral-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-700">
                        Already Applied
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Custom Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm flex items-center gap-2">
          <span>⚠</span>
          {toastMessage}
        </div>
      </div>
    </main>
  );
}