import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilmTabOverview from '../film-tab-overview/film-tab-overview';
import FilmTabDetails from '../film-tab-details/film-tab-details';
import FilmTabReviews from '../film-tab-reviews/film-tab-reviews';
import type { FilmTabsProps } from './type';

const FilmTab = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

export default function FilmTabs({id, film, reviews}: FilmTabsProps) : JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmTab.OVERVIEW);

  const renderActiveTab = (tab: string) => {
    switch (tab) {
      case FilmTab.OVERVIEW:
        return <FilmTabOverview film={film} />;
      case FilmTab.DETAILS:
        return <FilmTabDetails film={film} />;
      case FilmTab.REVIEWS:
        return <FilmTabReviews reviews={reviews}/>;
    }
  };

  const setClassName = (thisTab: string) => (
    `film-nav__item ${activeTab === thisTab ? 'film-nav__item--active' : ''}`
  );

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={setClassName(FilmTab.OVERVIEW)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#overview`}
              onClick={(elem) => setActiveTab(elem.currentTarget.text)}
            >Overview
            </Link>
          </li>
          <li className={setClassName(FilmTab.DETAILS)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#details`}
              onClick={(elem) => setActiveTab(elem.currentTarget.text)}
            >Details
            </Link>
          </li>
          <li className={setClassName(FilmTab.REVIEWS)}>
            <Link
              className="film-nav__link"
              to={`/films/${id}/#reviews`}
              onClick={(elem) => setActiveTab(elem.currentTarget.text)}
            >Reviews
            </Link>
          </li>
        </ul>
      </nav>
      {renderActiveTab(activeTab)}
    </div>
  );
}
