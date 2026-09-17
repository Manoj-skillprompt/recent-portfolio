// src/utils/spotify.ts

// Fetch variables from the .env file using Astro's import.meta.env
const LASTFM_API_KEY = import.meta.env.PUBLIC_LASTFM_API_KEY; 
const USERNAME = import.meta.env.PUBLIC_LASTFM_USERNAME; 
const FALLBACK_ALBUM_ART = '/spotify-tile.svg';

// Last.fm serves this stock image when a track has no cover art:
// https://lastfm.freetls.fastly.net/i/u/*/2a96cbd8b46e442fc41c2b86b821562f.png
const LASTFM_PLACEHOLDER_HASH = '2a96cbd8b46e442fc41c2b86b821562f';

function isValidAlbumArt(url: string): boolean {
  const value = url.trim();
  return value.length > 0 && !value.includes(LASTFM_PLACEHOLDER_HASH);
}

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
    const albumArtUrl = track.image?.[2]?.['#text'] || '';
    const albumArt = isValidAlbumArt(albumArtUrl) ? albumArtUrl : FALLBACK_ALBUM_ART;
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