import React, { useState } from 'react';
import { PROFILE_INFO } from '../config/profile';

export default function Newsletter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id='newsletter' className='my-20'>
      <div className='relative'>
        {/* Dark Card */}
        <div
          className={`relative overflow-hidden rounded-2xl border bg-[#151515] p-8 md:p-12 md:ml-28 md:mr-48 transition-all duration-500 ${
            isHovered
              ? 'border-[#7ee7c6]/40 shadow-[0_0_80px_-15px_rgba(126,231,198,0.25)]'
              : 'border-white/5 shadow-none'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Side: Text and Form */}
          <div className='md:w-3/4 space-y-6 z-10 relative'>
            <div>
              <h3 className='text-[#7ee7c6] font-bold uppercase tracking-wider text-sm mb-2'>Stay in touch</h3>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Join my newsletter</h2>
              <p className='text-zinc-400 text-sm leading-relaxed max-w-md'>
                I&apos;m not very regular with posting, but whenever I find something interesting or useful in tech, I
                like to share it. Subscribe to my newsletter and I&apos;ll send you the updates so you don&apos;t miss
                anything important :)
              </p>
            </div>

            <form className='flex flex-col sm:flex-row gap-3 mt-8'>
              <input
                type='email'
                placeholder='Your email'
                className='flex-1 rounded-lg bg-[#222222] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#7ee7c6]/70 transition-colors'
                required
              />
              <button
                type='submit'
                className='rounded-lg bg-[#7ee7c6] hover:bg-[#64d09b] text-[#07130d] font-bold px-6 py-3 transition-colors shrink-0'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Polaroid Image (Overlapping the right edge) */}
        <div
          className='absolute right-0 md:right-32 top-1/2 -translate-y-1/2 z-20 hidden md:block group'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='bg-white p-3 pb-8 rounded shadow-2xl rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105'>
            <div className='relative w-48 h-48 md:w-56 md:h-56 bg-zinc-200'>
              <img
                src='/profile.jpg'
                alt={PROFILE_INFO?.name || 'Profile picture'}
                className='w-full h-full object-cover filter grayscale'
              />
            </div>
            <div className='absolute bottom-2 left-0 right-0 text-center font-serif italic text-sm text-black'>
              It's worth it, pinky swear!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
