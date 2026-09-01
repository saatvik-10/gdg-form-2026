"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import StepHeader from "@/components/StepHeader";
import { personalDetailsSchema } from "@/validators/personalDetails";
import "./registration.css";

const FIELDS = [
  {
    key: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    key: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    key: "prn",
    label: "PRN",
    type: "text",
    placeholder: "Enter your PRN",
  },
  {
    key: "year",
    label: "Year",
    type: "select",
    placeholder: "Select year",
    options: ["1st Year", "2nd Year", "3rd Year"],
  },
  {
    key: "branch",
    label: "Branch",
    type: "text",
    placeholder: "B.Tech",
  },
  {
    key: "dept",
    label: "Department",
    type: "text",
    placeholder: "CSE (Core)",
  },
] as const;

const GOOGLE_BLUE = "#4285F4";
const GOOGLE_RED = "#EA4335";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { setPersonalInfo } = useFormContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    prn: "",
    year: "",
    branch: "",
    dept: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePrnChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);

    setForm((prev) => ({
      ...prev,
      prn: digitsOnly,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = personalDetailsSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;

        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setPersonalInfo(result.data);
    router.push("/domains");
  };

  return (
    <main className="registration-page">
      <div className="registration-container">
        <StepHeader currentStep={1} />

        <section className="registration-card">
          <div className="registration-heading">
            <p className="registration-step">Step 1 of 3</p>

            <h1>Let&apos;s get your details</h1>

            <p className="registration-description">
              We&apos;ll use this to reach out after your application.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="registration-form"
          >
            {FIELDS.map((field) => (
              <div className="form-field" key={field.key}>
                <label htmlFor={field.key}>{field.label}</label>

                {field.type === "select" ? (
                  <select
                    id={field.key}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>

                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.key}
                    type={field.type}
                    inputMode={field.key === "prn" ? "numeric" : undefined}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => {
                      if (field.key === "prn") {
                        handlePrnChange(e.target.value);
                      } else {
                        setForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }));
                      }
                    }}
                  />
                )}

                {errors[field.key] && (
                  <p
                    className="form-error"
                    style={{ color: GOOGLE_RED }}
                  >
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="continue-button"
              style={{ backgroundColor: GOOGLE_BLUE }}
            >
              Continue
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}