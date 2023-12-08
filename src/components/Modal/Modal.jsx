import { useTranslation } from 'react-i18next';

import './modal.css';

export const Modal = ({ onLeave, onStay }) => {
  const { t } = useTranslation();

  return (
    <div className='modal'>
      <div className='modal-wrapper'>
        <p className='modal-warning'>{t('modal.warning')}</p>
        <p className='modal-warning-progress'>{t('modal.progress')}</p>
        <div className='modal-buttons'>
          <button className='modal-button-stay' onClick={onStay}>
            {t('modal.stay')}
          </button>
          <button className='modal-button-leave' onClick={onLeave}>
            {t('modal.leave')}
          </button>
        </div>
      </div>
    </div>
  );
};
