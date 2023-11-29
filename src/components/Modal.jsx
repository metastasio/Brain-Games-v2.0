import { Trans, useTranslation } from 'react-i18next';

export const Modal = ({ onLeave, onStay }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Trans i18nKey={'modal.warning'}></Trans>

      <div className='buttons'>
        <button onClick={onLeave}>{t('modal.leave')}</button>
        <button onClick={onStay}>{t('modal.stay')}</button>
      </div>
    </div>
  );
};
