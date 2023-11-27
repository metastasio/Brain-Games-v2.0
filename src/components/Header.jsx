import { Link } from 'react-router-dom';
import routes from '../services/routes';

export const Header = () => {
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
          <li>Profile</li>
          <li>Lang</li>
        </ul>
      </nav>
    </>
  );
};
