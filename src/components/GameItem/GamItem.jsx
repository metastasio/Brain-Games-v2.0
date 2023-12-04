import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import './gameItem.css';

export const GameItem = ({ game, i }) => {
  const { t } = useTranslation();
  const { signedIn } = useSelector((state) => state.user);
  console.log(signedIn, 'SIGNEDIN');
  const classNames = cn({
    card: true,
    kek: true,
    unavailable: !signedIn,
  });
  return (
    <div className={classNames} key={i}>
      <img className='card-img' src={`/img/${game}.jpg`} aria-hidden='true' />
      <div className='play'>
        <Link to={routes[game]()}>{t(`games.${game}.name`)}</Link>
      </div>
    </div>
  );
};
