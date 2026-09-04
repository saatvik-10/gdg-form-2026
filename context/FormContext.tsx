"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  prn: string;
  dept: string;
};

type FormContextType = {
  personalInfo: PersonalInfo | null;
  setPersonalInfo: (data: PersonalInfo) => void;
  selectedDomain: string | null;
  setSelectedDomain: (domain: string) => void;
  roleAnswers: string[];
  setRoleAnswers: (answers: string[]) => void;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  isLoaded: boolean;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [roleAnswers, setRoleAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gdg-form-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
        if (parsed.selectedDomain) setSelectedDomain(parsed.selectedDomain);
        if (parsed.roleAnswers) setRoleAnswers(parsed.roleAnswers);
        if (parsed.isSubmitted) setIsSubmitted(parsed.isSubmitted);
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "gdg-form-data",
        JSON.stringify({
          personalInfo,
          selectedDomain,
          roleAnswers,
          isSubmitted,
        })
      );
    }
  }, [personalInfo, selectedDomain, roleAnswers, isSubmitted, isLoaded]);

  return (
    <FormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        selectedDomain,
        setSelectedDomain,
        roleAnswers,
        setRoleAnswers,
        isSubmitted,
        setIsSubmitted,
        isLoaded,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);

  if (!ctx) {
    throw new Error("useFormContext must be used within FormProvider");
  }

  return ctx;
}