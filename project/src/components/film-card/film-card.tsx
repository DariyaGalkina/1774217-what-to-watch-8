import type { FilmCardProps } from './type';

export default function FilmCard({id, filmName, preview, onMouseEnter}: FilmCardProps): JSX.Element {
  const handleMouseEnter = () => {
    onMouseEnter(id);
    // eslint-disable-next-line no-console
    console.log(id);
  };

  const handleMouseLeave = () => {
    onMouseEnter(null);
    // eslint-disable-next-line no-console
    console.log('off');
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <img src={preview} alt={filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{filmName}</a>
      </h3>
    </article>
  );
}
