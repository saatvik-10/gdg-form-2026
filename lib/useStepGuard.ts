"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/context/FormContext";

export function useStepGuard(
  condition: boolean,
  redirectTo: string
): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { isLoaded } = useFormContext();

  useEffect(() => {
    if (!isLoaded) return;

    if (!condition) {
      router.replace(redirectTo);
    } else {
      setReady(true);
    }
  }, [condition, redirectTo, router, isLoaded]);

  return ready;
}
