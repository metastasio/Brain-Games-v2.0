import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import routes from './services/routes.js';
import {
  Header,
  Footer,
  Main,
  Games,
  SignIn,
  SignUp,
  NotFound,
  Complete,
} from './components';
import './App.css';
import {
  Calc,
  Even,
  Gcd,
  Prime,
  Progression,
  Square,
} from './components/games/index.js';
import { Game } from './components/Game.jsx';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routes.mainPage(),
        element: <Main />,
      },
      {
        path: routes.games(),
        element: <Games />,
      },
      {
        path: routes.signInPage(),
        element: <SignIn />,
      },
      {
        path: routes.signUpPage(),
        element: <SignUp />,
      },
      {
        path: routes.evenNumber(),
        element: <Game CurrentGame={Even} name='Even Numbers' />,
      },
      {
        path: routes.calc(),
        element: <Game CurrentGame={Calc} name='Calculations' />,
      },
      {
        path: routes.progression(),
        element: <Game CurrentGame={Progression} name='Progression' />,
      },
      {
        path: routes.gcd(),
        element: <Game CurrentGame={Gcd} name='Greatest Divisor' />,
      },
      {
        path: routes.prime(),
        element: <Game CurrentGame={Prime} name='Prime Number' />,
      },
      {
        path: routes.square(),
        element: <Game CurrentGame={Square} name='Find the Square' />,
      },
      {
        path: routes.complete(),
        element: <Complete />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export { App };
