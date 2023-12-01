import { useTranslation } from 'react-i18next';

import { getRandomGames } from '../../services/getRandomGames';
import { GameItem } from '../GameItem/GamItem';
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
        <GameItem game={game} key={i} />
      ))}
    </section>
  );
};
