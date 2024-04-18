import EmailIcon from "@mui/icons-material/Email";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import "./forgot_password_component.scss";

export const ForgotPasswordComponent = ({ isLoading, forgotPasswordForm, errorMessage, handleInput, onPressForgotPassword }) => {


  if(isLoading)
  {
  return (
    <div className="forgot_password">
      <div className="forgot_password__component">
      <div className="forgot_password__component__loader-box">
        <ComponentLoader />
      </div>
      </div>
    </div>
  );
  }

  return (
    <div className="forgot_password">
      <div className="forgot_password__component">
        <div className="forgot_password__component__img"></div>
        <form onSubmit={onPressForgotPassword}>
          <div className="forgot_password__component__text-between">
            Моля въведете вашия имейл адрес. Ще получите имейл с нова парола и
            инструкции.
          </div>
          <div className="forgot_password__component__email-field">
            <EmailIcon className={`forgot_password__component__email-field__icon ${forgotPasswordForm.email && "forgot_password__component__email-field__icon-active"}`} />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Имейл адрес"
              autoComplete="email"
              value={forgotPasswordForm.email}
              onChange={handleInput}
              className={errorMessage ? "forgot_password__component__error" : "forgot_password__component__email-field__input"}
            />
          </div>
          {errorMessage && <div className="forgot_password__component__error-message">{errorMessage}</div>}
          <button type="submit" className="forgot_password__component__submit">Нова парола</button>
        </form>
      </div>
    </div>
  );
};
