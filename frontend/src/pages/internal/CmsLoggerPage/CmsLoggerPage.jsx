import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { LoggerComponent } from "../../../components/internal/LoggerComponent";
import { getLogsFromPageRequest } from "../../../services/userService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { processChangeUsernameError, validateUsernameInLoggerOnSearch } from "../../../validations/userRegexValidation";
import "./cms_logger_page.scss";

export const CmsLoggerPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const navigate = useNavigate();
  const [searchCount, setSearchCount] = useState(0);
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [level, setLevel] = useState(sessionStorage.getItem("logger-level") || 'ALL');
  const [username, setUsername] = useState(sessionStorage.getItem("logger-username") || '');
  const [validUsername, setValidUsername] = useState(sessionStorage.getItem("logger-username") || '');
  const [usernameError, setUsernameError] = useState(false);
  const [pageNumber, setPageNumber] = useState(Number(sessionStorage.getItem("logger-page-number")) || 1);
  const [pages, setPages] = useState(Number(sessionStorage.getItem("logger-pages")) || 1);
  const [rows, setRows] = useState([]);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();

  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getLogsFromPage", pageNumber, level, validUsername, searchCount], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getLogsFromPageRequest(pageNumber, level, validUsername),
    enabled: authenticatedUser.role === "ADMIN"
  });

  useEffect(() => {
     //? Initialize(eventually depending on the if statements) session storage items(key,value) 
     //? and state(eventually depending on the if statements) once on mount.
    if(sessionStorage.getItem("logger-level") === null) {sessionStorage.setItem("logger-level", level);}

    if(sessionStorage.getItem("logger-username") === null) {sessionStorage.setItem("logger-username", username);}

    if(sessionStorage.getItem("logger-page-number") === null) {sessionStorage.setItem("logger-page-number", pageNumber);}

    if(sessionStorage.getItem("logger-pages") === null) {sessionStorage.setItem("logger-pages", pages);}

    //? Cleanup function - on page unmount(when navigating to different page/route, NOT ON PAGE RELOAD) it deletes all session storage items related to CmsLoggerPage.
    return () => {
         sessionStorage.removeItem("logger-level");
         sessionStorage.removeItem("logger-username");
         sessionStorage.removeItem("logger-page-number");
         sessionStorage.removeItem("logger-pages");
    };
  }, []);

  //? Used in order to preven dispatchers from accessing the CmsLoggerPage by typing its path in the URL. (even though they don't have UI button for it and is forbbiden for them by the backend logic)
  useEffect(() => { 
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    if(!isUContextEmpty && authenticatedUser.role !== "ADMIN") //? if user context is NOT empty and user role is NOT ADMIN
    { 
      navigate("/cms-dashboard", {replace: true});
    }
  }, [authenticatedUser]);

  useEffect(() => {

    if(isLoading)
    {
      setIsLoadingComponent(true);
    }

    if (status === 'success') 
    {
      setUsernameError(false); //? better safe than sorry
      const newPages = data.data.totalPages;
      const newRows = data.data.content.map((item, index) => {
      const rowNumber = (pageNumber - 1) * 20 + index + 1; //? Calculate rowNumber based on the index, pageNumber and pageSize(20 - set in the backend)
       return {
        number: rowNumber,
        action: item.message,
        level: item.level,
        dateTime: new Date(item.createdAt).toLocaleString()
      }});
      
      sessionStorage.setItem("logger-username", validUsername);
      setPages(newPages);
      sessionStorage.setItem("logger-pages",newPages);
      setRows(newRows);
      setIsLoadingComponent(false);
    }

    if(status === 'error') 
    {
     if(error?.response?.data === "Username doesn't exist.")
     {
      showSnackbar("Потребител с потребителско име \""+validUsername+"\" не съществува.", "error","bottom","right");
     }
     else if(error?.response?.data === "Invalid type of username.")
     {
      showSnackbar("Невалидно потребителско име.", "error","bottom","right");
     }
     else
     {
      showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
     }
    setRows([]);
    setPages(0); 
    setUsernameError(true);
    //setValidUsername(''); //? This is commented because otherwise it will cause the useQuery to refetch, which will be UNNECESSARY
    sessionStorage.setItem("logger-username", '');
    setIsLoadingComponent(false);
    }

  }, [status, data, error]);

  const handlePageChange = (event, newPageNumber) => { //! event here is used only as argument to avoid "Converting circular structure to JSON" error
    if(newPageNumber !== pageNumber)
    { 
      setPageNumber(newPageNumber);  //? This will trigger the useQuery fetch because of the queryKey dependency
      sessionStorage.setItem("logger-page-number", newPageNumber);
    }
  };

  const handleLevelChange = (newLevel) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
     setLevel(newLevel); //? This will trigger the useQuery fetch because of the queryKey dependency
     sessionStorage.setItem("logger-level", newLevel);
     setPageNumber(1);
     sessionStorage.setItem("logger-page-number", 1);
  };

  const handleUsernameInput = (e) => {
    const currUsernameInput = e.target.value.trim();
    setUsername(currUsernameInput);
    setUsernameError(processChangeUsernameError(currUsernameInput));
    closeSnackbar();
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const onPressSearchByUsername = (event) => {
    event.preventDefault();
    closeSnackbar();
    const validationMessage = validateUsernameInLoggerOnSearch(username); //If validation passes, validationMessage is ""
 
    if(validationMessage)
    {
      setUsernameError(true);
      showSnackbar(validationMessage, "error", "bottom", "right");
    }
    else if(!isLoadingComponent)
    { 
      setValidUsername(username)
      setSearchCount(prev => prev + 1); //? Increment search count to force a refetch even if the validUsername hasn't changed
    }
  };

  const onPressClearSearchByUsername = () => {
    closeSnackbar();
    setUsernameError(false);
    setUsername('');
    setValidUsername('');
    sessionStorage.setItem("logger-username", '');
  }

  

  return (
    <div className="cms_logger_page">
      <LoggerComponent
        status={status}
        isLoadingComponent={isLoadingComponent}
        handlePageChange={handlePageChange}
        pageNumber={pageNumber}
        handleLevelChange={handleLevelChange} 
        level={level}
        pages={pages}
        rows={rows}
        username={username}
        usernameError={usernameError}
        handleUsernameInput={handleUsernameInput}
        onPressSearchByUsername={onPressSearchByUsername}
        onPressClearSearchByUsername={onPressClearSearchByUsername}
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
