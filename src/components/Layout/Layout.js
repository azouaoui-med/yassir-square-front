import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../features/Auth/Auth';
import Register from '../features/Register/Register';
import Home from '../features/Home/Home';
import Logo from '../UI/Logo/Logo';
import Footer from '../UI/Footer/Footer';
import axios from '../../axios';

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthFail, setIsAuthFail] = useState(false);
  const [registerError, setRegisterError] = useState({ error: '' });

  useEffect(() => {
    setRegisterError({ error: '' });
    setIsAuthFail(false);
  }, []);

  const handleAuth = async login => {
    try {
      const response = await axios.post('/login', login);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuth(true);
      }
    } catch (error) {
      setIsAuthFail(true);
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setIsAuth(false);
  };

  const handleRegister = async userInfo => {
    try {
      const response = await axios.post('/register', userInfo);
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuth(true);
      }
      if (response.error) {
      }
    } catch (error) {
      setRegisterError({ error: 'Error while registering' });
      console.log(error);
    }
  };

  return (
    <div>
      <main className="container pt-4">
        <Switch>
          <div>
            <Logo></Logo>
            <div>
              <Route
                path="/auth"
                render={() =>
                  !isAuth ? (
                    <Auth
                      handleAuth={handleAuth}
                      isAuthFail={isAuthFail}
                    ></Auth>
                  ) : (
                    <Redirect to="/"></Redirect>
                  )
                }
              />
              <Route
                path="/register"
                render={() =>
                  !isAuth ? (
                    <Register
                      handleRegister={handleRegister}
                      registerError={registerError}
                    ></Register>
                  ) : (
                    <Redirect to="/"></Redirect>
                  )
                }
              />
            </div>
            <Footer></Footer>
          </div>
          <Route
            path="/"
            render={() => {
              return isAuth ? <Home></Home> : <Redirect to="/auth"></Redirect>;
            }}
          />
        </Switch>
      </main>
    </div>
  );
};

export default Layout;
