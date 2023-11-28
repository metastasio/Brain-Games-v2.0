export const Modal = ({ onLeave, onStay }) => {
  return (
    <div>
      <p>You are leaving this page.</p>
      <p>Your progress will be lost</p>
      <button onClick={onLeave}>Leave</button>
      <button onClick={onStay}>Stay</button>
    </div>
  );
};
