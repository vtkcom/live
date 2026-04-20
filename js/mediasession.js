export function updateMediaSession(data, imageUrl) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.currentTrack.title,
      artist: data.currentTrack.artist,
      album: data.currentTrack.album,
      artwork: [
        {
          src: imageUrl,
          type: data.currentTrack.image.mime,
        },
      ],
    });
  }
}
