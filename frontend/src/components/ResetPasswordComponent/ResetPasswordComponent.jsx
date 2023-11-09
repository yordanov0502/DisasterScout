import { useState } from "react";
import "./reset_password_component.scss";
import EmailIcon from "@mui/icons-material/Email";
import { validateResetPasswordForm } from "../../validations";

export const ResetPasswordComponent = () => {
  //? pri natisnat button enter
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value.trim());
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const onPressResetPassword = (event) => {
    event.preventDefault(); //???

    setErrorMessage(validateResetPasswordForm(email));
    !errorMessage && {
       // Proceed with your login logic
      //? send email with newly generated password and instructions to the user with the provided email existing in DB
    }
  };
  
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
              onChange={handleInput}
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
