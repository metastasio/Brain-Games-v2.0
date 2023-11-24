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
import Congrats from './components/games/Congrats.jsx';
import routes from './routes';
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
          <Route path={routes.congrats()} element={<Congrats />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export { App };
