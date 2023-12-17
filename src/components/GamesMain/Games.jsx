import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { GameItem } from '../GameItem/GamеItem';
import { Restricted } from '../Restricted';
import './games.css';

export const Games = () => {
  const { t } = useTranslation();
  const { signedIn, todaysGames } = useSelector((state) => state.user);
  const [currentGame, setCurrentGame] = useState(0);

  const handleNext = () => {
    setCurrentGame(
      currentGame === todaysGames.length - 1 ? 0 : currentGame + 1,
    );
  };
  const handlePrev = () => {
    setCurrentGame(
      currentGame === 0 ? todaysGames.length - 1 : currentGame - 1,
    );
  };

  return (
    <section className='games-container'>
      <h2 className='workout'>{t('games.desc')}</h2>
      <div className='games-reminder'>{signedIn ? null : <Restricted />}</div>

      <div className='cards-container'>
        <button className='games-arrow left' onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} alt='Previous game' />
        </button>

        {todaysGames.map((game, i) => (
          <GameItem
            key={game.id}
            i={i}
            game={game}
            available={game.available}
            currentGame={currentGame}
          />
        ))}

        <button className='games-arrow right' onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} alt='Next game' />
        </button>
      </div>
    </section>
  );
};
