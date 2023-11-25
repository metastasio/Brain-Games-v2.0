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
            <a href={routes.games()}> Games</a>
          </li>
          <li>
            <a href={routes.signInPage()}>Login</a>
          </li>
          <li>Profile</li>
          <li>Lang</li>
        </ul>
      </nav>
    </>
  );
};
