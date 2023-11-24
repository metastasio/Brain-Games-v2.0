import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types 
const Congrats = ({ name, setCounter }) => {
  const { currentGameScore } = useSelector((state) => state.user);
  const handleCounter = () => {
    setCounter(0);
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
        <button>Next game</button>
        <button onClick={handleCounter}>Play again</button>
      </div>
    </section>
  );
};
export default Congrats;
