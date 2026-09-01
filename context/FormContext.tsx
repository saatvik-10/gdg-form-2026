"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [roleAnswers, setRoleAnswers] = useState<string[]>([]);

  return (
    <FormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        selectedDomain,
        setSelectedDomain,
        roleAnswers,
        setRoleAnswers,
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