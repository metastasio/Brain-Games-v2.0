import getRandomNumber from './utils';

const EvenNumber = () => {
  return (
    <article>
      <h2>
        Answer &quot;yes&quot; if the number is even, otherwise answer
        &quot;no&quot;.
      </h2>
      <div>
        <p>{getRandomNumber()}</p>
      </div>
    </article>
  );
};
export default EvenNumber;
