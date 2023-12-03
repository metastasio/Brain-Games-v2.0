import { useTranslation } from 'react-i18next';

export const Buttons = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <>
      <button onClick={() => handleClick(true)}>{t('games.yes')}</button>
      <button onClick={() => handleClick(false)}>{t('games.no')}</button>
    </>
  );
};
