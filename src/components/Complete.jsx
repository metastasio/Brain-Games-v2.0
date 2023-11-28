import { useSelector } from 'react-redux';

export const Complete = () => {
  const { totalScore } = useSelector((state) => state.user);
  return (
    <section>
      <h2>Congratulations!</h2>
      <p>&#127882;</p>
      <p>You&#39;ve completed your games for today!</p>
      <p>
        Your total score is <strong>{totalScore}</strong>
      </p>
    </section>
  );
};
