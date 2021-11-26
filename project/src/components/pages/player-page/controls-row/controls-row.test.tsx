import { render } from '@testing-library/react';
import ControlsRow from './controls-row';

const FAKE_DURATION = 120;
const FAKE_TIME = 10;

describe('Component: PauseIcon', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ControlsRow
        duration={FAKE_DURATION}
        currentTime={FAKE_TIME}
      />,
    );

    expect(container.firstChild).toHaveClass('player__controls-row');
  });
});
