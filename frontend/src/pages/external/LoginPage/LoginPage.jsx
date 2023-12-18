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

  const loginMutation = useMutation((data) => {
    return axios.post(API_URL + "/external/login", data);
  });

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(API_URL+"/external/login", user);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Proceed with your login logic
  //! Authentication -> API (JWT...httpOnlyCookie...)
  const onPressLogin = (event) => {
    event.preventDefault();
    const validationMessage = validateLoginForm(loginForm.username, loginForm.password); //* If validation passes, validationMessage is ""
    setErrorMessage(validationMessage);

    if (!validationMessage) {
      loginMutation.mutate(loginForm, {
        onSuccess: (response) => {
          // Handle success (e.g., navigate to dashboard, store token, etc.)
          console.log("Login Successful", response.data);
        },
        onError: (error) => {
          // Handle error
          console.error("Login Failed", error);
          //setErrorMessage('Login failed. Please try again.');
        },
      });
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
