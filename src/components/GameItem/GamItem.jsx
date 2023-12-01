import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './gameItem.css'

export const GameItem = ({ game, i }) => {
  const { t } = useTranslation();
  return (
    <div className='card' key={i}>
      <div className='play'>
        <Link to={routes[game]()}>{t(`games.${game}.name`)}</Link>
      </div>
    </div>
  );
};
