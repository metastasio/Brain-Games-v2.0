import cn from 'classnames';
import { Link } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routes from '../../services/routes';
import './gameItem.css';

export const GameItem = ({ name, i, available }) => {

  const { t } = useTranslation();
  const { alreadyPlayed } = useSelector((state) => state.user);
  const classNames = cn({
    card: true,
    available,
  });

  return (
    <div className={classNames} key={i}>
      <img className='card-img' src={`/img/${name}.jpg`} aria-hidden='true' />
      {alreadyPlayed.includes(name) ? (
        <div className='icon'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : null}

      <div className='play'>
        <Link to={routes[name]()}>{t(`games.${name}.name`)}</Link>
      </div>
    </div>
  );
};
