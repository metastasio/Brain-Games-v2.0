import { useSelector } from 'react-redux';
import routes from '../../routes';
import { Link } from 'react-router-dom';

const Congrats = () => {
  const { currentGameScore } = useSelector((state) => state.user);
  return (
    <section>
      <h2>Congratulations!</h2>
      <span>&#127881;</span>
      <p>You&#39;ve completed {}!</p>
      <p>You gained {currentGameScore} points</p>
      <div>
        <a href='' type='button'>
          Next game
        </a>
        <Link to={routes.evenNumber()}>Play again</Link>
      </div>
    </section>
  );
};
export default Congrats;
