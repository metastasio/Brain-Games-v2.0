export const Modal = ({ onLeave, onStay }) => {
  return (
    <div>
      <p>You are leaving this page.</p>
      <p>Your current progress will be lost</p>
      <div className='buttons'>
        <button onClick={onLeave}>Leave</button>
        <button onClick={onStay}>Stay</button>
      </div>
    </div>
  );
};
