import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Snackbar } from "@mui/material";
import { storage } from "../../../utils/firebaseConfiguration";
import { useUserContext } from "../../../hooks/useUserContext";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { acceptReportRequest, getReportForCMS, rejectReportRequest, revaluateReportRequest, terminateReportRequest } from "../../../services/reportService";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import { processErrorAcceptFormOnSubmit, processErrorRevaluateFormOnSubmit, validateReportFormOnAccept, validateReportFormOnRevaluate } from "../../../validations/reportRegexValidation";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import { ReportComponentPending } from "../../../components/internal/ReportComponentPending";
import { ReportComponentForRevaluation } from "../../../components/internal/ReportComponentForRevaluation/ReportComponentForRevaluation";

import { ReportComponentInactive } from "../../../components/internal/ReportComponentInactive/ReportComponentInactive";
import "./cms_report_page.scss";

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
  const [expiresAtForRevaluationAndFresh, setExpiresAtForRevaluationAndFresh] = useState("");

  const [errorAcceptForm, setErrorAcceptForm] = useState({
    expectedDuration: false,
    description: false, 
    address: false, //* isn't required
    locationUrl: false, 
    firstName: false,
    lastName: false,
    phoneNumber: false
  });
  const [errorRevaluateForm, setErrorRevaluateForm] = useState({
    expectedDuration: false, 
    description: false, 
    address: false, //* isn't required
    locationUrl: false, 
  });
  const [errorFreshForm, setErrorFreshForm] = useState({
    expectedDuration: false, //* isn't required
    description: false, 
    address: false, //* isn't required
    locationUrl: false, 
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
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
     
      const expiresAt = response.expiresAt ? new Date(response.expiresAt) : null;
      const formattedExpiresAt = expiresAt ? `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : '-';

      const formattedUserNames = response.userNames ? response.userNames : '-';

      setReportForm({
        issue: response.issue,
        severity: response.severityType,
        state: response.state,
        expectedDuration: response.state === "FOR_REVALUATION" || response.state === "FRESH" ? -1 : response.expectedDuration, //! By default when report is for revaluation or fresh, the default value for expected duration MUST BE '-' equal to -1
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

      if(response.state === "FOR_REVALUATION" || response.state === "FRESH")
      {
        //! it can NEVER be null when the state is "FOR_REVALUATION" or "FRESH"
        setExpiresAtForRevaluationAndFresh(formattedExpiresAt); //! set new state for expiresAtForRevaluationAndFresh when state is "FOR_REVALUATION" or "FRESH"
      }
      
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

    if(reportForm.state) //? if reportForm.state is populated
    {


      //* expiresAt = submittedAt + expectedDuration
      if (reportForm.state === "PENDING") 
      { 
        if(reportForm.expectedDuration === -1) //! expiresAt CAN BE - if expectedDuration is -1 only for "PENDING" (INACTIVE is not included as all of its fields are disabled)
        { 
            setReportForm((prevState) => ({
              ...prevState,
              expiresAt: "-",
            }));
        }
        else if(reportForm.submittedAt) //! this check is done because otherwise this clause could possibly be entered while the reportForm.submittedAt is still not populated
        {
          const cleanedString = reportForm.submittedAt.replace(' ч.', '').replace(' г.', '');
          const [time, date] = cleanedString.split(', ');
          const [day, month, year] = date.split('.');
          const submittedAt = new Date(`${year}-${month}-${day}T${time}:00`);
      
          if (!isNaN(submittedAt)) 
          {
            const updatedExpiresAt = new Date(submittedAt);
            updatedExpiresAt.setHours(updatedExpiresAt.getHours() + parseInt(reportForm.expectedDuration));
            const formattedExpiresAt = `${updatedExpiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${updatedExpiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            setReportForm((prevState) => ({
              ...prevState,
              expiresAt: formattedExpiresAt,
            }));
          } 
        }      
      }

// OTHERWISE think and implement logic CAUTIOUSLY for FOR_EVALUEATION state and for FRESH state !!!!!!!!!!!!!!!!!!!!!!!!!!!

      //!!!! this code down below maybe can also be used for FRESH state!!!!!!!!!!!!!!!!!!!!!!!!

      //? expiresAt = expiresAtForRevaluationAndFresh(old version of expiresAt) + expectedDuration
      else if (reportForm.state === "FOR_REVALUATION" && reportForm.expiresAt) //! this check is done because otherwise this clause could possibly be entered while the reportForm.expiresAt is still not populated
      {  
        if(reportForm.expectedDuration === -1 &&  reportForm.expiresAt !== expiresAtForRevaluationAndFresh)
        {
          const cleanedString = expiresAtForRevaluationAndFresh.replace(' ч.', '').replace(' г.', ''); //!!!!!!!!!!!!! special state USED (expiresAtForRevaluationAndFresh)
          const [time, date] = cleanedString.split(', ');
          const [day, month, year] = date.split('.');
          const expiresAt = new Date(`${year}-${month}-${day}T${time}:00`);
      
          if (!isNaN(expiresAt)) 
          {
            const updatedExpiresAt = new Date(expiresAt);
            updatedExpiresAt.setHours(updatedExpiresAt.getHours() + parseInt(0)); //? returns back the initial expiresAt date
            const formattedExpiresAt = `${updatedExpiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${updatedExpiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            setReportForm((prevState) => ({
              ...prevState,
              expiresAt: formattedExpiresAt,
            }));
          } 
        }
        else if(reportForm.expectedDuration !== -1)
        {
          const cleanedString = expiresAtForRevaluationAndFresh.replace(' ч.', '').replace(' г.', ''); //!!!!!!!!!!!!! special state USED (expiresAtForRevaluationAndFresh)
          const [time, date] = cleanedString.split(', ');
          const [day, month, year] = date.split('.');
          const expiresAt = new Date(`${year}-${month}-${day}T${time}:00`);
    
          if (!isNaN(expiresAt)) 
          {
            const updatedExpiresAt = new Date(expiresAt);
            updatedExpiresAt.setHours(updatedExpiresAt.getHours() + parseInt(reportForm.expectedDuration));
            const formattedExpiresAt = `${updatedExpiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${updatedExpiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            setReportForm((prevState) => ({
              ...prevState,
              expiresAt: formattedExpiresAt,
            }));
          } 
        }

        
      }


      //TODO: in fresh, if expectedDuration is -1 then expiresAt to not be changed
    
    }

   

  }, [reportForm.expectedDuration]);




  const isErrorAcceptFormValid = () => {
    return Object.values(errorAcceptForm).every(value => value === false);
  };

  const isErrorRevaluateFormValid = () => {
    return Object.values(errorRevaluateForm).every(value => value === false);
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

      if(!isErrorRevaluateFormValid()){
        setErrorRevaluateForm({
        expectedDuration: false,
        description: false,
        address: false,
        locationUrl: false,
      });}

      
    
    
    

      //TODO: PERFORM SAME RESET FOR OTHER ERROR FORMS
  };



  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
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





   //-----state FOR_REVALUATION-----
   const revaluateReportMutation = useMutation({
    mutationFn: revaluateReportRequest,
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

  const onPressRevaluate = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      const validateFormOnRevaluateMessage = validateReportFormOnRevaluate(reportForm); 

      if(validateFormOnRevaluateMessage)
      {
        setErrorRevaluateForm(processErrorRevaluateFormOnSubmit(reportForm, errorRevaluateForm, validateFormOnRevaluateMessage));
        showSnackbar(validateFormOnRevaluateMessage,"error","bottom","right");
      }
      else
      {
          setIsRequestSent(true);
          setBackdropOpen(true);

          revaluateReportMutation.mutate({
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
              severityType: reportForm.severity,
              expectedDuration: reportForm.expectedDuration,
              description: reportForm.description,
              zoneId: reportForm.zone,
              area: reportForm.area,
              address: reportForm.address,
              locationUrl: reportForm.locationUrl
            }
          });
      }

    }  
  };
   //-----state FOR_REVALUATION-----


   

   //-----for both states FOR_REVALUATION and FRESH the terminate report operation is the same-----
   const terminateReportMutation = useMutation({
    mutationFn: terminateReportRequest,
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
  

  const onPressTerminate = async (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      try
      {


        setIsRequestSent(true);
        setBackdropOpen(true);

        if(reportForm.imageUrl)
        {
          const oldImageRef = ref(storage, reportForm.imageUrl);
          const newImageRef = ref(storage, `inactive-images/${oldImageRef.name}`);

          if(!reportForm.imageUrl.includes("inactive-images")) //! only if the old image url doesn't contain the substring 'inactive-images', which if it is true would mean that the image has already been moved to firebase 'inactive-images' folder and updated in the database also. If this check here is not performed the image will be deleted from the 'inactive-images' folder.
          {
            await moveImageToOtherFolder(oldImageRef, newImageRef); //? copies the old image to folder 'inactive-images' and deletes it from the 'images' folder

            const newImageUrl = await getDownloadURL(newImageRef);

            terminateReportMutation.mutate({
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
                  imageUrl: newImageUrl
                }
            });
          }
          else
          {
            terminateReportMutation.mutate({
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
                  imageUrl: reportForm.imageUrl
                }
            });
          } 
        }



        else
        {
          terminateReportMutation.mutate({
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
              imageUrl: null
            }
          });
        }


      }
      catch(error) //! might be caused if a report has already been terminated by another dispatcher/admin, and we try to get image of a report by url, which has already been changed(a.k.a the image has already been moved to 'inactive-images')
      { 
        setIsRequestSent(false); //!! set to false if we don't reach the mutation because of image copy-move-delete error
        setBackdropOpen(false);
        showSnackbar("Възникна грешка. Моля опитайте отново. ⓘ", "error","bottom","right");
        window.location.reload();
      }
      

    }  
  };

  
  const moveImageToOtherFolder = async (sourceRef, destRef) => {

    const downloadURL = await getDownloadURL(sourceRef);
    const response = await fetch(downloadURL);
    const blob = await response.blob();

    await uploadBytes(destRef, blob);
    await deleteObject(sourceRef);
  };
   //-----for both state FOR_REVALUATION and FRESH the terminate report operation is the same-----









  









  if(!reportForm.state)
  {
    return (
        <PageLoader/>
    );
  }
  else
  {
    if(reportForm.state === 'PENDING')
    {
      return (
        <div className="cms_report_page">
    
          <ReportComponentPending
             isLoadingComponent={isLoadingComponent}
             isRequestSent={isRequestSent}
             reportForm={reportForm}
             handleInput={handleInput}
             onPressAccept={onPressAccept}
             errorAcceptForm={errorAcceptForm}
             onPressReject={onPressReject}
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
    }
    
    if(reportForm.state === 'FOR_REVALUATION')
      {
        return (
          <div className="cms_report_page">
      
            <ReportComponentForRevaluation
              isLoadingComponent={isLoadingComponent}
              isRequestSent={isRequestSent}
              reportForm={reportForm}
              handleInput={handleInput}
              errorRevaluateForm={errorRevaluateForm}
              onPressRevaluate={onPressRevaluate}
              onPressTerminate={onPressTerminate}
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
      }














    if(reportForm.state === 'INACTIVE')
      {
        return (
          <div className="cms_report_page">
      
            <ReportComponentInactive
               isLoadingComponent={isLoadingComponent}
               reportForm={reportForm}
            />
      
          </div>
        );
      }
  }

  
};
