import { useState } from "react";
import "./login_page.scss";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { LoginComponent } from "../../../components/LoginComponent";
import axios from "axios";
import { API_URL } from "../../../utils/constants.js";
import { useMutation } from "@tanstack/react-query";

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

  const loginMutation = useMutation({
    mutationFn: (credentials) => { return axios.post(API_URL + "/external/login", credentials,{withCredentials: true});},
    onSuccess: (response) => {
      // Handle success (e.g., navigate to dashboard, store token, etc.)
      console.log("Login Successful", response.data);
      console.log(
        axios.get(API_URL + "/internal/user", { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.error(error))
      ); //????????????????????????????????
    },
    onError: (error) => {
      // Handle error
      console.error("Login Failed", error);
      //setErrorMessage('Login failed on server. Please try again.');
    },
  });

  const onPressLogin = (event) => {
    event.preventDefault();
    const validationMessage = validateLoginForm(loginForm.username,loginForm.password); //* If validation passes, validationMessage is ""
    setErrorMessage(validationMessage);

    if (!validationMessage) {
      loginMutation.mutate(loginForm); //? here the above useMutation hook is called
    }
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
