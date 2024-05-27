import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { ReportsComponent } from "../../../components/internal/ReportsComponent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { getReportCardsFromPageRequest, validCategories, validIssues, validMeteorologicalConditionsIssues, validMilitaryConditionsIssues, validPublicConditionsIssues, validRoadConditionsIssues, validSeismicActivityIssues, validSeverityTypes, validSpacePhenomenonIssues, validStates, validZoneIds } from "../../../services/reportService";
import "./cms_reports_page.scss";

export const CmsReportsPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const navigate = useNavigate();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState([]);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get("page")) || 1);
  const [state, setState] = useState(searchParams.get("state") || 'PENDING');
  const [severityType, setSeverityType] = useState(searchParams.get("severityType") ||"ALL");
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [category, setCategory] = useState(searchParams.get("category") ||"ALL");
  const [issue, setIssue] = useState(searchParams.get("issue") ||"ALL");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  
  
  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getReportsFromPage", pageNumber, state, severityType, selectedZoneId, category, issue], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getReportCardsFromPageRequest(pageNumber, state, severityType, selectedZoneId,category, issue),
    enabled: isQueryEnabled
  });
  


  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty();

    //! When authenticated user is a dispatcher with NO AVAILABLE ZONES return is used to not proceed any further 
    //! and THUS display ComponentLoader inside the ReportsComponent. Otherwise, if this check doesn't exist, the dispatcher will be redirected to the default 404 page (*)
    if(!isUContextEmpty && authenticatedUser.role === "DISPATCHER" && authenticatedUser.availableZoneIds.length === 0)
    {
      setIsLoadingComponent(true);//? better safe than sorry
      return ;
    }
    
    if(!isUContextEmpty)
    {
        const initialParams = {};
        if (!searchParams.has("page")) {initialParams.page = 1;}
        if (!searchParams.has("state")) {initialParams.state = 'PENDING';}
        if (!searchParams.has("severityType")) {initialParams.severityType = 'ALL';}
        //! For dispatcher
        if (authenticatedUser.role === "DISPATCHER" && !searchParams.has("zoneId")) {
          const firstZoneId = authenticatedUser.availableZoneIds[0];
          setSelectedZoneId(firstZoneId);
          initialParams.zoneId = firstZoneId;
        }
        //! For admin
        else if (authenticatedUser.role === "ADMIN" && !searchParams.has("zoneId")) {
          const firstZoneId = "st1";
          setSelectedZoneId(firstZoneId);
          initialParams.zoneId = firstZoneId;
        }
        if (!searchParams.has("category")) {initialParams.category = 'ALL';}
        if (!searchParams.has("issue")) {initialParams.issue = 'ALL';}
        
        if (Object.keys(initialParams).length > 0) 
        {
          setSearchParams({ ...Object.fromEntries(searchParams.entries()), ...initialParams });
        }
        else
        {
          const newPageNumber = Number(searchParams.get("page"));
          const newState = searchParams.get("state");
          const newSeverityType = searchParams.get("severityType");
          const newZoneId = searchParams.get("zoneId");
          const newCategory = searchParams.get("category");
          const newIssue = searchParams.get("issue");
          


          if (!Number.isInteger(newPageNumber) || newPageNumber < 1 
              || !validStates.includes(newState) 
              || !validSeverityTypes.includes(newSeverityType)
              || (authenticatedUser.role === "DISPATCHER" && !authenticatedUser.availableZoneIds.includes(newZoneId))
              || (authenticatedUser.role === "ADMIN" && !validZoneIds.includes(newZoneId))
              || !validCategories.includes(newCategory)
              || !validIssues.includes(newIssue)
             ) 
          {
            navigate('*');
            return;
          }

          //! Validation which makes sure that selected issue belong to its related category
          if( (newCategory === 'SEISMIC_ACTIVITY' && !validSeismicActivityIssues.includes(newIssue)) 
                || (newCategory === 'METEOROLOGICAL_CONDITIONS' && !validMeteorologicalConditionsIssues.includes(newIssue))    
                || (newCategory === 'PUBLIC_CONDITIONS' && !validPublicConditionsIssues.includes(newIssue))  
                || (newCategory === 'ROAD_CONDITIONS' && !validRoadConditionsIssues.includes(newIssue))  
                || (newCategory === 'MILITARY_CONDITIONS' && !validMilitaryConditionsIssues.includes(newIssue)) 
                || (newCategory === 'SPACE_PHENOMENON' && !validSpacePhenomenonIssues.includes(newIssue))
                || (newCategory === 'ALL' && newIssue !== 'ALL')        
          )
          {
            navigate('*');
            return;
          }
          
      
          
          if (newPageNumber !== pageNumber) {setPageNumber(newPageNumber);}
          if (newState !== state) {setState(newState);}
          if (newSeverityType !== severityType) {setSeverityType(newSeverityType);}
          if (newZoneId !== selectedZoneId) {setSelectedZoneId(newZoneId);}
          if (newCategory !== category) {setCategory(newCategory);}
          if (newIssue !== issue) {setIssue(newIssue);}
      
    
          setIsQueryEnabled(true);//? all validations passed and authenticatedUser is present
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
      const newPages = data.data.totalPages;
      const newRows = data.data.content.map((item, index) => {
      const rowNumber = (pageNumber - 1) * 15 + index + 1; //? Calculate rowNumber based on the index, pageNumber and pageSize(15 - set in the backend)
      
      const submittedAt = new Date(item.submittedAt);
      const expiresAt = new Date(item.expiresAt);
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG')}`;
      const formattedExpiresAt = `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG')}`;
      
      return {
        number: rowNumber,
        id: item.id,
        issue: item.issue,
        imageUrl: item.imageUrl,
        severityType: item.severityType,
        submittedAt: formattedSubmittedAt,
        expiresAt: formattedExpiresAt,
        address: item.address,
        description: item.description
      }});
      
      setPages(newPages);
      setRows(newRows);
      setIsLoadingComponent(false);
    }

    if(status === 'error') 
    {
    showSnackbar("Възникна грешка. Моля опитайте отново.", "error","bottom","right");
    setRows([]);
    setPages(0); 
    setIsLoadingComponent(false);
    }

  }, [status, data, error]);

  

  const handlePageChange = (event, newPageNumber) => { //! event here is used only as argument to avoid "Converting circular structure to JSON" error
    if(newPageNumber !== pageNumber)
    { 
      setPageNumber(newPageNumber);  //? This will trigger the useQuery fetch because of the queryKey dependency
      const params = { page: newPageNumber, state, severityType, zoneId: selectedZoneId, category, issue  }; 
      setSearchParams(params);
    }
  };

  const handleStateChange = (newState) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
     setState(newState); //? This will trigger the useQuery fetch because of the queryKey dependency
     const params = { page: 1, state: newState, severityType, zoneId: selectedZoneId, category, issue }; 
     setSearchParams(params);
     setPageNumber(1);
  };

  const handleSeverityTypeChange = (newSeverityType) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
    setSeverityType(newSeverityType); //? This will trigger the useQuery fetch because of the queryKey dependency
    const params = { page: 1, state, severityType: newSeverityType, zoneId: selectedZoneId, category, issue };
    setSearchParams(params);
    setPageNumber(1);
 };

 const handleSelectedZoneChange = (newZoneId) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  setSelectedZoneId(newZoneId); //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, state, severityType, zoneId: newZoneId, category, issue };
  setSearchParams(params);
  setPageNumber(1);
 };

 const handleCategoryChange = (newCategory) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  //!!! When category is changed, the issue is reset to 'ALL', cuz each category relates to separate list of issues !!!
  setCategory(newCategory); //? This will trigger the useQuery fetch because of the queryKey dependency
  setIssue('ALL');
  const params = { page: 1, state, severityType, zoneId: selectedZoneId, category: newCategory, issue: 'ALL' };
  setSearchParams(params);
  setPageNumber(1);
 };

const handleIssueChange = (newIssue) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  setIssue(newIssue); //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, state, severityType, zoneId: selectedZoneId, category, issue: newIssue };
  setSearchParams(params);
  setPageNumber(1);
 };

 

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };
 

  return (
    <div className="cms_reports_page">
      <ReportsComponent
        authenticatedUser={authenticatedUser}
        status={status}
        isLoadingComponent={isLoadingComponent}
        handlePageChange={handlePageChange}
        pageNumber={pageNumber}
        handleStateChange={handleStateChange} 
        state={state}
        handleSeverityTypeChange={handleSeverityTypeChange}
        severityType={severityType}
        handleSelectedZoneChange={handleSelectedZoneChange}
        selectedZoneId={selectedZoneId}
        handleCategoryChange={handleCategoryChange}
        category={category}
        handleIssueChange={handleIssueChange}
        issue={issue}
        pages={pages}
        rows={rows}
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
