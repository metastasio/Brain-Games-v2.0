import { Link } from 'react-router-dom';
import routes from '../services/routes';
import { getRandomGames } from '../services/getRandomGames';
const randomGames = getRandomGames();

export const Games = () => {
  // const { signedIn } = useSelector((store) => store.user);
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
      <h2>Here are your games for today</h2>
      <p>Log in to get access to more games</p>
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
