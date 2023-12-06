import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import routes from '../../services/routes';
import { GameItem } from '../GameItem/GamеItem';
import './games.css';

export const Games = () => {
  const { t } = useTranslation();

  const { signedIn, todaysGames } = useSelector((state) => state.user);


  return (
    <section className='games-container'>
      <h2 className='workout'>{t('games.desc')}</h2>

      {signedIn ? null : (
        <p className='reminder'>
          <Link className='reminder-link' to={routes.signInPage()}>{t('games.reminderLogIn')}</Link>
          {t('games.reminder')}
        </p>
      )}

      <div className='cards-container'>
        {todaysGames.map((game, i) => (
          <GameItem name={game.name} key={i} available={game.available} />
        ))}
      </div>
    </section>
  );
};
