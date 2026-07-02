// src/utils/spotify.ts

// Fetch variables from the .env file using Astro's import.meta.env
const LASTFM_API_KEY = import.meta.env.PUBLIC_LASTFM_API_KEY; 
const USERNAME = import.meta.env.PUBLIC_LASTFM_USERNAME; 

export interface TrackDetails {
  songName: string;
  artistName: string;
  albumArt: string;
  spotifyLink: string;
  isCurrentlyPlaying: boolean;
}

export async function getMyMusicDetails(): Promise<TrackDetails | null> {
  // Defensive check to ensure variables loaded correctly
  if (!LASTFM_API_KEY || !USERNAME) {
    console.error("Missing Last.fm environment variables in .env file");
    return null;
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    if (!data.recenttracks || !data.recenttracks.track.length) {
      return null;
    }

    const track = data.recenttracks.track[0];
    const songName = track.name;
    const artistName = track.artist['#text'];
    const albumArt = track.image[2]['#text'] || 'https://via.placeholder.com/150'; 
    const isCurrentlyPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

    const encodedQuery = encodeURIComponent(`${songName} ${artistName}`);
    const spotifyLink = `https://open.spotify.com/search/${encodedQuery}`;

    return {
      songName,
      artistName,
      albumArt,
      spotifyLink,
      isCurrentlyPlaying
    };
  } catch (error) {
    console.error("Could not fetch song data:", error);
    return null;
  }
}