import cn from 'classnames';
import { Link } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routes from '../../services/routes';
import './gameItem.css';

export const GameItem = ({ game, i }) => {
  const { t } = useTranslation();
  const { signedIn, alreadyPlayed } = useSelector((state) => state.user);
  const classNames = cn({
    card: true,
    unavailable: !signedIn,
  });
  return (
    <div className={classNames} key={i}>
      <img className='card-img' src={`/img/${game}.jpg`} aria-hidden='true' />
      {alreadyPlayed.includes(game) ? (
        <div className='icon'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : null}

      <div className='play'>
        <Link to={routes[game]()}>{t(`games.${game}.name`)}</Link>
      </div>
    </div>
  );
};
