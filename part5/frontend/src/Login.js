import React, { useState } from "react";
import api from "./api";

const Login = ({ onLogin, setError, setNotice }) => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.login(login, password);
      onLogin(response);
      setNotice("Signed in");
    } catch (error) {
      setError("Couldn't sign in");
    }
  };

  if (!show) {
    return <button onClick={() => setShow(true)}>Log in</button>;
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 32 }}>
      <input placeholder="Username" onChange={onLoginChange} value={login} />
      <input
        placeholder="Password"
        type="password"
        onChange={onPasswordChange}
        value={password}
      />
      <button type="submit">Login</button>
      <button onClick={() => setShow(false)}>Cancel</button>
    </form>
  );
};

export default Login;
