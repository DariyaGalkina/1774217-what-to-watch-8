import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowMore from './show-more';

const onFakeClick = jest.fn();
const history = createMemoryHistory();

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ShowMore onClick={onFakeClick}/>
      </Router>,
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });

  it('should execute onClick-function when button clicked', () => {
    render(
      <Router history={history}>
        <ShowMore onClick={onFakeClick}/>
      </Router>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(onFakeClick).toBeCalled();
  });
});
