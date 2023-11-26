import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Header,
  Footer,
  Main,
  Games,
  SignIn,
  SignUp,
  NotFound,
} from './components';
import Even from './components/games/Even.jsx';
import { Calc } from './components/games/Calc.jsx';
import { Progression } from './components/games/Progression.jsx';
import Congrats from './components/games/Congrats.jsx';
import routes from './services/routes.js';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routes.mainPage()} element={<Main />} />
          <Route path={routes.games()} element={<Games />} />
          <Route path={routes.signInPage()} element={<SignIn />} />
          <Route path={routes.signUpPage()} element={<SignUp />} />
          <Route path={routes.evenNumber()} element={<Even />} />
          <Route path={routes.calc()} element={<Calc />} />
          <Route path={routes.progression()} element={<Progression />} />
          <Route path={routes.congrats()} element={<Congrats />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export { App };
