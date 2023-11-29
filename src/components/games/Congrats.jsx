import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../services/routes';
import { resetCurrentGameScore } from '../../store/userSlice';

export const Congrats = ({
  name,
  resetCounter,
  resetStatus,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn, progress, currentGameScore } = useSelector(
    (state) => state.user,
  );

  const resetAll = () => {
    resetCounter();
    resetStatus();
    dispatch(resetCurrentGameScore());
  };

  const handleNext = () => {
    resetAll();
    if ((signedIn && progress === 5) || (!signedIn && progress === 3)) {
      navigate(routes.complete());
    }
  };
  const handlePlayAgain = () => {
    resetAll();
  };

  return (
    <section>
      <h2>Congratulations!</h2>
      <span>&#127881;</span>
      <p>
        You&#39;ve completed the <strong>{name}</strong>!
      </p>
      <p>You gained {currentGameScore} points</p>
      <div>
        <button onClick={handleNext}>
          <Link to={routes.games()}>Next game</Link>
        </button>
        <button onClick={handlePlayAgain}>Play again</button>
      </div>
    </section>
  );
};
