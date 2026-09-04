'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import { useStepGuard } from '@/lib/useStepGuard';
import './socials.css';

const GOOGLE_BLUE = '#4285F4';
const GOOGLE_RED = '#EA4335';
const GOOGLE_YELLOW = '#FBBC05';
const GOOGLE_GREEN = '#34A853';

const STEPS = ['Details', 'Domain', 'Questions', 'Embarked'];

export default function EmbarkedPage() {
  const router = useRouter();
  const { isSubmitted, setIsSubmitted, setSelectedDomain, setRoleAnswers } =
    useFormContext();
  const ready = useStepGuard(isSubmitted, '/registration');

  if (!ready) return null;

  const handleAnotherDepartment = () => {
    setIsSubmitted(false);
    setSelectedDomain('');
    setRoleAnswers([]);
    router.push('/domains');
  };

  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center justify-center p-4 pt-6 md:p-16'>
      <div className='flex flex-col items-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[400px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        <section className='flex flex-col items-center justify-center w-full h-full gap-4 mt-8 flex-grow'>
          <div className='flex items-center justify-center w-16 h-16 bg-green-500/10 text-green-500 rounded-full mb-2'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>

          <div className='flex flex-col items-center justify-center text-center gap-2'>
            <div className='flex items-center gap-2 text-sm text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full'>
              <span>🎉</span>
              <span>Congratulations · Form Submitted</span>
            </div>

            <h1 className='text-2xl font-bold mt-4'>Connect. Learn. Grow.</h1>

            <p className='text-sm text-neutral-400 max-w-[250px] leading-tight text-center'>
              We&apos;ll review your application and reach out soon!
            </p>
          </div>

          <button
            onClick={handleAnotherDepartment}
            className='cursor-pointer mt-6 px-6 py-3 rounded-full bg-neutral-100 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors'
          >
            Submit for another department
          </button>

          <Image
            src='/assets/gdg-logo.png'
            alt='GDG logo'
            width={72}
            height={54}
            className='object-contain mt-auto pt-8'
            priority
          />
          <p className='text-xs text-neutral-500'>on Campus MIT-WPU</p>
        </section>
      </div>
    </main>
  );
}
