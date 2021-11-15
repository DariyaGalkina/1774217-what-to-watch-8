import { memo } from 'react';
import { Time } from '../../../../const';
import { formatRemainingTime } from '../../../../utils';

type ProgressBarProps = {
  duration: number,
  currentTime: number,
}

function ControlsRow({duration, currentTime}: ProgressBarProps): JSX.Element {
  const getTImePercent = (): number =>
    duration ? (100 / duration * currentTime) : Time.Zero;

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress
          className="player__progress"
          value={currentTime}
          max={duration}
        />
        <div className="player__toggler" style={{left: `${getTImePercent()}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">
        {formatRemainingTime(duration - currentTime)}
      </div>
    </div>
  );
}

export default memo(ControlsRow);
