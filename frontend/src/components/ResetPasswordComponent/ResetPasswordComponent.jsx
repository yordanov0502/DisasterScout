import "./reset_password_component.scss";
import EmailIcon from "@mui/icons-material/Email";

export const ResetPasswordComponent = ({ email, errorMessage, handleInput, onPressResetPassword }) => {

  return (
    <div className="reset_password">
      <div className="reset_password__component">
        <div className="reset_password__component__img"></div>
        <form onSubmit={onPressResetPassword}>
          <div className="reset_password__component__text-between">
            Моля въведете вашия имейл адрес. Ще получите имейл с нова парола и
            инструкции.
            {/* След като възстановите достъпа до вашия профил, е желателно да промените паролата си.  */}
          </div>
          <div className="reset_password__component__email-field">
            <EmailIcon className={`reset_password__component__email-field__icon ${email && "reset_password__component__email-field__icon-active"}`} />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Имейл адрес"
              autoComplete="email"
              value={email}
              onChange={handleInput}
              className={errorMessage ? "reset_password__component__error" : "reset_password__component__email-field__input"}
            />
          </div>
          {errorMessage && <div className="reset_password__component__error-message">{errorMessage}</div>}
          <input value="Нова парола" type="submit" className="reset_password__component__submit" />
        </form>
      </div>
    </div>
  );
};
