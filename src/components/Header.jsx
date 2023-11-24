import routes from '../routes';

const Header = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <h1>
              <a href={routes.mainPage()}>Brain Games</a>
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

export default Header;
