import { useTransition } from 'react';

export const Input = ({ userAnswer, handleSubmit, handleChange }) => {
  const { t } = useTransition();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='result'
          type='number'
          value={userAnswer}
          onChange={handleChange}
          required='required'
        />
        <button type='submit'>{t('games.try')}</button>
      </form>
    </div>
  );
};
