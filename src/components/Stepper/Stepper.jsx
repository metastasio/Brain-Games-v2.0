import cn from 'classnames';
import { useSelector } from 'react-redux';

import './stepper.css';
import { config } from '../../services/config';
import {
  selectGameData,
  selectUserData,
  selectCompleteGames,
} from '../../store/stateSelectors';

export const Stepper = () => {
  const { signedIn } = useSelector(selectUserData);
  const { todaysGames } = useSelector(selectGameData);
  const completeGames = useSelector(selectCompleteGames);

  const isComplete = (i) => {
    const [skip3Step, skip4Step] = [2, 3];
    if (!signedIn && completeGames.length === config.unAuthUser) {
      return i !== skip3Step && i !== skip4Step;
    }
    return i <= completeGames.length - 1;
  };

  const classNames = (i) =>
    cn({
      'stepper-item': true,
      unavailable: !signedIn && (i === 2 || i === 3),
      completed: isComplete(i),
    });

  return (
    <div className='stepper-wrapper'>
      {todaysGames.map((game, i) => (
        <div className={classNames(i)} key={game.id}>
          <div className='step-counter'>{i + 1}</div>
        </div>
      ))}
    </div>
  );
};
