import React, { useState } from "react";
import "./reset_password_component.scss";
import EmailIcon from "@mui/icons-material/Email";

export const ResetPasswordComponent = () => {
  //? pri natisnat button enter
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  // Assuming you have some function to validate credentials
  // You should replace this with your actual validation logic
  const validateCredentials = (email) => {
    // Replace with actual validation
    return email === "validEmail";
  };

  const onPressResetPassword = (event) => {
    event.preventDefault(); //???
    //....................
    // Assuming you have a validation function or method to check credentials
    // If credentials are invalid set the error message
    if (!email) {
      setErrorMessage("Моля въведете имейл адрес.");
    } else if (!validateCredentials(email)) {
      setErrorMessage("Невалиден имейл адрес.");
    } else {
      // Proceed with your login logic
    }
  };
  //!regex proverkite za username v JS ne poddurjat predvaritelni proverki dali string moje da zapochva ili svurshva s daden symbol
  return (
    <div className="component">
      <div className="reset-password">
        <div className="img"></div>
        <form onSubmit={onPressResetPassword}>
          <div className="text-between">
            Моля въведете вашия имейл адрес. Ще получите имейл с нова парола и
            инструкции.
            {/* След като възстановите достъпа до вашия профил, е желателно да промените паролата си.  */}
          </div>
          <div className="email-field">
            <EmailIcon className={`email-icon ${email && "active"}`} />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Имейл адрес"
              //autoComplete="email" //???
              value={email}
              onChange={handleEmailChange}
              className={errorMessage ? "input-error" : ""}
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input value="Нова парола" type="submit" />
        </form>
      </div>
    </div>
  );
};
