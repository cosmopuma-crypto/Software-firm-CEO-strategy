"use client";

import { useCallback, useState } from "react";

/** Generischer Zustand für mehrstufige Formulare (Wizards). */
export function useMultiStepForm<T extends object>(initial: T, stepCount: number) {
  const [data, setData] = useState<T>(initial);
  const [step, setStep] = useState(0);

  const update = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const next = useCallback(
    () => setStep((s) => Math.min(s + 1, stepCount - 1)),
    [stepCount],
  );
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const reset = useCallback(() => {
    setData(initial);
    setStep(0);
  }, [initial]);

  return {
    data,
    setData,
    update,
    step,
    setStep,
    next,
    back,
    reset,
    isFirst: step === 0,
    isLast: step === stepCount - 1,
  };
}
