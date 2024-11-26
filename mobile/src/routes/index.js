import React, {useContext} from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import {AuthContext} from '../contexts/auth';

function Routes() {
  const {signed} = useContext(AuthContext);

  const loading = false;

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
