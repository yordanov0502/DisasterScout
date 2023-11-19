import "./login_component.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

export const LoginComponent = ({loginForm, errorMessage, handleInput, onPressLogin}) => {

  return (
    <div className="login">
      <div className="login__component">
        <div className="login__component__img"></div>
        <form onSubmit={onPressLogin}>
          <div className="login__component__username-field">
            <PersonIcon className={`login__component__username-field__icon ${loginForm.username && "login__component__username-field__icon-active"}`} />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Потребителско име"
              autoComplete="username"
              value={loginForm.username}
              onChange={handleInput}
              className={errorMessage ? "login__component__error" : "login__component__username-field__input"}
            />
          </div>
          <div className="login__component__password-field">
            <LockIcon className={`login__component__password-field__icon ${loginForm.password && "login__component__password-field__icon-active"}`} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Парола"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleInput}
              className={errorMessage ? "login__component__error" : "login__component__password-field__input"}
            />
          </div>
          <Link to="/reset-password" className="login__component__forgot-password">
          Забравена парола?
          </Link> 
          {errorMessage && <div className="login__component__error-message">{errorMessage}</div>}
          <input value="Вход" type="submit" className="login__component__submit" />
        </form>
      </div>
    </div>
  );
};
