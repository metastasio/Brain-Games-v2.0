import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import { getRandomGames } from '../../services/getRandomGames';
import { GameItem } from '../GameItem/GamItem';
import './games.css';

// const randomGames = getRandomGames();

export const Games = () => {
  const { t } = useTranslation();
  const { signedIn, todaysGames } = useSelector((state) => state.user);

  return (
    <section className='games-container'>
      <h2 className='workout'>{t('games.desc')}</h2>

      {signedIn ? null : <p className='reminder'>{t('games.reminder')}</p>}

      <div className='cards-container'>
        {todaysGames.map((game, i) => (
          <GameItem game={game} key={i} />
        ))}
      </div>
    </section>
  );
};
