import type { FilmProps } from '../../types/film';
import type { ReviewProps } from '../../types/review';

export type AppProps = {
  films: FilmProps[],
  reviews: ReviewProps[],
}
