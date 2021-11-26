import {
  render,
  screen
} from '@testing-library/react';
import PauseIcon from './pause-icon';

describe('Component: PauseIcon', () => {
  it('should render correctly', () => {
    render(<PauseIcon />);

    expect(screen.getByTestId(/pause/i)).toBeInTheDocument();
  });
});
