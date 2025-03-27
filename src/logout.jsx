import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from './auth';
import { useStore } from './store';

const Logout = (props) => {
  Auth.logout();
  const logout_fn = useStore((state) => state.logout);
  logout_fn();
  return (
    <Navigate to="/settings"/>
  );
};

export default Logout;
