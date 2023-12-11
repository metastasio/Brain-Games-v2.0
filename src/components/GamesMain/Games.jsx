import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { GameItem } from '../GameItem/GamеItem';
import { Restricted } from '../Restricted';
import './games.css';
import 'swiper/css';
import 'swiper/css/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';

export const Games = () => {
  const { t } = useTranslation();
  const { signedIn, todaysGames } = useSelector((state) => state.user);

  return (
    <section className='games-container'>
      <h2 className='workout'>{t('games.desc')}</h2>

      {signedIn ? null : <Restricted />}

      <div className='cards-container'>
        {todaysGames.map((game, i) => (
          <GameItem game={game} key={i} available={game.available} />
        ))}
      </div>
    </section>
  );
};
