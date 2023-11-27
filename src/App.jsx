import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import Congrats from './components/games/Congrats.jsx';
import routes from './services/routes.js';
import {
  Header,
  Footer,
  Main,
  Games,
  SignIn,
  SignUp,
  NotFound,
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
        element: <Even />,
      },
      {
        path: routes.calc(),
        element: <Calc />,
      },
      {
        path: routes.progression(),
        element: <Progression />,
      },
      {
        path: routes.gcd(),
        element: <Gcd />,
      },
      {
        path: routes.prime(),
        element: <Prime />,
      },
      {
        path: routes.square(),
        element: <Square />,
      },
      {
        path: routes.congrats(),
        element: <Congrats />,
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
