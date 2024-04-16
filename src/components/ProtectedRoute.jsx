import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../services/routes';
import { selectUserData } from '../store/stateSelectors';

export const ProtectedRoute = ({ Profile }) => {
  const { signedIn } = useSelector(selectUserData);
  

  if (!signedIn) {
    return (
      <Navigate to={routes.mainPage()} replace />
    );
  }
  return <Profile />;
};
