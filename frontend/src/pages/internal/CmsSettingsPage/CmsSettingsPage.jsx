import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { processChangePasswordErrorForm, processChangePasswordErrorFormOnSubmit, processChangeUsernameError, validateChangePasswordForm, validateChangeUsername } from "../../../validations/userRegexValidation";
import { changePasswordRequest, clearAdminCacheRequest, clearAllUsersCacheRequest, clearAllZonesCachesRequest, clearDispatcherCacheRequest, clearMyCacheRequest, clearZoneCacheRequest } from "../../../services/userService";
import { SettingsComponent1 } from "../../../components/internal/SettingsComponent1";
import { SettingsComponent2 } from "../../../components/internal/SettingsComponent2";
import { useUserContext } from "../../../hooks/useUserContext";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import "./cms_settings_page.scss";

export const CmsSettingsPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
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

  const [backdropOpen, setBackdropOpen] = useState(false);


  //**********************SettingsComponent2**********************
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [comboBoxError, setComboBoxError] = useState(false);
  const [comboBoxKey, setComboBoxKey] = useState(false); //? Used to just change the key of the comboBox from SettingsComponent2 on successfull submit. Doesn't matter whether it is true/false, it just has to change on successfull submit in order the comboBox to be cleared.   
  const handleUsernameInput = (e) => {
    setUsername(e.target.value.trim());
    closeSnackbar();
  };
  useEffect(() => {
    setUsernameError(processChangeUsernameError(username));
  }, [username]);
  //**********************SettingsComponent2**********************

  
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
      setBackdropOpen(true);
    },
    onSuccess: () => {
      resetChangePasswordForm();
      showSnackbar("Успешно актуализирахте паролата си.", "success","bottom","right");
    },
    onError: (error) => {
       if(error?.response?.data === "Current password doesn't match the authenticated user's current password.")
       {
         const validationMessage = "Текущата парола, която сте въвели е грешна.";
         setErrorMessage(validationMessage);
         setErrorForm(processChangePasswordErrorFormOnSubmit(changePasswordForm, validationMessage));
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
      setBackdropOpen(false);
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
  



  

  //**********************SettingsComponent2**********************
  const clearMyCacheMutation = useMutation({
    mutationFn: clearMyCacheRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: () => {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearMyCache = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      clearMyCacheMutation.mutate();
    }
  };

  const clearAdminCacheMutation = useMutation({
    mutationFn: clearAdminCacheRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: () => {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearAdminCache = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      clearAdminCacheMutation.mutate();
    }
  };



  const clearDispatcherCacheMutation = useMutation({
    mutationFn: clearDispatcherCacheRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      setUsername("");
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: (error) => {
      if(error?.response?.data === "Invalid type of username.")
       {
        setUsernameError(true);
        showSnackbar("Невалидно потребителско име.", "error", "bottom", "right");
       }
      else if(error?.response?.data === "Username doesn't exist.")
       {
        setUsernameError(true);
        showSnackbar("Диспечер с потребителско име \""+username+"\" не съществува.", "error", "bottom", "right");
       }
      else
       {
        showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
       }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearDispatcherCache = (event) => {
    event.preventDefault();
    closeSnackbar();
    const validationMessage = validateChangeUsername(username, authenticatedUser.username); //If validation passes, validationMessage is ""

    if(validationMessage)
    {
      setUsernameError(true);
      showSnackbar(validationMessage, "error", "bottom", "right");
    }
    else if(!isRequestSent)
    {
      clearDispatcherCacheMutation.mutate(username);
    }
  };

  const clearAllUsersCacheMutation = useMutation({
    mutationFn: clearAllUsersCacheRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: () => {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearAllUsersCache = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      clearAllUsersCacheMutation.mutate();
    }
  };

  const clearZoneCacheMutation = useMutation({
    mutationFn: clearZoneCacheRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      setSelectedZoneId(null);
      setComboBoxKey(comboBoxKey ? false : true);
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: () => {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearZoneCache = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!selectedZoneId)
    {
      setComboBoxError(true);
      showSnackbar("Моля изберете област.", "error","bottom","right");
    }
    else if(!isRequestSent)
    {
      clearZoneCacheMutation.mutate(selectedZoneId);
    }
  };

  const clearAllZonesCachesMutation = useMutation({
    mutationFn: clearAllZonesCachesRequest,
    onMutate: () => {
      setIsRequestSent(true);
      setBackdropOpen(true);
    },
    onSuccess: () => {
      showSnackbar("Операцията е извършена успешно.", "success","bottom","right");
    },
    onError: () => {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    }
  });
  const onPressClearAllZonesCaches = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      clearAllZonesCachesMutation.mutate();
    }
  };
  //**********************SettingsComponent2**********************


        

      
  return (
    <div className="cms_settings_page">
     <SettingsComponent1
      changePasswordForm={changePasswordForm}
      errorForm={errorForm}
      errorMessage={errorMessage}
      handleInput={handleInput}
      onPressChangePassword={onPressChangePassword}
      isRequestSent={isRequestSent}
      resetChangePasswordForm={resetChangePasswordForm}
      />

     <SettingsComponent2
      role={ !isUserContextEmpty() ? authenticatedUser.role : ""}
      isRequestSent={isRequestSent}
      onPressClearMyCache={onPressClearMyCache}
      onPressClearAdminCache={onPressClearAdminCache}
      username={username}
      handleUsernameInput={handleUsernameInput}
      usernameError={usernameError}
      onPressClearDispatcherCache={onPressClearDispatcherCache}
      onPressClearAllUsersCache={onPressClearAllUsersCache}
      setSelectedZoneId={setSelectedZoneId}
      comboBoxError={comboBoxError}
      setComboBoxError={setComboBoxError}
      onPressClearZoneCache={onPressClearZoneCache}
      comboBoxKey={comboBoxKey}
      onPressClearAllZonesCaches={onPressClearAllZonesCaches}
      />

     <BackdropLoader open={backdropOpen} />

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
