import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchCount, setSearchCount] = useState(0);
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [level, setLevel] = useState(searchParams.get("level") || 'ALL');
  const [username, setUsername] = useState(searchParams.get("username") || '');
  const [validUsername, setValidUsername] = useState(searchParams.get("username") || '');
  const [usernameError, setUsernameError] = useState(false);
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get("page")) || 1);
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState([]);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getLogsFromPage", pageNumber, level, validUsername, searchCount], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getLogsFromPageRequest(pageNumber, level, validUsername),
    enabled: isQueryEnabled
  });

  //? Used in order to prevent dispatchers from accessing the CmsLoggerPage by typing its path in the URL. (even though they don't have UI button for it and is forbbiden for them by the backend logic)
  useEffect(() => { 
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    if(!isUContextEmpty && authenticatedUser.role !== "ADMIN") //? if user context is NOT empty and user role is NOT ADMIN
    { 
      navigate("/cms-dashboard", {replace: true});
    }
  }, [authenticatedUser]);

  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty();

    if(!isUContextEmpty && authenticatedUser.role === "ADMIN")
    {
        const initialParams = {};
        if (!searchParams.has("page")) {initialParams.page = 1;}
        if (!searchParams.has("level")) {initialParams.level = 'ALL';}

        if (Object.keys(initialParams).length > 0) 
        {
          setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...initialParams });
        }
        else
        {
          const newPageNumber = Number(searchParams.get("page"));
          const newLevel = searchParams.get("level");
          const newUsername = searchParams.get("username") || '';
      
          //? Validate page number
          if (!Number.isInteger(newPageNumber) || newPageNumber < 1) 
          {
            navigate('*');
            return;
          }
      
          //? Validate level
          const validLevels = ['ALL', 'INFO', 'WARN', 'ERROR'];
          if (!validLevels.includes(newLevel)) 
          {
            navigate('*');
            return;
          }
      
          
          if (newPageNumber !== pageNumber) {setPageNumber(newPageNumber);}
          if (newLevel !== level) {setLevel(newLevel);}
          if (newUsername !== username) {setUsername(newUsername);setValidUsername(newUsername);}

          setIsQueryEnabled(true);//? all validations passed and authenticatedUser is present AND IS ADMIN
        }
    }

  }, [searchParams, authenticatedUser]);

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
      
      setPages(newPages);
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
    setIsLoadingComponent(false);
    }

  }, [status, data, error]);

  


  const handlePageChange = (event, newPageNumber) => { //! event here is used only as argument to avoid "Converting circular structure to JSON" error
    if(newPageNumber !== pageNumber)
    { 
      setPageNumber(newPageNumber);  //? This will trigger the useQuery fetch because of the queryKey dependency
      const params = { page: newPageNumber, level };
      if(username) {params.username = username;}
      setSearchParams(params);
    }
  };

  const handleLevelChange = (newLevel) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
     setLevel(newLevel); //? This will trigger the useQuery fetch because of the queryKey dependency
     const params = { page: 1, level: newLevel };
     if (username) {params.username = username;}
     setSearchParams(params);
     setPageNumber(1);
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
      setSearchParams({ page: 1, level, username });
      setSearchCount(prev => prev + 1); //? Increment search count to force a refetch even if the validUsername hasn't changed
    }
  };

  const onPressClearSearchByUsername = () => {
    closeSnackbar();
    setUsernameError(false);
    setUsername('');
    setValidUsername('');
    setSearchParams({ page: 1, level });
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
