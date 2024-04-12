import { useTranslation } from 'react-i18next';

import './answerForm.css';

export const AnswerForm = ({ userAnswer, handleSubmit, handleChange }) => {
  const { t } = useTranslation();

  return (
    <div className='game-controls'>
      <form className='answer-form' onSubmit={handleSubmit}>
        <label htmlFor='answer-form'></label>
        <input
          autoFocus
          className='answer-input'
          id='answer-form'
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
    </div>
  );
};
