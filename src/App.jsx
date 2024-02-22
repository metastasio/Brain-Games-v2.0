import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import routes from './services/routes.js';
import {
  Footer,
  Main,
  Games,
  SignIn,
  SignUp,
  NotFound,
  Complete,
  Profile,
  ProtectedRoute,
  Header,
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
import { ThemeContext } from './services/themeContext.js';

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
      { path: routes.profile(), element: <ProtectedRoute Profile={Profile} /> },
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
        path: routes.even(),
        element: <Game CurrentGame={Even} name='even' />,
      },
      {
        path: routes.calc(),
        element: <Game CurrentGame={Calc} name='calc' />,
      },
      {
        path: routes.progression(),
        element: <Game CurrentGame={Progression} name='progression' />,
      },
      {
        path: routes.gcd(),
        element: <Game CurrentGame={Gcd} name='gcd' />,
      },
      {
        path: routes.prime(),
        element: <Game CurrentGame={Prime} name='prime' />,
      },
      {
        path: routes.square(),
        element: <Game CurrentGame={Square} name='square' />,
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
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export { App };
