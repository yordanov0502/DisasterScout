import { useEffect } from "react";
import { Autocomplete, Box, Button, TextField, styled } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { getAllAreasOfZone, getAllZones, getBadgeOfZone, getFullZoneById } from "../../../services/zoneService";
import { getAllSeverities, getFullSeverityObjectBySeverity } from "../../../services/severityService";
import { getAllIssues, getExpectedDurationHoursForRevaluationAndFresh, getFullExpectedDurationObjectByExpectedDurationForRevaluationAndFresh, getFullIssueObjectByIssue, getReportStateByType } from "../../../services/reportService";
import "./report_component_for_revaluation.scss";

//? Global variable to act as storage for already loaded local images (zone badges)
const loadedImages = {};

const noImageUrl = "src/assets/images/no-photo.png";

export const ReportComponentForRevaluation = ({ isLoadingComponent,
                                                isRequestSent,
                                                reportForm, 
                                                handleInput, 
                                                errorRevaluateForm,
                                                onPressRevaluate,
                                                onPressTerminate
                                              }) => {

    const IssueGroupHeader = styled('div')(() => ({
        position: 'relative',
        // top: '-5px',
        padding: '4px 10px',
        color: 'white',
        backgroundColor: '#009F58'
    }));

    const IssueGroupItems = styled('ul')({
      padding: 0,
    });
    


    
    //? Used for loading the images of zones from from combobox in advance, so when opened they to be already loaded
    useEffect(() => {
      const zones = getAllZones();
      zones.forEach((zone) => {
        const img = new Image();
        const url = getBadgeOfZone(zone.zoneId);
        img.src = url;
        loadedImages[zone.zoneId] = img; //* stores the loaded local image(zone badge) to prevent image loading again and again
      });
    }, []);


    if(isLoadingComponent || !reportForm.state)
    {
        return (
          <div className="report_component_for_revaluation">
            <div className="report_component_for_revaluation__loader-box">
              <ComponentLoader />
            </div>
          </div>
        );
    }
    
    else
    {
      return (
   
        <div className="report_component_for_revaluation">
    
        <div className="report_component_for_revaluation__container1">
    
         <img className="report_component_for_revaluation__container1__image"
            src={reportForm.imageUrl || noImageUrl}
            alt={""} 
         />
    
         <div className="report_component_for_revaluation__container1__wrapper1">
    
         <div className="report_component_for_revaluation__container1__wrapper1__box1">
    
    <Autocomplete
         key={300} //? When the key changes the comboBox selection is cleared.
         id="combo-box-issues-process-report"
         sx={{
           pb: 2,
           "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
           {backgroundColor: "#b5ffcc !important"}
          }}
         options={getAllIssues().sort((a, b) => b.category.localeCompare(a.category))}
         groupBy={(option) => option.category}
         disablePortal
         disableClearable={true}
         noOptionsText={"Няма такава опция"}
         getOptionLabel={(option) => option.label}
         isOptionEqualToValue={(option, selectedOption) => option.issue === selectedOption.issue}
         value={getFullIssueObjectByIssue(reportForm.issue)}
         onChange={(event, selectedOption) => 
           { 
             handleInput('issue', selectedOption.issue);
           }}
         renderInput={
           (params) => 
           <TextField
           sx={{backgroundColor: 'white'}}
           required
           color="success"
           {...params} 
           label="Категория" />}
           renderGroup={(params) => (
             <li key={params.key}>
               <IssueGroupHeader>{params.group}</IssueGroupHeader>
               <IssueGroupItems>{params.children}</IssueGroupItems>
             </li>
           )}
           disabled={true}
       />
    
    <Autocomplete
         key={301} //? When the key changes the comboBox selection is cleared.
         id="combo-box-severities-process-report"
         sx={{pb: 1}} 
         options={getAllSeverities()}
         disablePortal
         disableClearable={true}
         noOptionsText={"Няма такава опция"}
         getOptionLabel={(option) => option.label}
         isOptionEqualToValue={(option, selectedOption) => option.type === selectedOption.type}
         value={getFullSeverityObjectBySeverity(reportForm.severity)}
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
           {...params} 
           label="Ниво на опасност" />}
       />
    
        <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="state-process-report"
         label="Статус"
         name="state" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={getReportStateByType(reportForm.state)}
         InputProps={{readOnly: true}}
       />
    
    <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="submittedAt-process-report"
         label="Докладвано в"
         name="submittedAt" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.submittedAt}
         InputProps={{readOnly: true}}
       />
    
    <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="expiresAt-process-report"
         label="Актуално до"
         name="expiresAt" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.expiresAt}
         InputProps={{readOnly: true}}
       />
    
     
       <Autocomplete
              key={302} //? When the key changes the comboBox selection is cleared.
              id="combo-box-duration-process-report"
              sx={{
                pt: 1,
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
                {backgroundColor: "#b5ffcc !important"}
               }}
              options={getExpectedDurationHoursForRevaluationAndFresh()}
              disablePortal
              disableClearable={true}
              noOptionsText={"Няма такава опция"}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, selectedOption) => option.hours === selectedOption.hours}
              value={getFullExpectedDurationObjectByExpectedDurationForRevaluationAndFresh(reportForm.expectedDuration)} 
              onChange={(event, selectedOption) => 
                {
                  handleInput('expectedDuration', selectedOption.hours);
                }}
              renderInput={
                (params) => 
                <TextField
                sx={{backgroundColor: 'white'}}
                required
                color="success"
                error={errorRevaluateForm.expectedDuration}
                {...params} 
                label="Времетраене" />}
            />
    
       
     
    </div>
    
    <div className="report_component_for_revaluation__container1__wrapper1__box2">
    
      <Autocomplete
              key={303} //? When the key changes the comboBox selection is cleared.
              id="combo-box-zones-process-report"
              sx={{
                pb: 2,
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
                {backgroundColor: "#b5ffcc !important"}
               }}
              options={getAllZones()}
              disablePortal
              disableClearable={true}
              noOptionsText={"Няма такава опция"}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, selectedOption) => option.zoneId === selectedOption.zoneId}
              value={getFullZoneById(reportForm.zone)}
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
                {...params} 
                label="Област" />}
            />
    
            <Autocomplete
              key={304} //? When the key changes the comboBox selection is cleared.
              id="combo-box-areas-process-report"
             sx={{
              pb:1,
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
              {backgroundColor: "#b5ffcc !important"}
             }}
              options={getAllAreasOfZone(reportForm.zone)}
              disablePortal
              disableClearable={true}
              noOptionsText={"Моля изберете област"}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, selectedOption) => option === selectedOption}
              value={reportForm.area}
              onChange={(event, selectedOption) => 
                {
                  handleInput('area', selectedOption);
                }}
              renderInput={
                (params) => 
                <TextField
                sx={{backgroundColor: 'white'}}
                required
                color="success"
                {...params} 
                label="Район" />}
            />
    
        <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="address-process-report"
         label="Адрес"
         name="address" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         error={errorRevaluateForm.address}
         value={reportForm.address}
         onChange={(e) => handleInput(e.target.name, e.target.value)} 
       />
             
    <TextField //TODO: in the public website implement onClick for the buton google maps
         sx={{backgroundColor: 'white', mb: 1.5}}
         autoComplete="off"
         id="locationUrl-process-report"
         label="Линк локация / координати"
         name="locationUrl" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         error={errorRevaluateForm.locationUrl}
         value={reportForm.locationUrl}
         onChange={(e) => handleInput(e.target.name, e.target.value)} 
       />
    
        <Button 
            sx={{height: '122px', 
                 backgroundImage: 'url(/src/assets/images/mapButton.jpg)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
                }}
            fullWidth
            //component="label"
            //role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<PlaceIcon />}
            onClick={() => window.open('https://www.google.com/maps', '_blank')}
         >
            Google Maps
          </Button>
    
    
       
     
       </div>
    
    
         </div>
        
        
    
        </div>
    
        <div className="report_component_for_revaluation__container2">
    
        <div className="report_component_for_revaluation__container2__description">
        <TextField
              //? This text field has "A form field should have an id or name attribute" in the console
              sx={{backgroundColor: 'white'}}
              autoComplete="off"
              id="description-process-report"
              label="Описание"
              multiline
              rows={10}
              name="description" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
              required
              fullWidth
              color="success"
              margin="dense"
              error={errorRevaluateForm.description}
              value={reportForm.description}
              onChange={(e) => handleInput(e.target.name, e.target.value)} 
            />
        </div>
    
        <div className="report_component_for_revaluation__container2__box3"> 
        <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="firstName-process-report"
         label="Име на подател"
         name="firstName" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.firstName}
         disabled={true}
       />
    
    <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="lastName-process-report"
         label="Фамилия на подател"
         name="lastName" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.lastName}
         disabled={true}
       />
    
    <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="phoneNumber-process-report"
         label="Моб. номер на подател"
         name="phoneNumber" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.phoneNumber}
         disabled={true} 
       />
    
    <TextField
         sx={{backgroundColor: 'white'}}
         autoComplete="off"
         id="userNames-process-report"
         label="Служител"
         name="userNames" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
         fullWidth
         color="success"
         margin="dense"
         value={reportForm.userNames}
         InputProps={{readOnly: true}}
       />
    
        </div>
    
        
        </div>
    
    
        <div className="report_component_for_revaluation__buttons-container">
          <button type="button" className="report_component_for_revaluation__buttons-container__revaluate" disabled={isRequestSent} onClick={onPressRevaluate}>{"Актуализирай"}</button>
          <button type="button" className="report_component_for_revaluation__buttons-container__terminate" disabled={isRequestSent} onClick={onPressTerminate}>{"Прекрати"}</button>
        </div>
    
        
        </div>
      );
    }
    

  
};