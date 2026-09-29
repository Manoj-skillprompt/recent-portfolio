import { ExternalLink, Mail } from 'lucide-react';
import { FaReact } from 'react-icons/fa';
import { SiGit, SiJavascript, SiMysql, SiNextdotjs, SiPrisma, SiTypescript } from 'react-icons/si';
import { PROFILE_INFO } from '../config/profile';
import { SOCIALS } from '../config/socials';
import type { GitHubStats } from '../config/interfaces/github';
import GitHubContributions from './GitHubContributions';

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

const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z' />
  </svg>
);

type Props = {
  data: GitHubStats | null;
};
const getIcon = (iconName: string, size: number = 24) => {
  switch (iconName) {
    case 'Github':
      return <GithubIcon size={size} />;
    case 'Linkedin':
      return <LinkedinIcon size={size} />;
    case 'Twitter':
      return <TwitterIcon size={size} />;
    case 'Mail':
      return <Mail size={size} />;
    default:
      return <GithubIcon size={size} />;
  }
};

const PortfolioMosaic = ({ data }: Props) => (
  <section className='grid grid-cols-1 gap-2.5 overflow-hidden text-white sm:grid-cols-12 mt-12 sm:mt-24'>
    <article className='relative min-h-65 overflow-hidden rounded-tl-2xl rounded-tr-[3rem] rounded-br-xl rounded-bl-[3rem] bg-blue-900 px-7 py-7 sm:col-span-9'>
      <div className='tech-icon-cloud' aria-hidden='true'>
        <span className='tech-icon tech-icon--ts'>
          <SiTypescript className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--react'>
          <FaReact className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--js'>
          <SiJavascript className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--git'>
          <SiGit className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--next'>
          <SiNextdotjs className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--api'>
          <SiPrisma className='text-3xl' />
        </span>
        <span className='tech-icon tech-icon--api'>
          <SiMysql className='text-3xl' />
        </span>
      </div>
      <h2 className='relative z-10 max-w-xl text-xl font-bold leading-tight'>
        Currently, I'm building Basobas
      </h2>
      <p className='relative z-10 mt-4 max-w-xl text-base leading-6 text-white/95'>
        Basobas is a smart rental management portal that automates monthly rent and utility calculations, then generates
        invoices on schedule.
      </p>
      <p className='relative z-10 mt-3 max-w-xl text-base leading-6 text-white/95'>
        Landlords can notify tenants instantly by email or WhatsApp, manage everything from a feature-rich dashboard,
        and work with Nepal's Nepali calendar (B.S.)
      </p>
      <a
        href='#projects'
        className='relative z-10 mt-4 inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-base font-bold shadow-lg backdrop-blur-sm transition-colors hover:bg-white/25'
      >
        Visit site
        <ExternalLink className='ml-2 h-5 w-4' aria-hidden='true' />
      </a>
    </article>
    <article className='relative min-h-62.5 overflow-hidden rounded-tl-[3rem] rounded-tr-2xl rounded-br-[3rem] rounded-bl-xl bg-purple-900 px-7 py-7 sm:col-span-3 sm:min-h-0'>
      <h2 className='relative z-10 text-xl font-bold leading-tight'>
        <span className='inline-flex items-center gap-2'>Working at</span>
        <br />
        <span className='flex gap-2 items-center'>
          Skillprompt
          <span className='relative flex h-3 w-3' aria-hidden='true'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
            <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
          </span>
        </span>
      </h2>
      <p className='relative z-10 mt-4 text-base leading-6 text-white/85'>
        Software developer handling backend systems and user experience at Skillprompt.
      </p>
      <div className='honeycomb-pattern' aria-hidden='true'>
        {Array.from({ length: 4 }, (_, index) => (
          <span className='honeycomb-cell' key={index}>
            <span className='honeycomb-cell__inner' />
          </span>
        ))}
      </div>
    </article>

    <article id='find_me_here' className='min-h-57.5 rounded-tl-[3rem] rounded-tr-xl rounded-br-[3rem] rounded-bl-2xl bg-yellow-950 px-7 py-7 sm:col-span-3 sm:row-span-1 sm:min-h-0'>
      <h2 className='text-xl font-bold'>Find Me Here</h2>
      <div className='mt-7 grid grid-cols-2 overflow-hidden rounded-lg border border-white/35'>
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={social.name}
            className={`social-tile flex h-20 items-center justify-center border-b border-r border-white/25 text-3xl font-bold last:border-b-0 nth-[2n]:border-r-0 nth-[n+3]:border-b-0 ${social.color}`}
          >
            {getIcon(social.icon, 36)}
          </a>
        ))}
      </div>
    </article>

    <article className='min-h-57.5 overflow-hidden rounded-tl-xl rounded-tr-[3rem] rounded-br-2xl rounded-bl-[3rem] bg-[#161b22] px-7 py-7 sm:col-span-9 sm:min-h-0'>
      <h2 className='text-xl font-bold'>Github Contributions</h2>
      {/* <p className='mt-4 text-sm text-white/90'>A snapshot of my GitHub contributions.</p> */}
      <GitHubContributions data={data} />
    </article>
  </section>
);

export default function Hero({ data }: Props) {

  return (
    <section className='flex flex-col justify-center mt-8 sm:mt-22'>
      <div className='mx-auto w-full max-w-267'>

        <div className='max-w-4xl'>
          <h1 className='font-black leading-[0.94] text-foreground'>
            <span className='block text-3xl sm:text-5xl lg:text-6xl'>Hey there 👋, I'm</span>
            <span className='mt-3 block bg-linear-to-r from-[#e6fbf0] via-[#7ee7c6] to-[#0f93ad] bg-clip-text text-4xl text-transparent drop-shadow-[0_0_22px_rgba(126,231,198,0.28)] sm:text-6xl lg:text-7xl'>
              {PROFILE_INFO.name}.
            </span>
          </h1>

          <div className='mt-6 text-base text-muted sm:text-lg'>
            <span>A {PROFILE_INFO.role.toLowerCase()} and tech enthusiast based in</span>{' '}
            <span className='font-bold text-foreground'>{PROFILE_INFO.location}</span>
            <img
              src='/nepal-flag.gif'
              alt='Nepal flag'
              className='ml-2 mb-2 inline-block h-7 w-10 rounded-sm object-cover align-middle sm:h-8 sm:w-11'
            />
          </div>

          <p className='mt-4 text-base leading-relaxed text-muted sm:text-lg'>{PROFILE_INFO.description}</p>

          <div className='mt-8 flex flex-wrap gap-3 sm:gap-4'>
            <a
              href='/blog'
              className='btn-primary inline-flex items-center justify-center px-5 py-3 text-base sm:px-7 sm:text-lg'
            >
              Read blog
            </a>
            <a
              href='#projects'
              className='inline-flex items-center justify-center rounded-3xl border border-(--color-primary) bg-transparent px-5 py-3 text-base font-bold text-(--color-primary) shadow-[inset_0_0_0_1px_rgba(126,231,198,0.25)] transition-all duration-300 ease-out transform-gpu hover:rounded-[1.5rem_0.5rem_1.5rem_0.5rem] hover:scale-105 sm:px-7 sm:text-lg'
            >
              My works
            </a>
          </div>
        </div>

        <PortfolioMosaic data={data} />

      </div>
    </section>
  );
}
