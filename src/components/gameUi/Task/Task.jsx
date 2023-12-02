export const Task = ({ question, hint }) => {
  return (
    <div>
      <h2 className='h3'>{question}</h2>
      {hint ? <p className="hint">{hint}</p> : null}
    </div>
  );
};
