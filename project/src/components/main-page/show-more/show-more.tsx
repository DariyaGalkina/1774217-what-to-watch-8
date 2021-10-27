import type { ShowMoreProps } from './type';

export default function ShowMore({films}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
}
