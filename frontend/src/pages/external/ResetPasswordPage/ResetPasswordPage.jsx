import { useState } from "react";
import "./reset_password_page.scss";
import { validateResetPasswordForm } from "../../../validations";
import {ResetPasswordComponent} from "../../../components";

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value.trim());
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const onPressResetPassword = (event) => {
    event.preventDefault();

    setErrorMessage(validateResetPasswordForm(email));
    !errorMessage &&
      {
        // Proceed with your login logic
        //? send email with newly generated password and instructions to the user with the provided email existing in DB
      };
  };

    return(
      <div className="reset_password_page">
        { <ResetPasswordComponent
          email={email} 
          errorMessage={errorMessage} 
          handleInput={handleInput} 
          onPressResetPassword={onPressResetPassword} 
          />}
      </div>
    );
};