import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../services/routes';

export const Header = () => {
  const { totalScore } = useSelector((state) => state.user);
  return (
    <>
      <nav>
        <ul>
          <li>
            <h1>
              <Link to={routes.mainPage()}>&#127922; Brain Games</Link>
            </h1>
          </li>
          <li>
            <Link to={routes.games()}>Games</Link>
          </li>
          <li>
            <Link to={routes.signInPage()}>Login</Link>
          </li>
          <li>Profile {totalScore}</li>
          <li>Lang</li>
        </ul>
      </nav>
    </>
  );
};
