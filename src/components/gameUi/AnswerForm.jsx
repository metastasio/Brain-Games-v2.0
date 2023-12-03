import { useTranslation } from 'react-i18next';

export const AnswerForm = ({ userAnswer, handleSubmit, handleChange }) => {
  const { t } = useTranslation();

  return (
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
  );
};
