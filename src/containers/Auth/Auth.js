import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Auth.css";

const Auth = React.memo(props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  let errorMessage = null;

  const inputSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(email, password, isSignup);
    setEmail("");
    setPassword("");
  };

  const switchButtonHandler = () => {
    setIsSignup(!isSignup);
  };

  if (props.error) {
    errorMessage = <h5>{props.error.message}</h5>;
  }
  
  let redirect = <Redirect to="/" />;

  return (
    <div className="auth">
      <h1>Login to your Diary App</h1>
      {props.isAuthenticate ? redirect : null}
      {!props.authLoading ? (
        <form onSubmit={inputSubmitHandler} className="auth-form">
          {errorMessage}
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
          <button type="submit">{isSignup ? "Sign-up" : "Login"}</button>

          <p onClick={switchButtonHandler}>
            Are you {isSignup ? "Login" : "Sign-up"} ?
          </p>
        </form>
      ) : (
        <Spinner />
      )}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.auth.token,
    error: state.auth.error,
    authLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
