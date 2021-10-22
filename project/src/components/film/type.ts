import { FilmProps } from '../../types/film';
import { ReviewProp } from '../../types/review';

export type FilmOverviewProps = {
  films: FilmProps[],
  reviews: ReviewProp[],
}
