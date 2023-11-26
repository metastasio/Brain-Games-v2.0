import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import routes from '../../services/routes';
import { updateTotalScore } from '../../store/userSlice';

const Congrats = ({ name, resetCounter, resetStatus }) => {
  const dispatch = useDispatch();
  const { currentGameScore } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(updateTotalScore(currentGameScore));
    resetCounter();
    resetStatus();
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
        <button onClick={handleClick}>
          <Link to={routes.games()}>Next game</Link>
        </button>
        <button onClick={handleClick}>Play again</button>
      </div>
    </section>
  );
};
export default Congrats;
