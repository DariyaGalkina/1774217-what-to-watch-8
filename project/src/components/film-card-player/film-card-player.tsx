import { useRef } from 'react';
import type { FilmCardPlayerProps } from './type';

export default function FilmCardPlayer({src, poster, isPlayed} : FilmCardPlayerProps) : JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
    />
  );
}
