import React, { useState } from "react";
import "./login_component.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

export const LoginComponent = () => {
  //? pri natisnat button enter
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  // Assuming you have some function to validate credentials
  // You should replace this with your actual validation logic
  const validateCredentials = (username, password) => {
    // Replace with actual validation
    return username === "validUser" && password === "validPass";
  };

  const onPressLogin = (event) => {
    event.preventDefault(); //???
    //....................
    // Assuming you have a validation function or method to check credentials
    // If credentials are invalid set the error message
    if (!username || !password) {
      setErrorMessage("Моля въведете данни в полетата.");
    } else if (!validateCredentials(username, password)) {
      setErrorMessage("Невалидно потребителско име или парола.");
    } else {
      // Proceed with your login logic
    }
  };

  //* Невалидно потребителско име или парола.
  //* Моля въведете данни в полетата.
  //!regex proverkite za username v JS ne poddurjat predvaritelni proverki dali string moje da zapochva ili svurshva s daden symbol

  return (
    <div className="component">
      <div className="login">
        <div className="img"></div>
        <form onSubmit={onPressLogin}>
          <div className="username-field">
            <PersonIcon className={`username-icon ${username && "active"}`} />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Потребителско име"
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
              className={errorMessage ? "input-error" : ""}
            />
          </div>
          <div className="password-field">
            <LockIcon className={`password-icon ${password && "active"}`} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Парола"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              className={errorMessage ? "input-error" : ""}
            />
          </div>
          <a href="/reset-password" className="forgot-password">
            Забравена парола?
          </a>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input value="Вход" type="submit" />
        </form>
      </div>
    </div>
  );
};