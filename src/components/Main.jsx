import { Link } from "react-router-dom";

import routes from "../routes";

const Main = () => {
  return (
    <main>
      <section>
        <h2>
          Welcome to the <span>Brain Games.</span>
        </h2>
        <p>
          A place where you can train your brain daily with up to 5 random small
          games aimed to improve the speed of processing and problem solving.
        </p>
        <Link to={routes.games()}>Start now!</Link>
      </section>
    </main>
  );
};
export default Main;
