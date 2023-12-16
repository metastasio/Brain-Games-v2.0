import cn from 'classnames';
import { Link } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routes from '../../services/routes';
import './gameItem.css';

export const GameItem = ({ game, i, available, currentGame }) => {
  // console.log(i, 'IIIII')
  const { t } = useTranslation();
  const { name, complete } = game;
  const classNames = cn({
    'game-card': true,
    available,
    hidden: currentGame !== i,
  });

  return (
    <div className={classNames}>
      <img
        className='game-card-img'
        src={`/img/${name}.jpg`}
        aria-hidden='true'
      />
      {complete ? (
        <div className='game-complete-icon'>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : null}

      <div className='game-play'>
        <Link to={routes[name]()}>{t(`games.${name}.name`)}</Link>
      </div>
    </div>
  );
};
