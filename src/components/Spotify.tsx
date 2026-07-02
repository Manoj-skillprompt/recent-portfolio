import { useEffect, useState } from 'react';
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
      <div className="flex items-center gap-2 text-sm text-muted animate-pulse pt-1">
        <div className="h-4 w-4 rounded-full bg-neutral-700" />
        <span className="bg-neutral-700 h-4 w-32 rounded" />
      </div>
    );
  }

  if (!track) return null;

  return (
    <a
      href={track.spotifyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm group hover:opacity-80 transition-opacity pt-1"
    >
      {/* Spotify Green Icon */}
      <svg
        className="h-6 w-6 text-[#1DB954] shrink"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.074-.668-.135-.744-.47s.135-.668.47-.744c3.856-.88 7.15-.51 9.822 1.13.295.178.387.563.206.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.67-1.114 8.24-.57 11.35 1.345.366.226.486.706.26 1.073zm.105-2.833C14.383 8.74 8.44 8.54 4.997 9.585c-.533.162-1.093-.137-1.255-.67-.163-.533.137-1.093.67-1.255 3.954-1.2 10.51-.98 14.586 1.44.48.285.637.9.352 1.38-.285.48-.9.637-1.38.353z" />
      </svg>

      <span className="text-muted-foreground font-normal">
        {track.isCurrentlyPlaying ? 'Now playing' : 'Last played'} —{' '}
      </span>
      
      <span className="text-foreground font-medium group-hover:underline truncate max-w-62.5 sm:max-w-md">
        {track.songName} · {track.artistName}
      </span>
    </a>
  );
}