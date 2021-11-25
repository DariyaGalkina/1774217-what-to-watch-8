import {
  render,
  screen
} from '@testing-library/react';
import PlayIcon from './play-icon';

describe('Component: PlayIcon', () => {
  it('should render correctly', () => {
    render(<PlayIcon />);

    expect(screen.getByTestId(/play/i)).toBeInTheDocument();
  });
});
