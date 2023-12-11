import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { GameItem } from '../GameItem/GamеItem';
import { Restricted } from '../Restricted';
import './games.css';

export const Games = () => {
  const { t } = useTranslation();
  const { signedIn, todaysGames } = useSelector((state) => state.user);

  return (
    <section className='games-container'>
      <h2 className='workout'>{t('games.desc')}</h2>

      {signedIn ? null : <Restricted />}

      <div className='cards-container'>
        {todaysGames.map((game, i) => (
          <GameItem key={i} game={game} available={game.available} />
        ))}
      </div>
    </section>
  );
};
