import { useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { Alert, Snackbar } from "@mui/material";
import { SubmitReportComponent } from "../../../components/external/SubmitReportComponent";
import { storage } from "../../../utils/firebaseConfiguration";
import { processReportErrorFormOnSubmit, validateReportFormOnSubmit } from "../../../validations/reportRegexValidation";
import { validateImageOnUpload } from "../../../validations/imageUploadValidation";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { submitReportRequest } from "../../../services/reportService";
import { ReportWithoutImageDialog } from "../../../components/dialogs/external/ReportWithoutImageDialog";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import './submit_report_page.scss';

export const SubmitReportPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [reportForm, setReportForm] = useState({
    issue: "",
    severity: "",
    expectedDuration: "",
    description: "", 
    zone: "",
    area: "-",
    address: "", //* isn't required
    locationUrl: "",

    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const [errorForm, setErrorForm] = useState({
    issue: false,
    severity: false,
    expectedDuration: false,
    description: false, 
    zone: false,
    area: false,
    address: false, //* isn't required
    locationUrl: false, 

    firstName: false,
    lastName: false,
    phoneNumber: false
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [imageForUpload, setImageForUpload] = useState(null);
  const [imageChosenSuccessfully, setImageChosenSuccessfully] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const [comboBoxKeys, setComboBoxKeys] = useState({ //? used to clear all combo boxes after successful report submit
    key1: 0,
    key2: 2,
    key3: 4,
    key4: 6,
    key5: 8
  });
  const [reportWithoutImageDialogOpen, setReportWithoutImageDialogOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();



  useEffect(() => {

    if (location.state?.selectedZone) 
    {
      setReportForm(prevState => ({
        ...prevState, 
        zone: location.state.selectedZone.trim(),
      }));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);



  const isErrorFormValid = () => {
    return Object.values(errorForm).every(value => value === false);
  };

  const resetErrorForm = () => {
    return Object.keys(errorForm).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
  };

  const handleInput = (name, value) => {
    if(name === 'expectedDuration' || name === 'description' || name === 'address' || name === 'locationUrl') 
    {setReportForm(prevState => ({...prevState, [name]: value}));} 
    else 
    {
      if(name === 'zone')
      {
        setReportForm(prevState => ({
          ...prevState, 
          [name]:  value.trim(),
          area: "-"
        }));
      }
      else
      {
        setReportForm(prevState => ({...prevState, [name]:  value.trim()}));
      }
    }

    setErrorMessage("");
    if(!isErrorFormValid()){setErrorForm(resetErrorForm());}
  };

  const updateComboBoxKeys = () => {
    setComboBoxKeys(prevKeys => {
      //? Create a copy of the previous keys and increment each key by 1
      const updatedKeys = { ...prevKeys };
      Object.keys(updatedKeys).forEach(key => {
        updatedKeys[key] = updatedKeys[key] + 1;
      });
      return updatedKeys;
    });
  };

  const clearReportForm = () => {
    setReportForm({
      issue: "",
      severity: "",
      expectedDuration: "",
      description: "", 
      zone: "",
      area: "-",
      address: "", //* isn't required
      locationUrl: "",

      firstName: "",
      lastName: "",
      phoneNumber: ""
    });
    updateComboBoxKeys();
    setImageForUpload(null);
    setImageChosenSuccessfully(null);
  }
 
  const submitReportMutation = useMutation({
    mutationFn: submitReportRequest,
    onMutate: () => {

    },
    onSuccess: () => {
      clearReportForm();
      showSnackbar("Сигналът беше изпратен успешно.","success","top","center");
    },
    onError: async () => {

      showSnackbar("Възникна грешка. Моля опитайте отново.","error","top","center");
    
      if(imageUrl !== null) 
      {
        const imageRef = ref(storage, imageUrl);
        try 
        {
          await deleteObject(imageRef); //? Delete the uploaded image in case of backend error related to report submission
        } 
        catch (deleteError) 
        {
          //console.error("Failed to delete image after unsuccessful mutation:", deleteError);
        }

      }
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
      setImageUrl(null);
    },
  });

  const uploadImage = async (event) => {
    event.preventDefault();

    if(!isRequestSent)
    {
      const validateFormMessage = validateReportFormOnSubmit(reportForm);

     if(validateFormMessage)
     {
      setErrorForm(processReportErrorFormOnSubmit(reportForm, errorForm, validateFormMessage));
      setErrorMessage(validateFormMessage);
     }
     else
     {
      if(imageChosenSuccessfully !== null)
      {
        if(imageChosenSuccessfully === false)
        {
          const validateImageUploadMessage = validateImageOnUpload(imageForUpload);
          setErrorMessage(validateImageUploadMessage);
        }
        else
        {
          try 
          {
            setIsRequestSent(true);
            setBackdropOpen(true);

            const imageRef = ref(storage, `images/${imageForUpload.name + v4()}`);
            await uploadBytes(imageRef, imageForUpload);
            
            const downloadURL = await getDownloadURL(imageRef);
            setImageUrl(downloadURL); 
    
            submitReportMutation.mutate({
              issue: reportForm.issue,
              severityType: reportForm.severity,
              expectedDuration: reportForm.expectedDuration,
              description: reportForm.description,
              zoneId: reportForm.zone,
              area: reportForm.area,
              address: reportForm.address,
              imageUrl: downloadURL,
              locationUrl: reportForm.locationUrl,
              firstName: reportForm.firstName,
              lastName: reportForm.lastName,
              phoneNumber: reportForm.phoneNumber 
            });
          } 
          catch (error) 
          {
            setIsRequestSent(false); //!! set to false if we don't reach the mutation because of image upload error
            showSnackbar("Възникна грешка. Моля опитайте отново. ⓘ", "error","top","center");
          }
        }
      }
      else
      {
        setIsRequestSent(true);
        openSubmitReportWithoutImageDialog();
      }

     }

      
    }  
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  const openSubmitReportWithoutImageDialog = () => {
    closeSnackbar();
    setReportWithoutImageDialogOpen(true);
  };

  const handleSubmitReportWithoutImageAgree = () => {
      
      setBackdropOpen(true);
      setReportWithoutImageDialogOpen(false);

      submitReportMutation.mutate({
        issue: reportForm.issue,
        severityType: reportForm.severity,
        expectedDuration: reportForm.expectedDuration,
        description: reportForm.description,
        zoneId: reportForm.zone,
        area: reportForm.area,
        address: reportForm.address,
        imageUrl: null,
        locationUrl: reportForm.locationUrl,
        firstName: reportForm.firstName,
        lastName: reportForm.lastName,
        phoneNumber: reportForm.phoneNumber 
      });
  };

  const handleSubmitReportWithoutImageDisagree = () => {
    setReportWithoutImageDialogOpen(false);
    setIsRequestSent(false);
  };

   useEffect(() => {
    if(imageForUpload !== null)
      {
        const validateImageUploadMessage = validateImageOnUpload(imageForUpload);
        if(validateImageUploadMessage)
        {
          setImageChosenSuccessfully(false);
          setErrorMessage(validateImageUploadMessage);
        }
        else
        {
          setImageChosenSuccessfully(true);
          setErrorMessage("");
        }
      }
   },[imageForUpload]);
 

  return (
    <div className="submit_report_page">
      <SubmitReportComponent
       reportForm={reportForm}
       errorForm={errorForm}
       errorMessage={errorMessage}
       handleInput={handleInput}
       setImageForUpload={setImageForUpload} 
       onPressSubmit={uploadImage}
       isRequestSent={isRequestSent}
       comboBoxKeys={comboBoxKeys}
       imageChosenSuccessfully={imageChosenSuccessfully}
      />

      <BackdropLoader open={backdropOpen} />

      <ReportWithoutImageDialog
        open={reportWithoutImageDialogOpen}
        onAgree={handleSubmitReportWithoutImageAgree}
        onDisagree={handleSubmitReportWithoutImageDisagree}
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
