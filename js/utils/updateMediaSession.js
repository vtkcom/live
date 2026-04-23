export function updateMediaSession(data, imageUrl, mime) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.currentTrack.title,
      artist: data.currentTrack.artist,
      album: data.currentTrack.album,
      artwork: [
        {
          src: imageUrl,
          type: mime,
        },
      ],
    });
  }
}
