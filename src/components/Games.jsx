import { Link } from 'react-router-dom';

import routes from '../services/routes';
import { getRandomGames } from '../services/getRandomGames';
import { useTranslation } from 'react-i18next';
const randomGames = getRandomGames();

export const Games = () => {
  // const { signedIn } = useSelector((store) => store.user);
  const { t } = useTranslation();
  const gameRoutes = {
    'Even numbers': 'evenNumber',
    Calculations: 'calc',
    Progression: 'progression',
    'Greatest Divisor': 'gcd',
    'Prime Number': 'prime',
    'Find the Square': 'square',
  };

  return (
    <section>
      <h2>{t('games.desc')}</h2>
      <p>{t('games.reminder')}</p>
      {randomGames.map((game, i) => {
        for (let item in gameRoutes) {
          if (game === item) {
            return (
              <div className='card' key={i}>
                <Link to={routes[gameRoutes[item]]()}>{game}</Link>
              </div>
            );
          }
        }
      })}
    </section>
  );
};
