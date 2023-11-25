export const AnswersCount = ({ count }) => {
  return (
    <div>
      <p>The game is complete once you&#39;ve given 5 correct answers</p>
      <p>Correct answers: {count}/5</p>
    </div>
  );
};
