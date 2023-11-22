import { useState } from "react";
import "./login_page.scss";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { LoginComponent } from "../../../components/LoginComponent";
import axios from "axios";
import { useEffect } from "react";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage(""); // Clear error message when user starts typing
  };


  const API_URL = "http://localhost:8080/api/external/login";
  const [user, setUser] = useState({
    username: "ivanov50",
    password: "B0502HTto$hko"
  });

  useEffect(() => {
    const fetchData = async () =>{
      
      try{
        const response = await axios.post(API_URL,user);
        setUser(response.data);
     }
     catch(error){
         console.log(error);
     }
    };

    fetchData();
  },[]);

  



  const onPressLogin = (event) => {
    event.preventDefault();

    setErrorMessage(validateLoginForm(loginForm.username, loginForm.password));
    !errorMessage &&
      {
        // Proceed with your login logic
        //! Authentication -> API (JWT...httpOnlyCookie...)
      };
  };

  return (
    <div className="login_page">
      <LoginComponent
        loginForm={loginForm}
        errorMessage={errorMessage}
        handleInput={handleInput}
        onPressLogin={onPressLogin}
      />
    </div>
  );
};
