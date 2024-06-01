import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { ReportsComponent } from "../../../components/internal/ReportsComponent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { getAllAreasOfZoneForSearch } from "../../../services/zoneService";
import { acceptReportRequest, getReportCardsFromPageRequest, getReportForCMS, rejectReportRequest, validCategories, validIssues, validMeteorologicalConditionsIssues, validMilitaryConditionsIssues, validPublicConditionsIssues, validRoadConditionsIssues, validSeismicActivityIssues, validSeverityTypes, validSpacePhenomenonIssues, validStates, validZoneIds } from "../../../services/reportService";
import "./cms_report_page.scss";
import { ReportComponent } from "../../../components/internal/ReportComponent";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import { processErrorAcceptFormOnSubmit, validateReportFormOnAccept } from "../../../validations/reportRegexValidation";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../../utils/firebaseConfiguration";

export const CmsReportPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { from, searchParams: previousSearchParams } = location.state || { from: '/cms-reports', searchParams: {} };
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const [searchParams] = useSearchParams(); //! setSearchParams method is not needed  as reportId is either set by the previous page befor navigation or by url and it doesn't change after report process. When report is processed navigation is performed.
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const [reportId, setReportId] = useState(searchParams.get("reportId") || null);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [reportForm, setReportForm] = useState({
    issue: "",
    severity: "",
    state: "",
    expectedDuration: "",
    submittedAt: "",
    expiresAt: "",
    description: "", 
    zone: "",
    area: "",
    address: "",
    imageUrl: "",
    locationUrl: "",

    firstName: "",
    lastName: "",
    phoneNumber: "",
    userNames: "" //? firstName and lastName of dispatcher/admin who last processed the report
  });
  const [errorAcceptForm, setErrorAcceptForm] = useState({
    expectedDuration: false,
    description: false, 
    address: false, //* isn't required
    locationUrl: false, 
    firstName: false,
    lastName: false,
    phoneNumber: false
  });
  


  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getReportForCMS"], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getReportForCMS(reportId,previousSearchParams.state,previousSearchParams.severityType,previousSearchParams.zoneId,previousSearchParams.area,previousSearchParams.category,previousSearchParams.issue),
    enabled: isQueryEnabled
  });
  
   const isEmptyObject = (obj) => Object.keys(obj).length === 0;
   const areParamsUndefined = (params) => {
    const keysToCheck = ['state', 'severityType', 'zoneId', 'area', 'category', 'issue'];
    return keysToCheck.some(key => params[key] === undefined);
   };



  useEffect(() => {
    const isUContextEmpty = isUserContextEmpty();

    //! Validation whether the url has searchParam and also whether the location has state which includes previous url and previous search params.
    if(!searchParams.has("reportId") || isEmptyObject(previousSearchParams) || areParamsUndefined(previousSearchParams)) 
    {
      navigate(from);
      return;    
    }

    //! When authenticated user is a dispatcher with NO AVAILABLE ZONES return is used to not proceed any further 
    //! and THUS display ComponentLoader inside the ReportsComponent. Otherwise, if this check doesn't exist, the dispatcher will be redirected to the default 404 page (*)
    if(!isUContextEmpty && authenticatedUser.role === "DISPATCHER" && authenticatedUser.availableZoneIds.length === 0)
    {
      setIsLoadingComponent(true);//? better safe than sorry
      navigate(from);
      return ;
    }
    
    if(!isUContextEmpty)
    {
        const newReportId = Number(searchParams.get("reportId"));

        if (!Number.isInteger(newReportId) || newReportId < 1 ) 
        {
          navigate('*');
          return;
        }

        if (newReportId !== reportId) {setReportId(newReportId);}

        setIsQueryEnabled(true);//? all validations passed and authenticatedUser is present
    }
    
  }, [searchParams, authenticatedUser]);

  

  useEffect(() => {

    if(isLoading)
    {
      setIsLoadingComponent(true);
    }

    if (status === 'success') 
    {
      const response = data.data;
      console.log(response);
       
      const submittedAt = new Date(response.submittedAt);
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG')}`;
     
      const expiresAt = response.expiresAt ? new Date(response.expiresAt) : null;
      const formattedExpiresAt = expiresAt ? `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG')}` : '-';

      const formattedUserNames = response.userNames ? response.userNames : '-';

      setReportForm({
        issue: response.issue,
        severity: response.severityType,
        state: response.state,
        expectedDuration: response.expectedDuration,
        submittedAt: formattedSubmittedAt,
        expiresAt: formattedExpiresAt,
        description: response.description,
        zone: response.zoneId,
        area: response.area,
        address: response.address,
        imageUrl: response.imageUrl,
        locationUrl: response.locationUrl,
        firstName: response.firstName,
        lastName: response.lastName,
        phoneNumber: response.phoneNumber,
        userNames: formattedUserNames
      });
      
      setIsLoadingComponent(false);
    }

    if(status === 'error') 
    {
      if(error.response?.data === "Report doesn't exist.")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече не съществува." } });
      }
      else if(error.response?.data === "Report info mismatch.[state]" || error.response?.data === "Report info mismatch.[severityType]" || error.response?.data === "Report info mismatch.[zoneId]" || error.response?.data === "Report info mismatch.[area]" || error.response?.data === "Report info mismatch.[category]" || error.response?.data === "Report info mismatch.[issue]")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече е бил актуализиран." } });
      }
      else if(error.response?.data === "Available zones of dispatcher have been changed.")
      {
        navigate(from, { state: { reloadPage: true } }); //! does full page reload of cmsReports page and also resets all search params to default ones along with the useRefs
      }
      else
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Възникна грешка. Моля опитайте отново." } });
      } 
    }

  }, [status, data, error]);

  useEffect(() => {

    if(reportForm.expectedDuration == -1)
    {
        setReportForm((prevState) => ({
          ...prevState,
          expiresAt: "-",
        }));
    }

    //TODO: based on the state to check whether it is PEDNING TO BE THIS:
    // OTHERWISE think and implement logic CAUTIOUSLY for FOR_EVALUEATION state and for ACTIVE state !!!!!!!!!!!!!!!!!!!!!!!!!!!

    else
    {
      if (reportForm.submittedAt) //! this check is done because otherwise this clause could possibly be entered while the reportForm.submittedAt is still not populated
      { 
        const cleanedString = reportForm.submittedAt.replace(' ч.', '').replace(' г.', '');
        const [time, date] = cleanedString.split(', ');
        const [day, month, year] = date.split('.');
        const submittedAt = new Date(`${year}-${month}-${day}T${time}:00`);
    
        if (!isNaN(submittedAt)) 
        {
          const updatedExpiresAt = new Date(submittedAt);
          updatedExpiresAt.setHours(updatedExpiresAt.getHours() + parseInt(reportForm.expectedDuration));
          const formattedExpiresAt = `${updatedExpiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${updatedExpiresAt.toLocaleDateString('bg-BG')}`;
          setReportForm((prevState) => ({
            ...prevState,
            expiresAt: formattedExpiresAt,
          }));
        } 
      }
    }

  }, [reportForm.expectedDuration]);




  const isErrorAcceptFormValid = () => {
    return Object.values(errorAcceptForm).every(value => value === false);
  }; //TODO: PERFORM SAME CHECK FOR OTHER ERROR FORMS

  const handleInput = (name, value) => {
    if(name === 'expectedDuration' || name === 'description' || name === 'address' || name === 'locationUrl') 
    {setReportForm(prevState => ({...prevState, [name]: value}));} 
    else 
    {setReportForm(prevState => ({...prevState, [name]:  value.trim()}));}

     closeSnackbar();

      if(!isErrorAcceptFormValid()){
        setErrorAcceptForm({
        expectedDuration: false,
        description: false,
        address: false,
        locationUrl: false,
        firstName: false,
        lastName: false,
        phoneNumber: false
      });}

      //TODO: PERFORM SAME RESET FOR OTHER ERROR FORMS
  };







  //-----state PENDING-----
  const acceptReportMutation = useMutation({
    mutationFn: acceptReportRequest,
    onSuccess: () => {
        navigate(from, { state: { showSuccessSnackbar: true, message: "Операцията е успешна." } });
    },
    onError: (error) => {
          
      if(error.response?.data === "Report doesn't exist.")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече не съществува." } });
      }
      else if(error.response?.data === "Report info mismatch.[state]" || error.response?.data === "Report info mismatch.[severityType]" || error.response?.data === "Report info mismatch.[zoneId]" || error.response?.data === "Report info mismatch.[area]" || error.response?.data === "Report info mismatch.[category]" || error.response?.data === "Report info mismatch.[issue]")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече е бил актуализиран." } });
      }
      else if(error.response?.data === "Available zones of dispatcher have been changed.")
      {
        navigate(from, { state: { reloadPage: true } }); //! does full page reload of cmsReports page and also resets all search params to default ones along with the useRefs
      }
      else
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Възникна грешка. Моля опитайте отново." } });
      } 
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    },
  });

  const onPressAccept = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      const validateFormOnAcceptMessage = validateReportFormOnAccept(reportForm); 

      if(validateFormOnAcceptMessage)
      {
        setErrorAcceptForm(processErrorAcceptFormOnSubmit(reportForm, errorAcceptForm, validateFormOnAcceptMessage));
        showSnackbar(validateFormOnAcceptMessage,"error","bottom","right");
      }
      else
      {
          setIsRequestSent(true);
          setBackdropOpen(true);

          acceptReportMutation.mutate({
            urlParams: {
              reportId,
              state: previousSearchParams.state,
              severityType: previousSearchParams.severityType,
              zoneId: previousSearchParams.zoneId,
              area: previousSearchParams.area,
              category: previousSearchParams.category,
              issue: previousSearchParams.issue,
            },
            requestBody: {
              issue: reportForm.issue,
              severityType: reportForm.severity,
              expectedDuration: reportForm.expectedDuration,
              description: reportForm.description,
              zoneId: reportForm.zone,
              area: reportForm.area,
              address: reportForm.address,
              locationUrl: reportForm.locationUrl,
              firstName: reportForm.firstName,
              lastName: reportForm.lastName,
              phoneNumber: reportForm.phoneNumber
            }
          });
      }

    }  
  };
  

  const rejectReportMutation = useMutation({
    mutationFn: rejectReportRequest,
    onSuccess: async (data) => {

      if(data.data !== null) //? checks if after report deletion imageUrl was returned or not(meaning report had no uploaded image)
      {
          const imageUrl = data.data;
          const imageRef = ref(storage, imageUrl);
          try 
          {
            await deleteObject(imageRef); //? Delete the uploaded image of the already deleted report
          } 
          catch (deleteError) 
          {
            //console.error("Failed to delete image from Firebase after successful mutation[report was deleted from database]", deleteError);
          }
      }
        navigate(from, { state: { showSuccessSnackbar: true, message: "Операцията е успешна." } });
    },
    onError: (error) => {
          
      if(error.response?.data === "Report doesn't exist.")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече не съществува." } });
      }
      else if(error.response?.data === "Report info mismatch.[state]" || error.response?.data === "Report info mismatch.[severityType]" || error.response?.data === "Report info mismatch.[zoneId]" || error.response?.data === "Report info mismatch.[area]" || error.response?.data === "Report info mismatch.[category]" || error.response?.data === "Report info mismatch.[issue]")
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Докладът вече е бил актуализиран." } });
      }
      else if(error.response?.data === "Available zones of dispatcher have been changed.")
      {
        navigate(from, { state: { reloadPage: true } }); //! does full page reload of cmsReports page and also resets all search params to default ones along with the useRefs
      }
      else
      {
        navigate(from, { state: { showErrorSnackbar: true, message: "Възникна грешка. Моля опитайте отново." } });
      } 
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    },
  });

  const onPressReject = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      setIsRequestSent(true);
      setBackdropOpen(true);

      rejectReportMutation.mutate({
        urlParams: {
          reportId,
          state: previousSearchParams.state,
          severityType: previousSearchParams.severityType,
          zoneId: previousSearchParams.zoneId,
          area: previousSearchParams.area,
          category: previousSearchParams.category,
          issue: previousSearchParams.issue,
        }
      });

    }  
  };
   //-----state PENDING-----






















  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };


 

  return (
    <div className="cms_report_page">

      <ReportComponent
         isLoadingComponent={isLoadingComponent}
         isRequestSent={isRequestSent}
         reportForm={reportForm}
         handleInput={handleInput}
         onPressAccept={onPressAccept}
         errorAcceptForm={errorAcceptForm}
         onPressReject={onPressReject}
        // authenticatedUser={authenticatedUser}
        // status={status}
        // isLoadingComponent={isLoadingComponent}
        // handlePageChange={handlePageChange}
        // pageNumber={pageNumber}
        // handleStateChange={handleStateChange} 
        // state={state}
        // handleSeverityTypeChange={handleSeverityTypeChange}
        // severityType={severityType}
        // handleSelectedZoneChange={handleSelectedZoneChange}
        // selectedZoneId={selectedZoneId}
        // handleCategoryChange={handleCategoryChange}
        // category={category}
        // handleIssueChange={handleIssueChange}
        // issue={issue}
        // handleAreaChange={handleAreaChange}
        // area={area}
        // pages={pages}
        // rows={rows}
      />

      <BackdropLoader open={backdropOpen} />

     {/*when navigating back to reports page, location state must be set here in all mutations onSuccess onError so snack bar is displayed there accordingly*/}

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
