import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import routes from '../services/routes';
import { selectUserData } from '../store/stateSelectors';

export const ProtectedRoute = ({ Profile }) => {
  const { signedIn } = useSelector(selectUserData);
  let location = useLocation();

  if (!signedIn) {
    return (
      <Navigate to={routes.mainPage()} state={{ from: location }} replace />
    );
  }
  return <Profile />;
};
