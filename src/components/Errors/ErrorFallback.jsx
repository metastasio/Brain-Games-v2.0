import { useTranslation } from 'react-i18next';
import './errors.css';

export const ErrorFallback = ({ error }) => {
  const { t } = useTranslation();

  return (
    <section className='error-wrapper'>
      <div role='alert'>
        <p className='h3'>{t('errors.error')}:</p>
        <pre className='error-text'>{error.message}</pre>
      </div>
    </section>
  );
};
