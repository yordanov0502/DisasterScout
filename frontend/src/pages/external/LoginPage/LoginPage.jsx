import { useState } from "react";
import "./login_page.scss";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { LoginComponent } from "../../../components/LoginComponent";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../../services/userService";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      // Handle success (e.g., navigate to dashboard, store token, etc.)
      console.log("Login Successful", response.data);
    },
    onError: (error) => {
      // Handle error
      console.error("Login Failed", error);
      //setErrorMessage('Login failed on server. Please try again.');
    },
  });

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage(""); // Clear error message when user starts typing
  };

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
