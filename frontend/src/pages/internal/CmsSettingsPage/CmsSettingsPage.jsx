import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { processChangePasswordErrorForm, processChangePasswordErrorFormOnSubmit, validateChangePasswordForm } from "../../../validations/userRegexValidation";
import { changePasswordRequest } from "../../../services/userService";
import { SettingsComponent } from "../../../components/internal/SettingsComponent";
import { useUserContext } from "../../../hooks/useUserContext";
import "./cms_settings_page.scss";

export const CmsSettingsPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const [isLoading, setIsLoading] = useState(true); //? isLoading is based whether UserContext is empty or not
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => { 
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    setIsLoading(isUContextEmpty);
  }, [authenticatedUser]);

  useEffect(() => {
      setErrorForm(processChangePasswordErrorForm(changePasswordForm));
  }, [changePasswordForm]);

  const resetChangePasswordForm = () => {
    setChangePasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setErrorMessage("");
  }

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: (response) => {
      resetChangePasswordForm();
      showSnackbar("Успешно актуализирахте паролата си.", "success","bottom","right");
    },
    onError: (error) => {
       if(error?.response?.data === "Current password doesn't match the authenticated user's current password.")
       {
         setErrorMessage("Текущата парола, която сте въвели е грешна.");
       }
       else if(error?.response?.data === "Invalid type of currentPassword.")
       {
         setErrorMessage("Невалиден формат на текущата парола. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]");
       }
       else if(error?.response?.data === "Invalid type of newPassword.")
       {
         setErrorMessage("Невалиден формат на новата парола. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]");
       }
       else if(error?.response?.data === "Invalid type of confirmNewPassword.")
       {
        setErrorMessage("Невалиден формат на потвърждението. Изисквания: [бр.символи 8-30, поне 1 малка буква, поне 1 главна буква, поне 1 цифра, поне 1 спец. символ, без интервали]");
       }
       else if(error?.response?.data === "Password fields doesn't match")
       {
        setErrorMessage("Полето за нова парола и полето за потвърждение се различават.");
       }
       else{showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");}
    },
    onSettled: () => {
      setIsRequestSent(false);
    }
  });
  
  const handleInput = (e) => {
    setChangePasswordForm(prevState => ({...prevState, [e.target.name]:  e.target.value.trim()}));
    setErrorMessage("");
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const onPressChangePassword = (event) => {
    event.preventDefault();
    closeSnackbar();
    const validationMessage = validateChangePasswordForm(changePasswordForm); //If validation passes, validationMessage is ""

    if(validationMessage)
    {
      setErrorForm(processChangePasswordErrorFormOnSubmit(changePasswordForm, validationMessage));
      setErrorMessage(validationMessage);
    }
    else if(!isRequestSent)
    {
      changePasswordMutation.mutate(changePasswordForm);
    }
  };
        

      
  return (
    <div className="cms_settings_page">
     <SettingsComponent
      isLoading={isLoading}
      changePasswordForm={changePasswordForm}
      errorForm={errorForm}
      errorMessage={errorMessage}
      handleInput={handleInput}
      role={ !isUserContextEmpty() ? authenticatedUser.role : ""}
      onPressChangePassword={onPressChangePassword}
      isRequestSent={isRequestSent}
      resetChangePasswordForm={resetChangePasswordForm}
      />

     <Snackbar 
        anchorOrigin={{
          vertical: position.vertical,
          horizontal: position.horizontal,
        }} 
        open={open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
