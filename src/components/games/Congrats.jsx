import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../../services/routes';

export const Congrats = ({ name, resetCounter, resetStatus }) => {
  const navigate = useNavigate();
  const { signedIn, progress } = useSelector((state) => state.user);
  const { currentGameScore } = useSelector((state) => state.user);

  const handleClick = () => {
    resetCounter();
    resetStatus();
    if ((signedIn && progress === 5) || (!signedIn && progress === 3)) {
      navigate(routes.complete());
    }
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
