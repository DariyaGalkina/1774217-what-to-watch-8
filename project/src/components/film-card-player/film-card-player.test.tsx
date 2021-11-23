import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeFilm } from '../../mocks/film-data';
import FilmCardPlayer from './film-card-player';

const VIDEO_DELAY = 1000;

const fakeFilm = makeFakeFilm();
const fakeLoad = jest.fn();
const fakePlay = jest.fn();

describe('Component: FilmCardPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = fakeLoad;
    window.HTMLMediaElement.prototype.play = fakePlay;
  });

  it('should render correctly', () => {
    const { container } = render(
      <FilmCardPlayer
        src={fakeFilm.previewVideoLink}
        poster={fakeFilm.previewImage}
        isPlayed={false}
      />,
    );

    expect(container.querySelector('video')).toBeInTheDocument();
    expect(container.querySelector('video')).toHaveClass('player__video');
  });

  it('should load and play video when mouse enter', () => {
    const { container } = render(
      <FilmCardPlayer
        src={fakeFilm.previewVideoLink}
        poster={fakeFilm.previewImage}
        isPlayed={false}
      />,
    );

    userEvent.hover(container);

    setTimeout(()=> {
      expect(fakePlay).toBeCalled();
    }, VIDEO_DELAY);

    expect(fakeLoad).toBeCalled();
  });

  it('should stop video when mouse leave', () => {
    const { container } = render(
      <FilmCardPlayer
        src={fakeFilm.previewVideoLink}
        poster={fakeFilm.previewImage}
        isPlayed
      />,
    );

    userEvent.unhover(container);

    expect(fakePlay).not.toBeCalled();
    expect(fakeLoad).not.toBeCalled();
  });
});
