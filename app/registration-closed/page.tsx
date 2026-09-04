"use client";

export default function RegistrationClosed() {
  return (
    <main className='h-[100dvh] md:h-auto md:min-h-[100dvh] relative flex flex-col items-center p-4 pt-6 md:p-16 justify-center'>
      <div className='flex flex-col items-center justify-center bg-neutral-900 p-6 py-8 rounded-xl md:w-[90%] max-w-[500px] w-full min-h-[400px] h-fit max-h-full overflow-y-auto md:overflow-y-visible gap-6'>
        <div className="flex flex-col items-center justify-center flex-grow w-full text-center gap-6 mt-8">
          <div className="flex items-center justify-center bg-white p-4 rounded-full mb-2">
            <img
              src="/assets/logo.png"
              alt="GDG MIT-WPU"
              className="w-12 h-12 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <h1 className="text-2xl font-bold">Registration Closed</h1>

          <p className="text-sm text-neutral-400">
            Thank you for your interest in
            <br />
            <strong className="text-neutral-200">GDG MIT-WPU</strong>.
          </p>

          <p className="text-sm text-neutral-400">
            Registrations for this recruitment drive
            <br />
            are now closed.
          </p>
        </div>
      </div>
    </main>
  );
}