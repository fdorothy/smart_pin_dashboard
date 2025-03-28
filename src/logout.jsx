import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';
import { useStore } from './store';

const Logout = (props) => {
  const logout_fn = useStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    Auth.logout();
    logout_fn();
    navigate("/settings");
  }, []);
  return <p>Logging out...</p>;
};

export default Logout;
