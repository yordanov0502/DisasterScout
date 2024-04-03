import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { validateForgotPasswordForm } from "../../../validations/userRegexValidation";
import { ForgotPasswordComponent } from "../../../components/ForgotPasswordComponent";
import { useRateLimit } from "../../../hooks/useRateLimit";
import { forgotPasswordRequest } from "../../../services/userService";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { Alert, Snackbar } from "@mui/material";
import { useSnackbar } from "../../../hooks/useSnackbar";
import "./forgot_password_page.scss";

export const ForgotPasswordPage = () => {
  const [forgotPasswordForm, setForgotPasswordForm ] = useState({
    email: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { isSuspended, incrementAttempts, resetSuspension } = useRateLimit(); //? On 10th unsuccessful forgot password attempt, suspension is set for a duration of 10 minutes for the current browser tab session
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      showSnackbar("Изпратена е нова парола на посочения имейл адрес.", "success");
      resetSuspension();
      setForgotPasswordForm({ email: ""});
      setErrorMessage("");
    },
    onError: (error) => {
      if(error?.response?.data?.startsWith("Please try again."))
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.", "error");
      }
      else{
        setErrorMessage("Невалиден имейл адрес.");
        if(!isSuspended()) 
        {
          incrementAttempts();
        }
      }
    },
    onSettled: () => {
      setIsRequestSent(false);
    }
  });

  const handleInput = (e) => {
    setForgotPasswordForm(prevState => ({ ...prevState, [e.target.name]: e.target.value.trim()}));
    setErrorMessage("");
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const onPressForgotPassword = (event) => {
    event.preventDefault();
    const validationMessage = validateForgotPasswordForm(forgotPasswordForm.email); //* If validation passes, validationMessage is ""
    setErrorMessage(validationMessage);

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
        setErrorMessage("Невалиден имейл адрес.");
        return;
      } 
      else 
      {
        forgotPasswordMutation.mutate(forgotPasswordForm);
      }
    }
  };

  return (
    <div className="forgot_password_page">
        <ForgotPasswordComponent
          forgotPasswordForm={forgotPasswordForm}
          errorMessage={errorMessage}
          handleInput={handleInput}
          onPressForgotPassword={onPressForgotPassword}
        />

        <Snackbar 
        anchorOrigin={{
          vertical: position.vertical,
          horizontal: position.horizontal,
        }} 
        open={open} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
