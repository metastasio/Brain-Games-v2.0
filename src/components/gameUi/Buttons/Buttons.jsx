import { useTranslation } from 'react-i18next';

import './buttons.css';

export const Buttons = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <>
      <button className='game-button yes' onClick={() => handleClick(true)}>
        {t('games.yes')}
      </button>
      <button className='game-button no' onClick={() => handleClick(false)}>
        {t('games.no')}
      </button>
    </>
  );
};
