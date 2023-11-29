import { Link } from 'react-router-dom';

import routes from '../services/routes';
import { getRandomGames } from '../services/getRandomGames';
import { useTranslation } from 'react-i18next';

const randomGames = getRandomGames();

export const Games = () => {
  // const { signedIn } = useSelector((store) => store.user);
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('games.desc')}</h2>
      <p>{t('games.reminder')}</p>
      {randomGames.map((game, i) => 
        <div className='card' key={i}>
          <Link to={routes[game]()}>{t(`games.${game}.name`)}</Link>
        </div>
      )}
    </section>
  );
};
