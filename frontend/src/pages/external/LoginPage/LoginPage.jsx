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

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`; 
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`; 

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
      setIsRequestSent(true);
    },
    onSuccess: (response) => {
      resetSuspension();
      updateUserContext(response.data);
      localStorage.setItem(LOCAL_STORAGE_KEY1, LOCAL_STORAGE_VALUE1);
      navigate("/cms-home");
    },
    onError: (/*error*/) => {
      setErrorMessage("Невалидно потребителско име или парола.");
      if(!isSuspended()) 
      {
        incrementAttempts();
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
    }
  });

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value.trim() });
    setErrorMessage("");
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
        setErrorMessage("Невалидно потребителско име или парола.");
        return;
      } 
      else 
      {
        loginMutation.mutate(loginForm);
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
