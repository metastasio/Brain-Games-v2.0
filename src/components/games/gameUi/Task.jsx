export const Task = ({ question, hint }) => {
  return (
    <div>
      <h2>{question}</h2>
      {hint ? (
        <p>Hint: a number is even if it is completely divisible by 2</p>
      ) : null}
    </div>
  );
};
