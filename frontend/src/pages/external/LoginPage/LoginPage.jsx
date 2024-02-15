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

  const loginMutation = useMutation({ //!!!!!!!!!!!!!!!!!!!!TODO: IMPLEMENT LOGIN RATE LIMIT 10 PER COUPLE OF MINUTES
    mutationFn: loginRequest,
    onSuccess: (response) => {
      // Handle success (e.g., navigate to dashboard, store token, etc.)
      console.log("Login Successful", response.data);
    },
    onError: (error) => {
      // Handle error
      setErrorMessage("Невалидно потребителско име или парола.") //! regex passed, but apparently wrong credentials
      console.error("Login Failed", error);
      //setErrorMessage('Login failed on server. Please try again.');
      //!TODO based on different error codes, different snackbars/alerts to appear
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
