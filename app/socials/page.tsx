'use client';

import Image from 'next/image';
import './socials.css';

const GOOGLE_BLUE = '#4285F4';
const GOOGLE_RED = '#EA4335';
const GOOGLE_YELLOW = '#FBBC05';
const GOOGLE_GREEN = '#34A853';

const STEPS = ['Details', 'Domain', 'Questions', 'Embarked'];

export default function EmbarkedPage() {
  return (
    <main className='socials-page'>
      <div className='socials-glow' />

      <div className='floating-shape shape-1'>
        <Image src='/assets/google-flower.svg' alt='' width={42} height={42} />
      </div>

      <div className='floating-shape shape-2'>
        <Image src='/assets/google-spark.svg' alt='' width={34} height={34} />
      </div>

      <div className='floating-shape shape-3'>
        <Image src='/assets/google-ring.svg' alt='' width={48} height={48} />
      </div>

      <div className='socials-container'>
        <header className='socials-header'>
          <div className='brand'>
            <Image
              src='/assets/logo.png'
              alt='GDG MIT-WPU'
              width={64}
              height={48}
              className='brand-logo'
              priority
            />

            <div className='brand-text'>
              <h2>GDG MIT-WPU</h2>
              <p>RECRUITMENT FORM</p>
            </div>
          </div>

          <div className='stepper'>
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;

              return (
                <div className='step-wrapper' key={step}>
                  <div className='step-item'>
                    <div
                      className={`step-circle ${
                        stepNumber === 4 ? 'active' : 'completed'
                      }`}
                    >
                      {stepNumber === 4 ? '4' : '✓'}
                    </div>

                    <span
                      className={
                        stepNumber === 4
                          ? 'step-label active-label'
                          : 'step-label'
                      }
                    >
                      {step}
                    </span>
                  </div>

                  {index < STEPS.length - 1 && <div className='step-line' />}
                </div>
              );
            })}
          </div>
        </header>

        <section className='socials-card'>
          <div className='success-icon'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>

          <div className='success-badge'>
            <span>🎉</span>
            <span>Congratulations · Form Submitted</span>
          </div>

          <div className='journey-box'>
            <h2>Connect, Learn, Grow</h2>

            <p>We&apos;ll review your application and reach out soon!</p>
          </div>

          <p className='footer-text'>GDG on Campus · MIT-WPU</p>
        </section>
      </div>
    </main>
  );
}
