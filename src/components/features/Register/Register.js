import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import illustration from '../../../assets/illustration.svg';
import google from '../../../assets/G.svg';
import facebook from '../../../assets/fb.svg';

const Register = props => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleGoogleLogin = e => {};
  const handleFacebookLogin = e => {};

  const handleClick = e => {
    e.preventDefault();
    props.handleRegister(register);
  };

  const handleUsernameChange = e => {
    const updateRegister = { ...register };
    updateRegister.username = e.target.value;
    setRegister(updateRegister);
  };

  const handleEmailChange = e => {
    const updateRegister = { ...register };
    updateRegister.email = e.target.value;
    setRegister(updateRegister);
  };

  const handlePasswordChange = e => {
    const updateRegister = { ...register };
    updateRegister.password = e.target.value;
    setRegister(updateRegister);
  };
  return (
    <div className="yassir-login">
      <div className="row">
        <div className="col-md-5 col-sm-5 col-lg-4">
          <img src={illustration} className="ilustration" />
        </div>
        <div className="col-md-6 col-sm-7 col-lg-5">
          <h3 className="text-center mb-3"> Ready to join the square ?</h3>
          <form>
            <div className="form-group">
              <input
                type="test"
                className="form-control rounded-pill"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control rounded-pill"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-block btn-success rounded-pill"
              onClick={handleClick}
            >
              Submit
            </button>
          </form>
          <div>
            <small>
              Already have an account?{' '}
              <NavLink className="link" to="/auth">
                Login
              </NavLink>
            </small>
          </div>
          <div className="social-auth">
            <div className="p-3 text-center">
              <span className="h11 bg-white p-1 inline-block">OR</span>
            </div>
            <button
              type="submit"
              className="btn btn-block btn-outline-primary rounded-pill"
              onClick={handleGoogleLogin}
            >
              <img src={google} className="btn-g" />
              Connect with Google
            </button>
            <button
              type="submit"
              className="btn btn-block btn-outline-primary rounded-pill"
              onClick={handleFacebookLogin}
            >
              <img src={facebook} className="btn-fb" />
              Connect with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
