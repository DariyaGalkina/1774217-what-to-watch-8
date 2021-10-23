import type { FilmProps } from '../../types/film';
import type { ReviewProps } from '../../types/review';

export type FilmOverviewProps = {
  films: FilmProps[],
  reviews: ReviewProps[],
}
