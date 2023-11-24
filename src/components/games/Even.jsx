import getRandomNumber from './utils';

const Even = () => {
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
        <p>{getRandomNumber()}</p>
      </div>
      <div>
        <p>Is the number even?</p>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </article>
  );
};
export { Even };
