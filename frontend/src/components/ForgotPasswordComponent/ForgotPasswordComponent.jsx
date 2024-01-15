import "./forgot_password_component.scss";
import EmailIcon from "@mui/icons-material/Email";

export const ForgotPasswordComponent = ({ email, errorMessage, handleInput, onPressForgotPassword }) => {

  return (
    <div className="forgot_password">
      <div className="forgot_password__component">
        <div className="forgot_password__component__img"></div>
        <form onSubmit={onPressForgotPassword}>
          <div className="forgot_password__component__text-between">
            Моля въведете вашия имейл адрес. Ще получите имейл с нова парола и
            инструкции.
            {/* След като възстановите достъпа до вашия профил, е желателно да промените паролата си.  */}
          </div>
          <div className="forgot_password__component__email-field">
            <EmailIcon className={`forgot_password__component__email-field__icon ${email && "forgot_password__component__email-field__icon-active"}`} />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Имейл адрес"
              autoComplete="email"
              value={email}
              onChange={handleInput}
              className={errorMessage ? "forgot_password__component__error" : "forgot_password__component__email-field__input"}
            />
          </div>
          {errorMessage && <div className="forgot_password__component__error-message">{errorMessage}</div>}
          <input value="Нова парола" type="submit" className="forgot_password__component__submit" />
        </form>
      </div>
    </div>
  );
};
