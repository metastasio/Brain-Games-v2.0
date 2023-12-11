import { useTranslation } from 'react-i18next';

import './modal.css';

export const Modal = ({ onLeave, onStay }) => {
  const { t } = useTranslation();

  return (
    <div className='modal'>
      <div className='modal-wrapper'>
        <button className='modal-close' onClick={onStay}>
          &times;
        </button>

        <h3 className='modal-warning h6'>{t('modal.warning')}</h3>
        <p className='modal-warning-progress'>{t('modal.progress')}</p>
        <div className='modal-buttons'>
          <button autoFocus className='modal-button-stay' onClick={onStay}>
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
