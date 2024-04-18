import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import "./login_component.scss";

export const LoginComponent = ({isLoading,loginForm, errorMessage, handleInput, onPressLogin, isRequestSent}) => {

  if(isLoading)
  {
  return (
    <div className="login">
      <div className="login__component">
      <div className="login__component__loader-box">
        <ComponentLoader />
      </div>
      </div>
    </div>
  );
  }

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
          <Link to="/forgot-password" className="login__component__forgot-password">
          Забравена парола?
          </Link> 
          {errorMessage && <div className="login__component__error-message">{errorMessage}</div>}
          <button type="submit" className="login__component__submit" disabled={isRequestSent}>Вход</button>
        </form>
      </div>
    </div>
  );
};
