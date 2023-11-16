import "./login_component.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

export const LoginComponent = ({loginForm, errorMessage, handleInput, onPressLogin}) => {

  return (
    <div className="component">
      <div className="login">
        <div className="img"></div>
        <form onSubmit={onPressLogin}>
          <div className="username-field">
            <PersonIcon className={`username-icon ${loginForm.username && "active"}`} />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Потребителско име"
              autoComplete="username"
              value={loginForm.username}
              onChange={handleInput}
              className={errorMessage ? "input-error" : ""}
            />
          </div>
          <div className="password-field">
            <LockIcon className={`password-icon ${loginForm.password && "active"}`} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Парола"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleInput}
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
