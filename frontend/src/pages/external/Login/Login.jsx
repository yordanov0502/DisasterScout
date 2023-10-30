import "./login.scss";
import {Login as LoginComponent} from "../../../components";

export const Login = () => {


    return(
      <div className="page_login">
        { <LoginComponent/>}
      </div>
    );
};