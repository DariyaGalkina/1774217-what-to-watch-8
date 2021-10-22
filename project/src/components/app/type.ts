import type { FilmProps } from '../../types/film';
import type { ReviewProp } from '../../types/review';

export type AppProps = {
  films: FilmProps[],
  reviews: ReviewProp[],
}
