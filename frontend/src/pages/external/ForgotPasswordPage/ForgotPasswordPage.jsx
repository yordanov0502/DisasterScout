import { useState } from "react";
import "./forgot_password_page.scss";
import { validateForgotPasswordForm } from "../../../validations/userRegexValidation";
import { ForgotPasswordComponent } from "../../../components/ForgotPasswordComponent";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value.trim());
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const onPressForgotPassword = (event) => {
    event.preventDefault();
    const validationMessage = validateForgotPasswordForm(email); //* If validation passes, validationMessage is ""
    setErrorMessage(validationMessage);

    if(!validationMessage){
        // Proceed with your login logic
        //? send email with newly generated password and instructions to the user with the provided email existing in DB
      
    }
  };

  return (
    <div className="forgot_password_page">
      {
        <ForgotPasswordComponent
          email={email}
          errorMessage={errorMessage}
          handleInput={handleInput}
          onPressResetPassword={onPressForgotPassword}
        />
      }
    </div>
  );
};
