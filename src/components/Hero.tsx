import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { PROFILE_INFO } from '../config/profile';
import { SOCIALS } from '../config/socials';
import { SITE_DESCRIPTION } from '../config/site';
import SpotifyStatus from './Spotify';
import Spotify from './Spotify';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.814 0-9.752h3.554v1.381c.43-.664 1.195-1.612 2.905-1.612 2.121 0 3.71 1.328 3.71 4.182v5.801zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.712 0-.956.77-1.71 1.954-1.71 1.184 0 1.915.754 1.94 1.71 0 .953-.756 1.712-1.979 1.712zm1.581 11.597H3.635V9.561h3.283v10.891zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
  </svg>
);

const PortfolioMosaic = () => (
  <section className='mt-12 grid grid-cols-1 gap-2.5 overflow-hidden rounded-4xl text-white sm:grid-cols-4 sm:grid-rows-[1.15fr_1.15fr_1fr]'>
    <article className='relative min-h-65 overflow-hidden rounded-4xl bg-[#119bb6] px-7 py-7 sm:col-span-3 sm:row-span-1 sm:min-h-0'>
      <h2 className='max-w-xl text-2xl font-medium leading-tight sm:text-3xl'>Currently, I am building Hydrafetch</h2>
      <p className='mt-4 max-w-xl text-sm leading-6 text-white/90'>
        It turns any URL into clean Markdown and structured data your model can actually use, scrape, crawl, search and
        extract, all behind one API.
      </p>
      <p className='mt-3 max-w-xl text-sm leading-6 text-white/90'>
        No parsers to babysit, no boilerplate to strip, just one <strong>credit a page</strong> and web data your agents
        can trust.
      </p>
      <a
        href='#projects'
        className='mt-4 inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-sm transition-colors hover:bg-white/25'
      >
        Get 500 Free Credits <span className='ml-2'>→</span>
      </a>
    </article>

    <article className='relative min-h-65 overflow-hidden rounded-4xl bg-[#ffb300] sm:col-span-1 sm:row-span-1 sm:min-h-0'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#fff59a_0%,#ffd13d_48%,#ff9d00_100%)]' />
      <span className='absolute left-1/2 top-10 z-10 -translate-x-1/2 text-xl text-white/80'>✦</span>
      <img
        src='/profile.jpg'
        alt='Manoj Chaudhary'
        className='absolute bottom-0 left-1/2 z-10 h-[88%] w-full -translate-x-1/2 object-cover object-top mix-blend-multiply'
      />
    </article>

    <article className='min-h-62.5 rounded-4xl bg-[#242424] px-7 py-7 sm:col-span-1 sm:row-span-1 sm:min-h-0'>
      <h2 className='text-2xl font-medium leading-tight sm:text-3xl'>
        Working at
        <br />
        Levels.fyi
      </h2>
      <p className='mt-4 max-w-60 text-sm leading-6 text-white/85'>
        Senior Software Engineer handling backend and infrastructure at Levels.fyi.
      </p>
      <div className='mt-5 flex justify-end text-6xl leading-none text-[#52616b]' aria-hidden='true'>
        ▰
      </div>
    </article>

    <article className='min-h-62.5 overflow-hidden rounded-4xl bg-[#008c4a] px-7 py-7 sm:col-span-3 sm:row-span-1 sm:min-h-0'>
      <h2 className='text-center text-2xl font-medium sm:text-3xl'>Building my Homelab</h2>
      <p className='mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90'>
        Aside from software development, I am also interested in building a homelab and have been following this journey
        for a while now. Currently I am self-hosting lots of services and applications on my homelab. Read more about it
        on my <u>blog</u>.
      </p>
      <pre className='mt-4 overflow-hidden rounded-t-xl bg-[#242424] p-3 text-[9px] leading-3 text-[#76d68b] shadow-2xl'>{`$ ssh yuj\n\n       .--.       akash@yuj\n      |o_o |      OS: Ubuntu 22.04.4 LTS\n      |:_/ |      Host: RK3588\n     //   \\      Kernel: 6.1.43\n    (|     |)     Uptime: 3 mins`}</pre>
    </article>

    <article className='min-h-57.5 rounded-4xl bg-[#431d0e] px-7 py-7 sm:col-span-3 sm:row-span-1 sm:min-h-0'>
      <h2 className='text-2xl font-medium sm:text-3xl'>Git up and running</h2>
      <p className='mt-4 text-sm text-white/90'>A fun little snake simulation of my GitHub contributions.</p>
      <div className='mt-6 grid max-w-xl grid-cols-24 gap-1 opacity-80' aria-hidden='true'>
        {Array.from({ length: 168 }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-sm ${index % 17 === 0 ? 'bg-fuchsia-500' : index % 7 === 0 ? 'bg-emerald-500' : 'bg-[#153d2d]'}`}
          />
        ))}
      </div>
      <p className='mt-6 text-xs text-white/80'>
        Checkout some of my <u>side projects</u>.
      </p>
    </article>

    <article className='min-h-57.5 rounded-4xl bg-[#c53b5e] px-7 py-7 sm:col-span-1 sm:row-span-1 sm:min-h-0'>
      <h2 className='text-2xl font-medium sm:text-3xl'>Find Me Here</h2>
      <div className='mt-5 grid grid-cols-2 overflow-hidden rounded-lg border border-white/35'>
        {[
          ['GitHub', '◉'],
          ['X', '𝕏'],
          ['LinkedIn', 'in'],
          ['Reddit', '●'],
        ].map(([label, icon]) => (
          <a
            key={label}
            href='#contact'
            aria-label={label}
            className='flex h-16 items-center justify-center border-b border-r border-white/25 text-3xl font-bold transition-colors hover:bg-white/15 last:border-b-0 nth-[2n]:border-r-0 nth-[n+3]:border-b-0'
          >
            {icon}
          </a>
        ))}
      </div>
    </article>
  </section>
);

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  const getIcon = (iconName: string, size: number = 24) => {
    switch (iconName) {
      case 'Github':
        return <GithubIcon size={size} />;
      case 'Linkedin':
        return <LinkedinIcon size={size} />;
      case 'Mail':
        return <Mail size={size} />;
      default:
        return <GithubIcon size={size} />;
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      console.log('Image element found, src:', imgRef.current.src);
      const handleError = () => {
        console.log('Image load error detected');
        if (imgRef.current && !imgRef.current.src.includes('profile-placeholder.svg')) {
          console.log('Switching to placeholder');
          imgRef.current.src = '/profile-placeholder.svg';
        }
      };
      imgRef.current.addEventListener('error', handleError);
      return () => {
        if (imgRef.current) {
          imgRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, []);

  return (
    <section className='mb-16 flex flex-col justify-center pt-10'>
      <div className='mx-auto w-full max-w-6xl'>
        {/* <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-[#1b1b1b] shadow-[0_0_24px_rgba(0,0,0,0.45)] ring-1 ring-white/5 sm:h-16 sm:w-16">
              <img
                ref={imgRef}
                src="/profile.jpg"
                alt={`${PROFILE_INFO.name} profile`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div> */}

        <div className='max-w-4xl'>
          <h1 className='font-black leading-[0.95] text-white'>
            <span className='block text-5xl sm:text-5xl'>Hey there 👋, I'm</span>
            <span className='mt-4 block text-6xl bg-linear-to-r from-[#c4f7d6] via-[#a7f4b7] to-[#8ae3c2] bg-clip-text text-transparent sm:text-7xl'>
              Manoj Chaudhary.
            </span>
          </h1>

          <div className='mt-8 flex flex-wrap items-center gap-3 text-xl text-zinc-200 sm:text-2xl'>
            <span className='font-medium'>A software engineer and tech enthusiast based in</span>
            <span className='font-medium text-white'>Butwal, Nepal</span>
            <img src='/nepal-flag.gif' alt='Nepal flag' className='h-7 w-10 rounded-sm object-cover' />
          </div>

          <p className='mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl'>
            I build thoughtful digital experiences, explore modern technology, and turn ideas into practical products
            that feel meaningful and useful.
          </p>

          <div className='mt-10 flex flex-wrap gap-4'>
            <a
              href='/blog'
              className='inline-flex items-center justify-center rounded-full border border-[#7ee7c6]/60 bg-linear-to-r from-[#98f1c8] via-[#6fe7c0] to-[#64d09b] px-7 py-3 text-base font-semibold text-[#07130d] shadow-[0_10px_30px_rgba(110,232,176,0.35)] transition-transform duration-200 hover:scale-[1.02]'
            >
              Read blog
            </a>
            <a
              href='#projects'
              className='inline-flex items-center justify-center rounded-full border border-[#7ee7c6]/40 bg-transparent px-7 py-3 text-base font-semibold text-white shadow-[inset_0_0_0_1px_rgba(126,231,198,0.25)] transition-colors duration-200 hover:border-[#7ee7c6]/70 hover:bg-[#7ee7c6]/5'
            >
              My journey
            </a>
          </div>
        </div>

        <div className='mt-12'>
          <Spotify />
        </div>

        <PortfolioMosaic />

        <div className='mt-8 flex gap-6'>
          {SOCIALS.map((social) => {
            return (
              <a
                key={social.name}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
                className='text-gray-400 transition-all duration-300 transform hover:scale-125 hover:text-[#9af3cf]'
              >
                {getIcon(social.icon, 20)}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
