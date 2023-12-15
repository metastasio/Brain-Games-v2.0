import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import routes from '../services/routes';

export const ProtectedRoute = ({ children }) => {
  const { signedIn } = useSelector((state) => state.user);
  let location = useLocation();

  if (!signedIn) {
    return (
      <Navigate to={routes.mainPage()} state={{ from: location }} replace />
    );
  }
  return children;
};
