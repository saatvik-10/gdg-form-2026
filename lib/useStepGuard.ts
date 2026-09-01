"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useStepGuard(
  condition: boolean,
  redirectTo: string
): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!condition) {
      router.replace(redirectTo);
    } else {
      setReady(true);
    }
  }, [condition, redirectTo, router]);

  return ready;
}
