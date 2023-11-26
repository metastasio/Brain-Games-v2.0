export const Task = ({ question, hint }) => {
  return (
    <div>
      <h2>{question}</h2>
      {hint ? <p>{hint}</p> : null}
    </div>
  );
};
