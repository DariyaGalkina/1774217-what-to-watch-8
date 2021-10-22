import type { FilmProps } from '../../types/film';
import type { ReviewProps } from '../../types/review';

export type FilmTabsProps = {
  id: string
  film: FilmProps,
  reviews: ReviewProps[],
}
