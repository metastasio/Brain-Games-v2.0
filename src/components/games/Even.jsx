import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import getRandomNumber from './utils';
import routes from '../../routes';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

const Even = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, setNumber] = useState(getRandomNumber());
  const [success, setSuccess] = useState(null);
  const [unsuccess, setUnsuccess] = useState(null);
  const [counter, setCounter] = useState(0);

  const isCorrect = (answer, num) => {
    return (num % 2 === 0) === JSON.parse(answer);
  };

  const handleRandomNumber = (e) => {
    if (isCorrect(e.target.name, number)) {
      dispatch(increaseCurrentScore());
      setSuccess(true);
      setUnsuccess(false);
      setCounter((counter) => counter + 1);
    } else {
      dispatch(decreaseCurrentScore());
      setUnsuccess(true);
      setSuccess(false);
    }
    setNumber(getRandomNumber());
  };

  useEffect(() => {
    if (counter === 5) {
      setCounter(0);
      navigate(routes.congrats(), { replace: false });
    }
  }, [counter, navigate]);

  return (
    <article>
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
          <button onClick={handleRandomNumber} name='true'>
            Yes
          </button>
          <button onClick={handleRandomNumber} name='false'>
            No
          </button>
        </div>
        {success ? <p>Correct! &#127775; +100 points </p> : null}
        {unsuccess ? <p>Incorrect &#128549; -5 points, try again!</p> : null}
        <p>Correct answers: {counter}/5</p>
      </div>
    </article>
  );
};
export default Even;
