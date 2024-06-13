import { useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Autocomplete, Box, Snackbar, TextField } from "@mui/material";
import { getAllSeverities, getFullSeverityObjectBySeverity, getSeverityByColor } from "../../../services/severityService";
import { getAllZones, getBadgeOfZone, getUnavailableZoneIds, getAlertsSeveritiesOfAvailableZones, getAvailableZoneIds, getFullZoneById, publishAlertRequest, deleteAlertRequest, getAlertOfZone} from "../../../services/zoneService";
import { useUserContext } from "../../../hooks/useUserContext";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { BackdropLoader } from "../../../components/Loaders/BackdropLoader";
import { processErrorAlertFormOnPublish, validateAlertFormOnPublish } from "../../../validations/alertRegexValidation";
import { useSnackbar } from "../../../hooks/useSnackbar";
import '/src/assets/scripts/bgMap/map.css';
import './cms_zones_page.scss';

//? Global variable to act as storage for already loaded local images (zone badges)
const loadedImages = {};

export const CmsZonesPage = () => {
  const mapContainerRef = useRef(null); //!doesnt trigger re-render on state change(current)
  const mapInstance = useRef(null); //!doesnt trigger re-render on state change(current)
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
  const [alertForm, setAlertForm] = useState({
    zone: "",
    severity: "",
    description: ""
  });
  const [errorAlertForm, setErrorAlertForm] = useState({
    zone: false,
    severity:false,
    description: false
  });
  const [comboBoxKeys, setComboBoxKeys] = useState({ //? used to clear all combo boxes after successful alert publishing or removing
    key1: 0,
    key2: 2
  });


  const {
    data,
    status,
    //isLoading,
    error,
    refetch: refetchAlerts
  } = useQuery({
    queryKey: ["getAlertsSeveritiesOfAvailableZonesForCMS"], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getAlertsSeveritiesOfAvailableZones(), 
    enabled: isQueryEnabled
  });

  const {
    data: alertData,
    status: alertFetchStatus,
    //isLoading: alertFetchLoading,
    error: alertFetchError
  } = useQuery({
    queryKey: ["getAlertOfZoneForCMS",  alertForm.zone], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: ({ queryKey }) => {
      const zoneId = queryKey[1];
      return getAlertOfZone(zoneId);
    },
    enabled: isQueryEnabled && alertForm.zone !== ""
  });

  //? Used in order to prevent admin from accessing the CmsZonesPage by typing its path in the URL. (even though he doesn't have UI button for it)
  useEffect(() => { 
    const isUContextEmpty = isUserContextEmpty(); //? return true/false
    if(!isUContextEmpty && authenticatedUser.role !== "DISPATCHER") //? if user context is NOT empty and user role is NOT DISPATCHER
    { 
      navigate("/cms-dashboard", {replace: true});
    }
  }, [authenticatedUser]);
  


  useEffect(() => {

    //? Load all zones badge images
    const zones = getAllZones();
    zones.forEach((zone) => {
      const img = new Image();
      const url = getBadgeOfZone(zone.zoneId);
      img.src = url;
      loadedImages[zone.zoneId] = img; //* stores the loaded local image(zone badge) to prevent image loading again and again
    });
    

    // Capture the current value of mapContainerRef at the time of effect execution
    const currentMapContainer = mapContainerRef.current;

    // Helper function to dynamically load scripts
    const loadScript = (scriptPath) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${scriptPath}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = scriptPath;
        script.async = false; //! ensure script is executed in order
        script.defer = true;  //! defer execution until document is parsed
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };


    

  // Function to initialize the map
  const initMap = () => {

    if (!mapInstance.current && window.FlaMap && mapContainerRef.current) {
      mapInstance.current = new window.FlaMap(window.map_cfg);
      mapInstance.current.draw(mapContainerRef.current.id);
      setMapLoaded(true); // Indicate that the map is loaded
    }
  };




    // Load the necessary scripts(raphael first, before the rest, in order to avoid possible errors)
    Promise.all([
      loadScript('/src/assets/scripts/bgMap/raphael.min.js')
    ]).then(() => {
      return Promise.all([
        loadScript('/src/assets/scripts/bgMap/settings.js'),
        loadScript('/src/assets/scripts/bgMap/paths.js'),
        loadScript('/src/assets/scripts/bgMap/map.js')
      ]);
    }).then(initMap)
    .catch((error) => {
      console.log('Error loading scripts:', error);
    });
     
    

    // Clean up the map instance on component unmount
    return () => {
      if (currentMapContainer) {
         // Remove the map container's content on cleanup
      currentMapContainer.innerHTML = '';
      }
      mapInstance.current = null;

      // if(mapInstance.current){
      //   mapInstance.current.destroy();
      // }
    };

  }, []);

  //? Used for painting the zones according to the dispatcher's availableZoneIds (This happends only after the map has been loaded)
  useEffect(() => {
    
    if(mapLoaded && authenticatedUser.availableZoneIds && authenticatedUser.availableZoneIds.length > 0)
    {
      const unavailableZoneIds =  getUnavailableZoneIds(authenticatedUser.availableZoneIds);
        
      unavailableZoneIds.forEach(zoneId => {
        mapInstance.current.disableState(zoneId);
      });

      setIsQueryEnabled(true);

      //!!! This on event listener is for the whole map not for each separate zone
      //* I do not need the mapInstance in the callback function despite it is described in the HTML5 Locator Map - API reference
      const event = 'click';
      mapInstance.current.on(event, (event, elementId/*, mapInstance*/) => { 
        handleClick(event, elementId);
      });

    }

  }, [authenticatedUser.availableZoneIds, mapLoaded]);






  useEffect(() => {

    if (status === 'success') 
    {
      data.data.zoneSeveritiesDTOList.map((item) => {
      
        const zoneColor = item.severityType !== null ? getZoneColor(item.severityType) : '#009F58';
        mapInstance.current.setColor(item.zoneId, zoneColor);

        const zoneColorOver = getZoneColorOver(zoneColor);
        mapInstance.current.setColorOver(item.zoneId, zoneColorOver);
      });
    }

    if(status === 'error') 
    {
      showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
    }

  }, [status, data, error]);

  useEffect(() => {

    if (alertFetchStatus === 'success') 
    {
      handleInput('alert',alertData.data);

      //? Just paint the selected zone with color based on the severityType from the response of the server. (Even though it might be useless in most cases, in some cases it might be useful - when a new alert has been added to zone from other dispatcher, and in our map the zone is green, when we click it, it will be painted in the color based on the severityType of the newly added alert by the other dispatcher)
      const zoneColor = getZoneColor(alertData.data.severityType);
      mapInstance.current.setColor(alertForm.zone, zoneColor);

      const zoneColorOver = getZoneColorOver(zoneColor);
      mapInstance.current.setColorOver(alertForm.zone, zoneColorOver);
    }

    if(alertFetchStatus === 'error') 
    {
      if(alertFetchError.response?.data === "Available zones of dispatcher have been changed.")
      {
        window.location.reload();
      }
      else if(alertFetchError.response?.data === "Zone doesn't have an alert.")
      {
        setAlertForm(prevState => ({
          ...prevState, 
          severity: "",
          description: ""    
        }));

        const currZoneColor = mapInstance.current.fetchStateAttr(alertForm.zone,'color'); //? gets the color of zone with id
        //!if zone doesn't have an alert and its color is not green, make the color green
        if(currZoneColor !== '#009F58')
        {
          const zoneColor = '#009F58';
          mapInstance.current.setColor(alertForm.zone, zoneColor);
  
          const zoneColorOver = getZoneColorOver(zoneColor);
          mapInstance.current.setColorOver(alertForm.zone, zoneColorOver);
        }
      }
      else
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      } 
    }

  }, [alertFetchStatus, alertData, alertFetchError]);



   function getZoneColor(severityType) {
    if (severityType === 'LOW') {return 'yellow';}
    else if (severityType === 'MEDIUM') {return 'orange';}
    else if (severityType === 'HIGH') {return '#E50000';}
    else if (severityType === 'CRITICAL') {return '#303515';}
    else {return '#009F58';}
   }

   function getZoneColorOver(zoneColor) {
    if (zoneColor === 'yellow') {return '#b1b100';}
    else if (zoneColor === 'orange') {return '#c77700';}
    else if (zoneColor === '#E50000') {return '#B40000';}
    else if (zoneColor === '#303515') {return '#1E220E';}
    else {return '#007742';}
   }

   const isErrorAlertFormValid = () => {
    return Object.values(errorAlertForm).every(value => value === false);
  };

  const handleInput = (name, value) => {

    if(name === 'alert') 
    {setAlertForm(prevState => ({
      ...prevState, 
      severity: value.severityType.trim(),
      description: value.message    
    }));}

    else if(name === 'description')
    {setAlertForm(prevState => ({...prevState, [name]: value}));} 
      
    else 
    {setAlertForm(prevState => ({...prevState, [name]:  value.trim()}));}

    closeSnackbar();

    if(!isErrorAlertFormValid()){
      setErrorAlertForm({
        zone: false,
        severity:false,
        description: false
    });}

  };


  const handleClick = (event, id) => {
    closeSnackbar();
    const zoneColor = mapInstance.current.fetchStateAttr(id,'color'); //? gets the color of zone with id
    const severityType = getSeverityByColor(zoneColor);

    if(zoneColor !== "#009F58")
    {
      setAlertForm(prevState => ({
        ...prevState, 
        zone: id, 
        severity: severityType !== null ? severityType.type : ""
      }));
    }
    else
    {
      setAlertForm(prevState => ({
        ...prevState, 
        zone:  id, 
        severity: severityType !== null ? severityType.type : "",
        description: ""
      }));
    } 

    setErrorAlertForm({
      zone: false,
      severity:false,
      description: false
    });
    
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
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

  const clearAlertForm = () => {
    setAlertForm({
      zone: "",
      severity: "",
      description: ""
    });
    updateComboBoxKeys();
  }










  const publishAlertMutation = useMutation({
    mutationFn: publishAlertRequest,
    onSuccess: () => {
        clearAlertForm();
        refetchAlerts();
        showSnackbar("Операцията е успешна.","success","bottom","right");
    },
    onError: (error) => {
          
      if(error.response?.data === "Available zones of dispatcher have been changed.")
      {
        window.location.reload();
      }
      else
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      } 
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    },
  });
  

  const onPressPublishAlert = (event) => {
    event.preventDefault();
    closeSnackbar();

      if(!isRequestSent)
      {
        const validateAlertFormOnPublishMessage = validateAlertFormOnPublish(alertForm); 

        if(validateAlertFormOnPublishMessage)
        {
          setErrorAlertForm(processErrorAlertFormOnPublish(alertForm, errorAlertForm, validateAlertFormOnPublishMessage));
          showSnackbar(validateAlertFormOnPublishMessage,"error","bottom","right");
        }
        else
        {
            setIsRequestSent(true);
            setBackdropOpen(true);
  
            publishAlertMutation.mutate({
              requestBody: {
                zoneId: alertForm.zone,
                alertDTO:{
                  severityType: alertForm.severity,
                  message: alertForm.description
                }
              
              }
            });    
        }

      }

  }  





  const deleteAlertMutation = useMutation({
    mutationFn: deleteAlertRequest,
    onSuccess: () => {
        clearAlertForm();
        refetchAlerts();
        showSnackbar("Операцията е успешна.","success","bottom","right");
    },
    onError: (error) => {
          
      if(error.response?.data === "Available zones of dispatcher have been changed.")
      {
        window.location.reload();
      }
      else if(error.response?.data === "Zone doesn't have an alert.")
      {
        window.location.reload();
      }
      else
      {
        showSnackbar("Възникна грешка. Моля опитайте отново.","error","bottom","right");
      } 
    },
    onSettled: () => {
      setIsRequestSent(false);
      setBackdropOpen(false);
    },
  });


  const onPressDeleteAlert = (event) => {
    event.preventDefault();
    closeSnackbar();

    if(!isRequestSent)
    {
      if(!alertForm.zone)
      {
        showSnackbar("Моля изберете област.","error","bottom","right");
      }
      else
      {
        const zoneColor = mapInstance.current.fetchStateAttr(alertForm.zone,'color'); //? gets the color of zone with id

        if(zoneColor !== "#009F58")
        {
          setIsRequestSent(true);
          setBackdropOpen(true);
    
          deleteAlertMutation.mutate({
            requestBody: {
              zoneId: alertForm.zone
            }
          });    
        }

      }
    }
  }  







 if(!authenticatedUser.availableZoneIds ||  authenticatedUser.availableZoneIds.length < 1)
  {
    return (
      <div className="cms_zones_page">
        <div className="cms_zones_page__loader-box">
          <PageLoader />
        </div>
      </div>
    );
  }

  else
  {
    return (
      <div className="cms_zones_page">

        <BackdropLoader open={backdropOpen} />
        
  
        <div className="cms_zones_page__heading">Публикуване на предупреждение за опасност</div>
  
   
  
  
  
        <div className="cms_zones_page__wrapper">
  
        <div className="cms_zones_page__wrapper__container1">
        <div ref={mapContainerRef} id="map-container"></div>
        </div>
  
        <div className="cms_zones_page__wrapper__container2">
  
        <Autocomplete
                key={comboBoxKeys.key1} //? When the key changes the comboBox selection is cleared.
                id="combo-box-zones-process-alert"
                sx={{
                  pb: 2,
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
                  {backgroundColor: "#b5ffcc !important"}
                 }}
                options={getAvailableZoneIds(authenticatedUser.availableZoneIds)}
                disablePortal
                disableClearable={true}
                noOptionsText={"Няма такава опция"}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, selectedOption) => option.zoneId === selectedOption.zoneId}
                value={getFullZoneById(alertForm.zone)}
                onChange={(event, selectedOption) => 
                  {
                    handleInput('zone', selectedOption.zoneId);
                  }}
              renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="eager"
                      width="30"
                      src={loadedImages[option.zoneId].src} //? Use already loaded image
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={
                  (params) => 
                  <TextField
                  sx={{backgroundColor: 'white'}}
                  required
                  color="success"
                  error={errorAlertForm.zone}
                  {...params} 
                  label="Област" />}
              />
  
  
        <Autocomplete
           key={comboBoxKeys.key2} //? When the key changes the comboBox selection is cleared.
           id="combo-box-severities-process-alert"
           sx={{pb: 1}} 
           options={getAllSeverities()}
           disablePortal
           disableClearable={true}
           noOptionsText={"Няма такава опция"}
           getOptionLabel={(option) => option.label}
           isOptionEqualToValue={(option, selectedOption) => option.type === selectedOption.type}
           value={getFullSeverityObjectBySeverity(alertForm.severity)}
           onChange={(event, selectedOption) => 
             {
              handleInput('severity', selectedOption.type);
             }}
         renderOption={(props, option) => (
           <Box component="li" 
             sx={{ backgroundColor: `${option.color} !important`, 
               '&:hover': {
               backgroundColor: `${option.colorOnHover} !important`,
             }}} {...props}>
             {option.label}
           </Box>
         )}
           renderInput={
             (params) => 
             <TextField
             sx={{backgroundColor: 'white'}}
             required
             color="success"
             error={errorAlertForm.severity}
             {...params} 
             label="Ниво на опасност" />}
         />
  
  
  
        <TextField
                //? This text field has "A form field should have an id or name attribute" in the console
                sx={{backgroundColor: 'white'}}
                autoComplete="off"
                id="description-process-alert"
                label="Описание"
                multiline
                rows={5}
                name="description" //! MUST MATCH WITH THE RELATED KEY FROM AlertForm
                required
                fullWidth
                color="success"
                margin="dense"
                error={errorAlertForm.description}
                value={alertForm.description}
                onChange={(e) => handleInput(e.target.name, e.target.value)} 
              />
  
          <div className="cms_zones_page__wrapper__container2__buttons-container">
            <button type="button" className="cms_zones_page__wrapper__container2__buttons-container__approve" disabled={isRequestSent} onClick={onPressPublishAlert}>{"Публикувай"}</button>
            <button type="button" className="cms_zones_page__wrapper__container2__buttons-container__reject" disabled={isRequestSent} onClick={onPressDeleteAlert}>{"Изтрий"}</button>
          </div>
  
        </div>
  
        </div>





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




};
