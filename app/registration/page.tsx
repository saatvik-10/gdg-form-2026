'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFormContext } from '@/context/FormContext';
import StepHeader from '@/components/StepHeader';
import { personalDetailsSchema } from '@/validators/personalDetails';

const FIELDS = [
  {
    key: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter your phone number',
  },
  {
    key: 'prn',
    label: 'PRN',
    type: 'text',
    placeholder: 'Enter your PRN',
  },
  {
    key: 'year',
    label: 'Year',
    type: 'select',
    placeholder: 'Select year',
    options: ['1st Year', '2nd Year', '3rd Year'],
  },
  {
    key: 'branch',
    label: 'Branch',
    type: 'text',
    placeholder: 'B.Tech',
  },
  {
    key: 'dept',
    label: 'Department',
    type: 'text',
    placeholder: 'CSE (Core)',
  },
] as const;

const GOOGLE_BLUE = '#4285F4';
const GOOGLE_RED = '#EA4335';

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { personalInfo, setPersonalInfo, isLoaded } = useFormContext();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    prn: '',
    year: '',
    branch: '',
    dept: '',
  });

  // Pre-fill the form if they already have data in sessionStorage
  useEffect(() => {
    if (personalInfo) {
      setForm({
        name: personalInfo.name || '',
        phone: personalInfo.phone || '',
        prn: personalInfo.prn || '',
        year: personalInfo.year || '',
        branch: personalInfo.branch || '',
        dept: personalInfo.dept || '',
      });
    }
  }, [personalInfo]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePrnChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);

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
    setPersonalInfo({
      ...result.data,
      email: session?.user?.email ?? '',
    });
    router.replace('/domains');
  };

  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center p-4 pt-6 md:p-16'>
      <div className='flex flex-col items-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[400px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        <StepHeader currentStep={1} />

        <section className='flex flex-col items-center justify-center w-full gap-4'>
          <div className='flex flex-col items-center justify-center text-center'>
            <p className='text-sm text-neutral-400'>
              Step 1 of 3
            </p>

            <h1>Let&apos;s get your details</h1>

            <p className='text-sm text-neutral-400'>
              We&apos;ll use this to reach out after your application.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className='flex flex-col justify-center w-full gap-4'
          >
            {FIELDS.map((field) => (
              <div className='flex flex-col gap-1' key={field.key}>
                <label htmlFor={field.key} className="text-sm text-neutral-400">
                  {field.label}
                </label>

                {field.type === 'select' ? (
                  <select
                    id={field.key}
                    value={form[field.key]}
                    className="bg-neutral-800 text-neutral-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  >
                    <option value='' disabled className="bg-neutral-800 text-neutral-100">
                      {field.placeholder}
                    </option>

                    {field.options.map((option) => (
                      <option key={option} value={option} className="bg-neutral-800 text-neutral-100">
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.key}
                    type={field.type}
                    inputMode={field.key === 'prn' ? 'numeric' : undefined}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    className="bg-neutral-800 text-neutral-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      if (field.key === 'prn') {
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
                  <p className='form-error' style={{ color: GOOGLE_RED }}>
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}

            <button
              type='submit'
              className='mt-4 px-4 py-2 rounded-md text-neutral-900 bg-neutral-100 font-medium hover:opacity-90 transition-opacity'
            >
              Continue
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
