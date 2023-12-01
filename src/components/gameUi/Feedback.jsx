import { useTranslation } from "react-i18next";

export const Feedback = ({ result }) => {
const { t } = useTranslation();

  if (result === 'success') {
    return <p>{t('games.correct')}</p>;
  }
  if (result === 'failed') {
    return <p>{t('games.incorrect')}</p>;
  }
};
