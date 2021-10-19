import { useRef } from 'react';
import type { FilmCardPlayerProps } from './type';

export default function FilmCardPlayer({src, poster, isPlayed} : FilmCardPlayerProps) : JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (isPlayed) {
    videoRef.current?.play();
  }

  if (!isPlayed) {
    videoRef.current?.load();
  }

  return (
    <video
      className="player__video"
      ref={videoRef}
      src={src}
      poster={poster}
      muted
    />
  );
}
