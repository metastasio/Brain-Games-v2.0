import { Link } from 'react-router-dom';

import routes from '../../services/routes';
import { getRandomGames } from '../../services/getRandomGames';
import { useTranslation } from 'react-i18next';
import './games.css'

const randomGames = getRandomGames();

export const Games = () => {
  // const { signedIn } = useSelector((store) => store.user);
  const { t } = useTranslation();

  return (
    <section className='container'>
      <h2 className='workout'>{t('games.desc')}</h2>
      <p className='reminder'>{t('games.reminder')}</p>
      {randomGames.map((game, i) => (
        <div className='card' key={i}>
          <Link to={routes[game]()}>{t(`games.${game}.name`)}</Link>
        </div>
      ))}
    </section>
  );
};
