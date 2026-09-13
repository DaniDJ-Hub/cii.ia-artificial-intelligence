// Generado por scripts/build-video.mjs. No editar a mano: ejecutar `npm run video`.

export interface VideoEntry {
  width: number;
  height: number;
  duration: number;
  sources: { desktop: string; mobile: string };
  poster: string;
  still: string;
}

export const VIDEOS: Record<string, VideoEntry> = {
  'welcome': {
    "width": 1280,
    "height": 960,
    "duration": 28.07,
    "sources": {
      "desktop": "/video/welcome-1280.mp4",
      "mobile": "/video/welcome-960.mp4"
    },
    "poster": "/video/welcome-poster.webp",
    "still": "/video/welcome-still.webp"
  },
};
