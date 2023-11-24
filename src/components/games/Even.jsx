import { useState } from 'react';
import { useDispatch } from 'react-redux';

import getRandomNumber from './utils';
import Congrats from './Congrats';
import routes from '../../routes';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

const Even = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(() => getRandomNumber());
  const [status, setStatus] = useState(null);
  const [counter, setCounter] = useState(0);

  const isCorrect = (answer, num) => {
    return (num % 2 === 0) === answer;
  };

  const handleRandomNumber = (value) => {
    if (isCorrect(value, number)) {
      dispatch(increaseCurrentScore());
      setStatus('success'); 
      setCounter((counter) => counter + 1);
    } else {
      dispatch(decreaseCurrentScore());
      setStatus('failed');
    }
    setNumber(getRandomNumber());
  };

  if (counter === 5) {
    return (
      <Congrats
        name='Even Number'
        game={routes.evenNumber()}
        counter={counter}
        setCounter={setCounter}
      />
    );
  } else {
    return (
      <section>
        <div>
          <h2>
            Answer &quot;yes&quot; if the number is even, otherwise answer
            &quot;no&quot;.
          </h2>
          <p>The game is complete once you&#39;ve given 5 correct answers</p>
          <p>Hint: a number is even if it is completely divisible by 2</p>
        </div>
        <div>
          <p>
            Is the number <strong>{number}</strong> even?
          </p>
          <div>
            <button onClick={() => handleRandomNumber(true)}>
              Yes
            </button>
            <button onClick={() => handleRandomNumber(false)}>
              No
            </button>
          </div>
          {status === 'success' ? <p>Correct! &#127775; +100 points </p> : null}
          {status === 'failed' ? <p>Incorrect &#128549; -5 points, try again!</p> : null}
          <p>Correct answers: {counter}/5</p>
        </div>
      </section>
    );
  }
};
export default Even;
