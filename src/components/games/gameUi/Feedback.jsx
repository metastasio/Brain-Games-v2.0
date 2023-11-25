export const Feedback = ({ result }) => {
  if (result === 'success') {
    return <p>Correct! &#127775; +100 points </p>;
  }
  if (result === 'failed') {
    return <p>Incorrect &#128549; -5 points, try again!</p>;
  }
};
