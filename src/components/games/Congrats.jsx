import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import routes from '../../services/routes';
import { resetCurrentGameScore, updateTotalScore } from '../../store/userSlice';
import { useEffect } from 'react';

const Congrats = ({ name, resetCounter, resetStatus }) => {
  const dispatch = useDispatch();
  const { currentGameScore } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(updateTotalScore(currentGameScore)),
      dispatch(resetCurrentGameScore());
  }, [currentGameScore, dispatch]);

  return (
    <section>
      <h2>Congratulations!</h2>
      <span>&#127881;</span>
      <p>
        You&#39;ve completed the <strong>{name}</strong>!
      </p>
      <p>You gained {currentGameScore} points</p>
      <div>
        <button>
          <Link to={routes.games()}>Next game</Link>
        </button>
        <button
          onClick={() => {
            resetCounter(), resetStatus();
          }}
        >
          Play again
        </button>
      </div>
    </section>
  );
};
export default Congrats;
