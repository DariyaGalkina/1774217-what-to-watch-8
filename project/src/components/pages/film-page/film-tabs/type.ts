import type { FilmProps } from '../../../../types/film';
import type { ReviewProps } from '../../../../types/review';

export type FilmTabsProps = {
  id: number,
  film: FilmProps,
  reviews: ReviewProps[],
}
