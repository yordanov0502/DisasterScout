import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { AccountComponent } from "../../../components/internal/AccountComponent";
import { useUserContext } from "../../../hooks/useUserContext";
import { processErrorForm, processErrorFormOnSubmit, validateAccountForm } from "../../../validations/userRegexValidation";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { updateAccountRequest } from "../../../services/userService";
import "./cms_account_page.scss";

export const CmsAccountPage = () => {
  const { authenticatedUser, isUserContextEmpty, updateUserContext } = useUserContext();
  const [isLoading, setIsLoading] = useState(true); //? isLoading is based whether UserContext is empty or not
  const [accountForm, setAccountForm] = useState({
    firstName: authenticatedUser.firstName || "",
    lastName: authenticatedUser.lastName || "",
    email: authenticatedUser.email || "",
    username: authenticatedUser.username || "",
  });
  const [errorForm, setErrorForm] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  
  const setInitialData = () => {
    setAccountForm({
      firstName: authenticatedUser.firstName,
      lastName: authenticatedUser.lastName,
      email: authenticatedUser.email,
      username: authenticatedUser.username,
    });
    setErrorMessage("");
  }

  useEffect(() => { 
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    setIsLoading(isUContextEmpty);
    if(!isUContextEmpty) //? if user context is NOT empty
    { 
      setInitialData();
    }
  }, [authenticatedUser]);

  useEffect(() => {
    if(!isUserContextEmpty()) //? without this check, the textFields are colored red for a milliseconds on a full page reload(because userContext is refetched on every full page reload)
    {
      setErrorForm(processErrorForm(accountForm));
    }
  }, [accountForm]);

  const updateAccountMutation = useMutation({
    mutationFn: updateAccountRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: (response) => {
      updateUserContext(response.data);
      showSnackbar("Успешно актуализирахте акаунта си.", "success","bottom","right");
    },
    onError: (error) => {
      if(error?.response?.data ==="Email already exists.")
      {
        setErrorMessage("Имейл адресът, който сте въвели вече е зает.");
      }
      else if(error?.response?.data ==="Invalid type of email.")
      {
        setErrorMessage("Невалиден имейл адрес.");
      }
      else if(error?.response?.data ==="Username already exists.")
      {
        setErrorMessage("Потребителското име, което сте въвели вече е заето.");
      }
      else if(error?.response?.data ==="Invalid type of username.")
      {
        setErrorMessage("Невалидно потребителско име.");
      }
      else{showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");}
    },
    onSettled: () => {
      setIsRequestSent(false);
    }
  });
  
  const handleInput = (e) => {
    setAccountForm(prevState => ({...prevState, [e.target.name]:  e.target.value.trim()}));
    setErrorMessage("");
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const onPressUpdate = (event) => {
    event.preventDefault();
    closeSnackbar();
    const validationMessage = validateAccountForm(accountForm,authenticatedUser); //If validation passes, validationMessage is ""
    
    if(validationMessage)
    {
      setErrorForm(processErrorFormOnSubmit(accountForm, validationMessage));
      setErrorMessage(validationMessage);
    }
    else if(!isRequestSent)
    {
      updateAccountMutation.mutate(accountForm);
    }
  };

  return (
    <div className="cms_account_page">
      <AccountComponent
      isLoading={isLoading}
      accountForm={accountForm}
      errorForm={errorForm}
      errorMessage={errorMessage}
      handleInput={handleInput}
      role={ !isUserContextEmpty() ? authenticatedUser.role : ""}
      onPressUpdate={onPressUpdate}
      isRequestSent={isRequestSent}
      resetAccountForm={setInitialData}
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
