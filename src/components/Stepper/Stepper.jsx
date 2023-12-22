import cn from 'classnames';
import { useSelector } from 'react-redux';

import './stepper.css';

export const Stepper = () => {
  const { signedIn, todaysGames } = useSelector((state) => state.user);
  const completeGames = todaysGames.filter((game) => game.complete);

  const isComplete = (i) => {
    if (signedIn) {
      return i <= completeGames.length - 1;
    }
    if (!signedIn) {
      if (completeGames.length !== 3) {
        return i <= completeGames.length - 1;
      }
      return i !== 2 && i !== 3;
    }
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
