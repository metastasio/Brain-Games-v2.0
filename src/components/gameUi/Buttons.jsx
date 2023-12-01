import { useTranslation } from 'react-i18next';

export const Buttons = ({ handleClick }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <button onClick={() => handleClick(true)}>{t('games.yes')}</button>
      <button onClick={() => handleClick(false)}>{t('games.no')}</button>
    </div>
  );
};
