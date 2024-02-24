import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useRateLimit } from "../../../hooks/useRateLimit";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { loginRequest } from "../../../services/userService";
import { useUserContext } from "../../../hooks/useUserContext";
import { LoginComponent } from "../../../components/LoginComponent";
import "./login_page.scss";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { isSuspended, incrementAttempts, resetSuspension } = useRateLimit(); //? On 10th unsuccessful login attempt, suspension is set for a duration of 10 minutes for the current browser tab session
  const { updateUserContext } = useUserContext();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onMutate: () => {
      setIsRequestSent(true); // isRequestSent is set to true right before the mutation starts, to prevent any further button clicks, before the request is resolved
    },
    onSuccess: (response) => {
      console.log("Login Successful", response.data); //TODO: remove this log when no more is needed
      resetSuspension();
      updateUserContext(response.data);
      localStorage.setItem("isAuthenticated", "TRUE");
      navigate("/cms");
    },
    onError: (error) => { //? Regex passed, API call made, but apparently wrong credentials
      console.log("Login Failed", error); //TODO: remove this log when no more is needed
      setErrorMessage("Невалидно потребителско име или парола.");
      if(!isSuspended()) 
      {
        incrementAttempts(); // Increment loginAttempts after unfulfilling API response
      }
    },
    onSettled: () => {
      setIsRequestSent(false); // isRequestSent is set to false after mutation has completed(request has been resolved a.k.a response was received) regardless of success or error, to make button available again
    }
  });

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const onPressLogin = (event) => {
    event.preventDefault();

    const validationMessage = validateLoginForm(loginForm.username,loginForm.password); //If validation passes, validationMessage is ""

    if(validationMessage) 
    {
      setErrorMessage(validationMessage);
      if(isRequestSent || isSuspended()) 
      {
        return;
      } 
      else 
      {
        incrementAttempts();
      }
    } 
    else 
    {
      if(isRequestSent || isSuspended()) 
      {
        setErrorMessage("Невалидно потребителско име или парола."); // error message for suspension
        return;
      } 
      else 
      {
        loginMutation.mutate(loginForm); //? Here the above useMutation hook is called
      }
    }
  };

  return (
    <div className="login_page">
      <LoginComponent
        loginForm={loginForm}
        errorMessage={errorMessage}
        handleInput={handleInput}
        onPressLogin={onPressLogin}
        isRequestSent={isRequestSent}
      />
    </div>
  );
};
