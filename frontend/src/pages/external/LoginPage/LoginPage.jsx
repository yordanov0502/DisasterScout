import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useRateLimit } from "../../../hooks/useRateLimit";
import { validateLoginForm } from "../../../validations/userRegexValidation";
import { loginRequest } from "../../../services/userService";
import { LoginComponent } from "../../../components/LoginComponent";
import "./login_page.scss";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const {isRequestSent, setIsRequestSent} = useIsRequestSent();
  const {isSuspended, incrementAttempts, resetSuspension} = useRateLimit(); //? On 10th unsuccessful login attempt, suspension is set for a duration of 10 minutes for the current browser tab session
    

  const loginMutation = useMutation({ 
    mutationFn: loginRequest, 
    onMutate: () => {                         
      setIsRequestSent(true); // isRequestSent is set to true right before the mutation starts, to prevent any further button clicks, before the request is resolved
    },
    onSuccess: (response) => {
      console.log("Login Successful", response.data);
      resetSuspension();
      // Handle success (e.g., navigate to dashboard, store token, etc.)
    },
    onError: (error) => { //? Regex passed, API call made, but apparently wrong credentials
      setErrorMessage("Невалидно потребителско име или парола.");
      console.log("Login Failed", error); 
      if (!isSuspended()) 
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
        setErrorMessage("Невалидно потребителско име или парола.");// error message for suspension
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
