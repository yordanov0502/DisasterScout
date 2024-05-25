import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { NewDispatcherComponent } from "../../../components/internal/NewDispatcherComponent/NewDispatcherComponent";
import { processDispatcherForm, processErrorDispatcherFormOnServerResponse, processErrorDispatcherFormOnSubmit, validateDispatcherFormOnSubmit } from "../../../validations/userRegexValidation";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useUserContext } from "../../../hooks/useUserContext";
import { addNewDispatcherRequest } from "../../../services/userService";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import "./cms_new_dispatcher_page.scss";

export const CmsNewDispatcherPage = () => {
  
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const navigate = useNavigate();
  const [dispatcherForm, setDispatcherForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    id: false,
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
  });
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [comboBoxError, setComboBoxError] = useState(false);
  const [comboBoxKey, setComboBoxKey] = useState(false); //? Used to just change the key of the comboBox from NewDispatcherComponent on successfull submit. Doesn't matter whether it is true/false, it just has to change on successfull submit in order the comboBox to be cleared.   
  const [errorMessage, setErrorMessage] = useState("");
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isUserContextLoading, setIsUserContextLoading] = useState(true);

  useEffect(() => {
    setErrorForm(processDispatcherForm(dispatcherForm));
  }, [dispatcherForm]);

   //? Used in order to preven dispatchers from accessing the CmsDispatchersPage by typing its path in the URL. (even though they don't have UI button for it and is forbbiden for them by the backend logic)
   useEffect(() => {
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    setIsUserContextLoading(isUContextEmpty); //! custom implementation to prevent newDispatcherComponent from flashing when is tried to be accessed by a dispatcher
    if (!isUContextEmpty && authenticatedUser.role !== "ADMIN") {
      //? if user context is NOT empty and user role is NOT ADMIN
      navigate("/cms-dashboard", { replace: true });
    }
  }, [authenticatedUser]);
  



  const handleInput = (e) => {
    setDispatcherForm(prevState => ({...prevState,[e.target.name]: e.target.value.trim()}));
    setErrorMessage("");
    setComboBoxError(false);
  };

  const addDispatcherMutation = useMutation({
    mutationFn: addNewDispatcherRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: () => {
      clearDispatcherForm();
      showSnackbar("Успешно добавихте нов диспечер в системата.","success","bottom","right");
    },
    onError: (error) => {
      if(error?.response?.data === "Id already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("id"));
        setErrorMessage("ЕГН-то, което сте въвели, вече съществува в системата.");
      }
      else if(error?.response?.data === "Email already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("email"));
        setErrorMessage("Имейл адресът, който сте въвели, вече съществува в системата.");
      }
      else if(error?.response?.data === "Username already exists.")
      {
        setErrorForm(processErrorDispatcherFormOnServerResponse("username"));
        setErrorMessage("Потребителското име, което сте въвели, вече съществува в системата.");
      }
      else
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
      }
    },
    onSettled: () => {
      setBackdropOpen(false);
      setIsRequestSent(false);
    },
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const onPressAddDispatcher = (event) => {
    event.preventDefault();
    closeSnackbar();

    const validationMessage = validateDispatcherFormOnSubmit(dispatcherForm); //If validation passes, validationMessage is ""
    
    if(validationMessage && !selectedZoneId)
    {
      setErrorForm(processErrorDispatcherFormOnSubmit(dispatcherForm, validationMessage));
      setErrorMessage("Моля въведете данни във всички полета.");
      setComboBoxError(true);
    }
    else if(validationMessage)
    {
      setErrorForm(processErrorDispatcherFormOnSubmit(dispatcherForm, validationMessage));
      setErrorMessage(validationMessage);
    }
    else if(!selectedZoneId)
    {
      setComboBoxError(true);
      setErrorMessage("Моля изберете област.");
    }
    else if (!isRequestSent) 
    {
      addDispatcherMutation.mutate(
     {
      id: dispatcherForm.id,
      firstName: dispatcherForm.firstName,
      lastName:dispatcherForm.lastName,
      email:dispatcherForm.email,
      username:dispatcherForm.username,
      password:dispatcherForm.password,
      initialZoneId: selectedZoneId
     }
    );
      setBackdropOpen(true);
    }    
  };

  const clearDispatcherForm = () => {
    setDispatcherForm({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });
    setErrorForm({
      id: false,
      firstName: false,
      lastName: false,
      email: false,
      username: false,
      password: false,
    });
    setSelectedZoneId(null);
    setErrorMessage("");
    setComboBoxError(false);
    setComboBoxKey(comboBoxKey ? false : true);
  };



  return (
    <div className="cms_new_dispatcher_page">
      <NewDispatcherComponent
      isUserContextLoading={isUserContextLoading}
      dispatcherForm={dispatcherForm}
      handleInput={handleInput}
      errorMessage={errorMessage}
      errorForm={errorForm}
      comboBoxKey={comboBoxKey}
      comboBoxError={comboBoxError}
      setComboBoxError={setComboBoxError}
      setSelectedZoneId={setSelectedZoneId}
      setErrorMessage={setErrorMessage}
      isRequestSent={isRequestSent}
      onPressAddDispatcher={onPressAddDispatcher}
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
