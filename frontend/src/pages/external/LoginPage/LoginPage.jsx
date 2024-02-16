import { useState } from "react";
import "./login_page.scss";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { LoginComponent } from "../../../components/LoginComponent";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../../services/userService";
import { useLoginRateLimit } from "../../../hooks/useLoginRateLimit";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isSuspended, incrementLoginAttempts, resetSuspension } = useLoginRateLimit(); //? On 10th unsuccessful login attempt, suspension is set for a duration of 10 minutes for the current browser tab session

  const loginMutation = useMutation({ 
    mutationFn: loginRequest,
    onSuccess: (response) => {
      console.log("Login Successful", response.data);
      resetSuspension();
      // Handle success (e.g., navigate to dashboard, store token, etc.)
    },
    onError: (error) => { //? Regex passed, API call made, but apparently wrong credentials
      if (!isSuspended()) 
      {
        setErrorMessage("Невалидно потребителско име или парола."); 
        console.log("Login Failed", error);
        incrementLoginAttempts(); // Increment loginAttempts after unfulfilling API response
      } 
      else 
      {
        setErrorMessage("Невалидно потребителско име или парола.");
      }
    }
  });

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const onPressLogin = (event) => {
    event.preventDefault();
    //!!!!!!!!!!!!!!!!DISABLE BUTTON FOR COUPLE OF SECONDS AFTER CLICK 
    //!!!!!!!!!!!!!!!!IN ORDER TO PREVENT SENDING SAME CREDENTIALS 2 OR MORE TIMES, BEFORE RECEIVING RESPONSE FROM REGEX OR API

    const validationMessage = validateLoginForm(loginForm.username,loginForm.password); //If validation passes, validationMessage is ""
    setErrorMessage(validationMessage);

    if (isSuspended()) 
    { 
      return;
    }

    if (!validationMessage) 
    {
      loginMutation.mutate(loginForm); //? Here the above useMutation hook is called
    }
    else
    { 
      incrementLoginAttempts();  //Increment loginAttempts on a regex validation error
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
