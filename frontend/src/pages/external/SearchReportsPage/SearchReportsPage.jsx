import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { PublicReportsComponent } from "../../../components/external/PublicReportsComponent";
import { getPublicReportCardsFromPageRequest, validCategories, validIssues, validMeteorologicalConditionsIssues, validMilitaryConditionsIssues, validPublicConditionsIssues, validRoadConditionsIssues, validSeismicActivityIssues, validSeverityTypes, validSpacePhenomenonIssues, validZoneIds } from "../../../services/reportService";
import { getAllAreasOfZoneForSearch } from "../../../services/zoneService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import './search_reports_page.scss';

export const SearchReportsPage = () => {
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
  const severityTypeRef = useRef(searchParams.get("severityType") || "ALL");
  const selectedZoneIdRef = useRef(searchParams.get("zoneId") || "st1");
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
    queryKey: ["getPublicReportsFromPage", pageNumberRef.current, severityTypeRef.current, selectedZoneIdRef.current, areaRef.current, categoryRef.current, issueRef.current], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getPublicReportCardsFromPageRequest(pageNumberRef.current, severityTypeRef.current, selectedZoneIdRef.current, areaRef.current, categoryRef.current, issueRef.current),
    enabled: isQueryEnabled
  });

  useEffect(() => {
    if (location.state?.showErrorSnackbar) 
    {
      showSnackbar(location.state.message,"error","top","center");
      //? Clear the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);
  
  
  useEffect(() => {
    
    const initialParams = {};
    if (!searchParams.has("page")) {initialParams.page = pageNumberRef.current;}
    if (!searchParams.has("severityType")) {initialParams.severityType = severityTypeRef.current;}
    if (!searchParams.has("zoneId"))  {initialParams.zoneId = selectedZoneIdRef.current;}
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
      const newSeverityType = searchParams.get("severityType");
      const newZoneId = searchParams.get("zoneId");
      const newArea = searchParams.get("area");
      const newCategory = searchParams.get("category");
      const newIssue = searchParams.get("issue");


      if(!Number.isInteger(newPageNumber) || newPageNumber < 1 
          || !validSeverityTypes.includes(newSeverityType)
          || !validZoneIds.includes(newZoneId)
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
      if (newSeverityType !== severityTypeRef.current) {severityTypeRef.current = newSeverityType;}
      if (newZoneId !== selectedZoneIdRef.current) {selectedZoneIdRef.current = newZoneId;}
      if (newArea !== areaRef.current) {areaRef.current = newArea;}
      if (newCategory !== categoryRef.current) {categoryRef.current = newCategory;}
      if (newIssue !== issueRef.current) {issueRef.current = newIssue;}
  

      setIsQueryEnabled(true);//? all validations passed and authenticatedUser is present
    }
    
   
  }, [searchParams]);

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
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
 
      const expiresAt = item.expiresAt ? new Date(item.expiresAt) : null;
      const formattedExpiresAt = expiresAt ? `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : '-';


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
    showSnackbar("Възникна грешка. Моля опитайте отново.", "error","top","center");
    setRows([]);
    setPages(0); 
    setIsLoadingComponent(false);
    }

  }, [status, data, error]);

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);
  

  const handlePageChange = (event, newPageNumber) => { //! event here is used only as argument to avoid "Converting circular structure to JSON" error
    if(newPageNumber !== pageNumberRef.current)
    { 
      pageNumberRef.current = newPageNumber;  //? This will trigger the useQuery fetch because of the queryKey dependency
      const params = { page: newPageNumber, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: issueRef.current }; 
      setSearchParams(params);
    }
  };

  const handleSeverityTypeChange = (newSeverityType) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
    severityTypeRef.current = newSeverityType; //? This will trigger the useQuery fetch because of the queryKey dependency
    const params = { page: 1, severityType: newSeverityType, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: issueRef.current };
    setSearchParams(params);
    pageNumberRef.current = 1;
 };

 const handleSelectedZoneChange = (newZoneId) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  //!!! When zone is changed, the area is reset to 'Всички', cuz each zone relates to separate list of areas !!!
  selectedZoneIdRef.current = newZoneId; //? This will trigger the useQuery fetch because of the queryKey dependency
  areaRef.current = "Всички"
  const params = { page: 1, severityType: severityTypeRef.current, zoneId: newZoneId, area: 'Всички', category: categoryRef.current, issue: issueRef.current };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

 const handleAreaChange = (newArea) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  areaRef.current = newArea; //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: newArea, category: categoryRef.current, issue: issueRef.current };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

 const handleCategoryChange = (newCategory) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  //!!! When category is changed, the issue is reset to 'ALL', cuz each category relates to separate list of issues !!!
  categoryRef.current = newCategory; //? This will trigger the useQuery fetch because of the queryKey dependency
  issueRef.current = 'ALL';
  const params = { page: 1, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: newCategory, issue: 'ALL' };
  setSearchParams(params);
  pageNumberRef.current = 1;
 };

const handleIssueChange = (newIssue) => { //! event here must NOT be used as argument under any circumstances in order to avoid MUI error
  issueRef.current = newIssue; //? This will trigger the useQuery fetch because of the queryKey dependency
  const params = { page: 1, severityType: severityTypeRef.current, zoneId: selectedZoneIdRef.current, area: areaRef.current, category: categoryRef.current, issue: newIssue };
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
    <div className="search_reports_page">
      <PublicReportsComponent
        status={status}
        isLoadingComponent={isLoadingComponent}
        handlePageChange={handlePageChange}
        pageNumber={pageNumberRef.current}
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
        sx={{position: 'fixed', top: '100px !important'}}
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