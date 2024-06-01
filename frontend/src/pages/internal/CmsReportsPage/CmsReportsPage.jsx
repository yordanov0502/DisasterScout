import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { ReportsComponent } from "../../../components/internal/ReportsComponent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { getAllAreasOfZoneForSearch } from "../../../services/zoneService";
import { getReportCardsFromPageRequest, validCategories, validIssues, validMeteorologicalConditionsIssues, validMilitaryConditionsIssues, validPublicConditionsIssues, validRoadConditionsIssues, validSeismicActivityIssues, validSeverityTypes, validSpacePhenomenonIssues, validStates, validZoneIds } from "../../../services/reportService";
import "./cms_reports_page.scss";

export const CmsReportsPage = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [pages, setPages] = useState(1);
  const [rows, setRows] = useState([]);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();

  //! useRef is used instead of useState, in order to persist the filter search params between rerenders
  //! even on full page reload the useRef.current value is preserved, because the url has search params which persist full page reload always
  //? useRef doesn't trigger rerender when updated
  const pageNumberRef = useRef(Number(searchParams.get("page")) || 1);
  const stateRef = useRef(searchParams.get("state") || 'PENDING');
  const severityTypeRef = useRef(searchParams.get("severityType") || "ALL");
  const selectedZoneIdRef = useRef(searchParams.get("zoneId") || null); //! added searchParams.get("zoneId")
  const areaRef = useRef(searchParams.get("area") || "Всички");
  const categoryRef = useRef(searchParams.get("category") || "ALL");
  const issueRef = useRef(searchParams.get("issue") || "ALL");

  
  
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  
  
  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getReportsFromPage", pageNumberRef.current, stateRef.current, severityTypeRef.current, selectedZoneIdRef.current, areaRef.current, categoryRef.current, issueRef.current], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getReportCardsFromPageRequest(pageNumberRef.current, stateRef.current, severityTypeRef.current, selectedZoneIdRef.current, areaRef.current, categoryRef.current, issueRef.current),
    enabled: isQueryEnabled
  });
  
  
  useEffect(() => {
    
    if (location.state?.showSuccessSnackbar) 
    {
      showSnackbar(location.state.message,"success","bottom","right");
      //? Clear the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
    else if (location.state?.showErrorSnackbar) 
    {
      showSnackbar(location.state.message,"error","bottom","right");
      //? Clear the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
    else if (location.state?.reloadPage === true) //??
      {
        //? Clear the state so it doesn't show again on refresh
        navigate(location.pathname, { replace: true, state: {} });
        window.location.reload(); //! does full page reload of cmsReports page and also resets all search params to default ones along with the useRefs
      }
  }, [location]);
  

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
        if (!searchParams.has("page")) {initialParams.page = pageNumberRef.current;}
        if (!searchParams.has("state")) {initialParams.state = stateRef.current;}
        if (!searchParams.has("severityType")) {initialParams.severityType = severityTypeRef.current;}
        //! For dispatcher
        if (authenticatedUser.role === "DISPATCHER" && !searchParams.has("zoneId")) {
          if(selectedZoneIdRef.current === null)
          {
            const firstZoneId = authenticatedUser.availableZoneIds[0];
            selectedZoneIdRef.current = firstZoneId;
            initialParams.zoneId = firstZoneId;
          }
          else
          {
            initialParams.zoneId = selectedZoneIdRef.current;
          }
        }
        //! For admin
        else if (authenticatedUser.role === "ADMIN" && !searchParams.has("zoneId")) {
          if(selectedZoneIdRef.current === null)
          {
            const firstZoneId = "st1";
            selectedZoneIdRef.current = firstZoneId;
            initialParams.zoneId = firstZoneId;
          }
          else
          {
            initialParams.zoneId = selectedZoneIdRef.current;
          }
        }
        if (!searchParams.has("area")) {initialParams.area = areaRef.current;}
        if (!searchParams.has("category")) {initialParams.category = categoryRef.current;}
        if (!searchParams.has("issue")) {initialParams.issue = issueRef.current;}
        
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
          const newArea = searchParams.get("area");
          const newCategory = searchParams.get("category");
          const newIssue = searchParams.get("issue");


          if (!Number.isInteger(newPageNumber) || newPageNumber < 1 
              || !validStates.includes(newState) 
              || !validSeverityTypes.includes(newSeverityType)
              || (authenticatedUser.role === "DISPATCHER" && !authenticatedUser.availableZoneIds.includes(newZoneId))
              || (authenticatedUser.role === "ADMIN" && !validZoneIds.includes(newZoneId))
              || !getAllAreasOfZoneForSearch(newZoneId).includes(newArea) //! if area is not part of the zone
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
          
      
          
          if (newPageNumber !== pageNumberRef.current) {pageNumberRef.current = newPageNumber;}
          if (newState !== stateRef.current) {stateRef.current = newState;}
          if (newSeverityType !== severityTypeRef.current) {severityTypeRef.current = newSeverityType;}
          if (newZoneId !== selectedZoneIdRef.current) {selectedZoneIdRef.current = newZoneId;}
          if (newArea !== areaRef.current) {areaRef.current = newArea;}
          if (newCategory !== categoryRef.current) {categoryRef.current = newCategory;}
          if (newIssue !== issueRef.current) {issueRef.current = newIssue;}
      
    
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
      const rowNumber = (pageNumberRef.current - 1) * 15 + index + 1; //? Calculate rowNumber based on the index, pageNumber and pageSize(15 - set in the backend)
      
      const submittedAt = new Date(item.submittedAt);
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG')}`;
      
      const expiresAt = item.expiresAt ? new Date(item.expiresAt) : null;
      const formattedExpiresAt = expiresAt ? `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG')}` : '-';

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
    if(newPageNumber !== pageNumberRef.current)
    { 
      pageNumberRef.current = newPageNumber;  //? This will trigger the useQuery fetch because of the queryKey dependency
      const params = { page: newPageNumber, state: stateRef.current, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: issueRef.current }; 
      setSearchParams(params);
    }
  };

  const handleStateChange = (newState) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
     stateRef.current = newState; //? This will trigger the useQuery fetch because of the queryKey dependency
     const params = { page: 1, state: newState, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: issueRef.current }; 
     setSearchParams(params);
     pageNumberRef.current = 1;
  };

  const handleSeverityTypeChange = (newSeverityType) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
    severityTypeRef.current = newSeverityType; //? This will trigger the useQuery fetch because of the queryKey dependency
    const params = { page: 1, state: stateRef.current, severityType: newSeverityType, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: issueRef.current };
    setSearchParams(params);
    pageNumberRef.current = 1;
 };

 const handleSelectedZoneChange = (newZoneId) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  //!!! When zone is changed, the area is reset to 'Всички', cuz each zone relates to separate list of areas !!!
  selectedZoneIdRef.current = newZoneId; //? This will trigger the useQuery fetch because of the queryKey dependency
  areaRef.current = "Всички"
  const params = { page: 1, state: stateRef.current, severityType: severityTypeRef.current, zoneId: newZoneId, area: 'Всички', category: categoryRef.current, issue: issueRef.current };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

 const handleAreaChange = (newArea) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  areaRef.current = newArea; //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, state: stateRef.current, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: newArea, category: categoryRef.current, issue: issueRef.current };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

 const handleCategoryChange = (newCategory) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  //!!! When category is changed, the issue is reset to 'ALL', cuz each category relates to separate list of issues !!!
  categoryRef.current = newCategory; //? This will trigger the useQuery fetch because of the queryKey dependency
  issueRef.current = 'ALL';
  const params = { page: 1, state: stateRef.current, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: newCategory, issue: 'ALL' };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

const handleIssueChange = (newIssue) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  issueRef.current = newIssue; //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, state: stateRef.current, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: newIssue };
  setSearchParams(params);
  pageNumberRef.current = 1;
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
        pageNumber={pageNumberRef.current}
        handleStateChange={handleStateChange} 
        state={stateRef.current}
        handleSeverityTypeChange={handleSeverityTypeChange}
        severityType={severityTypeRef.current}
        handleSelectedZoneChange={handleSelectedZoneChange}
        selectedZoneId={selectedZoneIdRef.current}
        handleCategoryChange={handleCategoryChange}
        category={categoryRef.current}
        handleIssueChange={handleIssueChange}
        issue={issueRef.current}
        handleAreaChange={handleAreaChange}
        area={areaRef.current}
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
