import { useTranslation } from 'react-i18next';

import './answerForm.css';

export const AnswerForm = ({ userAnswer, handleSubmit, handleChange }) => {
  const { t } = useTranslation();

  return (
    <form className='answer-form' onSubmit={handleSubmit}>
      <input
        autoFocus
        className='answer-input'
        name='result'
        type='number'
        value={userAnswer}
        onChange={handleChange}
        required='required'
      />
      <button className='submit-answer' type='submit'>
        {t('games.try')}
      </button>
    </form>
  );
};
