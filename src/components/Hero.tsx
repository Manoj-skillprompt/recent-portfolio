import { useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { PROFILE_INFO } from '../config/profile';
import { SOCIALS } from '../config/socials';
import { SITE_DESCRIPTION } from '../config/site';
import SpotifyStatus from './Spotify';
import Spotify from './Spotify';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.814 0-9.752h3.554v1.381c.43-.664 1.195-1.612 2.905-1.612 2.121 0 3.71 1.328 3.71 4.182v5.801zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.712 0-.956.77-1.71 1.954-1.71 1.184 0 1.915.754 1.94 1.71 0 .953-.756 1.712-1.979 1.712zm1.581 11.597H3.635V9.561h3.283v10.891zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
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
    <section className="flex flex-col gap-4 mb-16">
      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-surface/80 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
          <img
            ref={imgRef}
            src="/profile.jpg"
            alt={`${PROFILE_INFO.name} profile`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-2">
          {/* <p className="text-sm uppercase tracking-[0.28em] text-accent opacity-90">{PROFILE_INFO.role}</p> */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              {PROFILE_INFO.name}
            </h1>
            <img
              src="/nepal-flag.gif"
              alt="Nepal flag"
              className="h-[2em] w-[3em] inline-block"
            />
          </div>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            {PROFILE_INFO.role}
          </p>
        
        </div>
      </div>
        <p className="text-sm text-muted max-w-2xl leading-relaxed">
            {PROFILE_INFO.quote}
          </p>
          <Spotify/>
          <div className="flex gap-6 mt-4">
            {SOCIALS.map((social) => {
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`text-gray-400 transition-all duration-300 transform hover:scale-125`}
                >
                  {getIcon(social.icon, 20)}
                </a>
              );
            })}
          </div>
    </section>
  );
}
