import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../services/routes';
import { config } from '../../services/config';
import { resetCurrentGameScore } from '../../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';

export const Congrats = ({ name, resetCounter, resetStatus }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signedIn, progress, currentGameScore } = useSelector(
    (state) => state.user,
  );

  const resetAll = () => {
    resetCounter();
    resetStatus();
    dispatch(resetCurrentGameScore());
  };

  const handleNext = () => {
    resetAll();
    if (
      (signedIn && progress === config.authUser) ||
      (!signedIn && progress === config.unAuthUser)
    ) {
      navigate(routes.complete());
    }
  };
  const handlePlayAgain = () => {
    resetAll();
  };

  return (
    <section>
      <h2>{t('congrats.header')}</h2>
      <span>&#127881;</span>
      <p>
        <Trans i18nKey='congrats.text' values={{ name }} />
      </p>
      <p>
        <Trans
          i18nKey='congrats.points'
          values={{ points: currentGameScore }}
        />
      </p>
      <div>
        <button onClick={handleNext}>
          <Link to={routes.games()}>Next game</Link>
        </button>
        <button onClick={handlePlayAgain}>Play again</button>
      </div>
    </section>
  );
};
