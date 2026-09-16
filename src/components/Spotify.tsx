import { useEffect, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { getMyMusicDetails, type TrackDetails } from '../config/spotify';

export default function Spotify() {
  const [track, setTrack] = useState<TrackDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const data = await getMyMusicDetails();
      setTrack(data);
      setLoading(false);
    }

    // Fetch immediately on mount
    fetchStatus();

    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className='flex w-full max-w-xl items-center gap-4 rounded-2xl border border-white/10 bg-[#101713] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)]'>
        <div className='h-16 w-16 shrink-0 animate-pulse rounded-xl bg-white/10' />
        <div className='flex flex-1 flex-col gap-2'>
          <span className='h-3 w-24 animate-pulse rounded bg-white/10' />
          <span className='h-4 w-48 max-w-full animate-pulse rounded bg-white/10' />
          <span className='h-3 w-32 animate-pulse rounded bg-white/10' />
        </div>
      </div>
    );
  }

  if (!track) return null;

  return (
    <a
      href={track.spotifyLink}
      target="_blank"
      rel="noopener noreferrer"
      className='group relative flex w-full max-w-xl items-center gap-4 overflow-hidden rounded-2xl border border-[#1DB954]/25 bg-[#101713] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1DB954]/60 hover:shadow-[0_22px_60px_rgba(29,185,84,0.16)]'
    >
      <div className='pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#1DB954]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-90' />

      <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1b2a20] shadow-lg'>
        <img
          src={track.albumArt}
          alt=''
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/spotify-tile.svg';
          }}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div className='absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <Play className='h-5 w-5 fill-white text-white' aria-hidden='true' />
        </div>
      </div>

      <div className='relative min-w-0 flex-1'>
        <div className='mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1DB954]'>
          <span className={`h-1.5 w-1.5 rounded-full bg-[#1DB954] ${track.isCurrentlyPlaying ? 'animate-pulse' : ''}`} />
          {track.isCurrentlyPlaying ? 'Now playing' : 'Last played'}
        </div>
        <p className='truncate text-base font-semibold text-foreground'>{track.songName}</p>
        <p className='truncate text-sm text-muted'>{track.artistName}</p>
      </div>

      <div className='relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#1DB954] transition-colors group-hover:bg-[#1DB954] group-hover:text-[#07130d]'>
        <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
      </div>

    </a>
  );
}