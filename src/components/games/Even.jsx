import { useState } from 'react';
import { useDispatch } from 'react-redux';

import getRandomNumber from './utils';
import {
  increaseCurrentScore,
  decreaseCurrentScore,
} from '../../store/userSlice';

const Even = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(getRandomNumber());
  const [success, setSuccess] = useState(null);
  const [unsuccess, setUnsuccess] = useState(null);

  const isCorrect = (answer, num) => {
    return (num % 2 === 0) === JSON.parse(answer);
  };

  let counter = 0;
  const handleRandomNumber = (e) => {

    while (counter <= 3) {
      if (isCorrect(e.target.name, number)) {
        dispatch(increaseCurrentScore());
        setSuccess(true);
        setUnsuccess(false);
        counter++;
      } else {
        dispatch(decreaseCurrentScore());
        setUnsuccess(true);
        setSuccess(false);
      }
      setNumber(getRandomNumber());
    }
    console.log(counter);
  };

  return (
    <article>
      <div>
        <h2>
          Answer &quot;yes&quot; if the number is even, otherwise answer
          &quot;no&quot;.
        </h2>
        <p>Hint: a number is even when it can be completely divided by 2</p>
      </div>
      <div>
        <p>{number}</p>
      </div>
      <div>
        <p>Is the number even?</p>
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
      </div>
    </article>
  );
};
export default Even;
