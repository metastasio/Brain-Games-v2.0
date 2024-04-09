export const ErrorFallback = ({ error }) => {
  console.log('kek');
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};
