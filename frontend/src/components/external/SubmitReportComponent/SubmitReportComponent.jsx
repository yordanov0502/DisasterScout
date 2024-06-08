import { useEffect } from "react";
import { Autocomplete, Box, Button, IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { CloudUpload, } from "@mui/icons-material";
import PlaceIcon from '@mui/icons-material/Place';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SendIcon from '@mui/icons-material/Send';
import BlockIcon from '@mui/icons-material/Block';
import { getAllAreasOfZoneForSubmitReport, getAllZones, getBadgeOfZone } from "../../../services/zoneService";
import { getAllSeverities } from "../../../services/severityService";
import { getAllIssues, getExpectedDurationHours } from "../../../services/reportService";
import "./submit_report_component.scss";

//? Global variable to act as storage for already loaded local images (zone badges)
const loadedImages = {};

export const SubmitReportComponent = ({ reportForm, 
                                        errorForm, 
                                        errorMessage, 
                                        handleInput, 
                                        setImageForUpload,
                                        onPressSubmit,
                                        isRequestSent,
                                        comboBoxKeys,
                                        imageChosenSuccessfully
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

    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
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

    

  return (
    //! noValidate removes default HTML5 validation for empty fields
  <form noValidate className="submit_report_component" onSubmit={onPressSubmit}>

    <div className="submit_report_component__title">Докладвай природно бедствие / авария</div>

    <div className="submit_report_component__container1">
    
        <div className="submit_report_component__container1__image">
            <Button sx={{height: '188px', 
                    //mb: 2.02,
                    backgroundImage: imageChosenSuccessfully === false ? 'none' : 'url(/src/assets/images/imageButton.jpg)',
                    backgroundColor: imageChosenSuccessfully === false ? 'red !important' : 'transparent',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  fullWidth
                  component="label"
                  //role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  //? when image is added successfully replace icon with this: DoneOutlineIcon
                  //? chnage text to добавено изображение
                  startIcon={ imageChosenSuccessfully === true ? <DoneOutlineIcon />  : 
                            (imageChosenSuccessfully === false ? <BlockIcon /> : <CloudUpload /> ) }
            >
                  {imageChosenSuccessfully === true || imageChosenSuccessfully === false ? "" : "Добави изображение"}
                  <VisuallyHiddenInput 
                  id="vhi-submit-report" 
                  type="file"
                  onChange={(e) => setImageForUpload(e.target.files[0])}
                  multiple={false} //? No multiple file selection allowed
                  />
            </Button>
        </div>
    
      <div className="submit_report_component__container1__wrapper1">
    
        <div className="report_component_fresh__container1__wrapper1__box1">
    
    
        <Autocomplete
          key={comboBoxKeys.key1} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the SubmitReportPage
          id="combo-box-issues-submit-report"
          sx={{
            pb: 1.5,
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
            {backgroundColor: "#b5ffcc !important"}
           }}
          options={getAllIssues().sort((a, b) => b.category.localeCompare(a.category))}
          groupBy={(option) => option.category}
          disablePortal
          //! Uncomment when ready and test on mobile phone   fullWidth 
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.issue === selectedOption.issue}
          onChange={(event, selectedOption) => 
            { 
              handleInput('issue', selectedOption ? selectedOption.issue : "");
            }}
          renderInput={
            (params) => 
            <TextField
            sx={{backgroundColor: 'white'}}
            required
            color="success"
            error={errorForm.issue}
            {...params} 
            label="Категория" />}
            renderGroup={(params) => (
              <li key={params.key}>
                <IssueGroupHeader>{params.group}</IssueGroupHeader>
                <IssueGroupItems>{params.children}</IssueGroupItems>
              </li>
            )}
        />
        <Autocomplete
          key={comboBoxKeys.key2} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the SubmitReportPage
          id="combo-box-severities-submit-report"
          sx={{pb: 1.5}} 
          options={getAllSeverities()}
          disablePortal
        //! Uncomment when ready and test on mobile phone   fullWidth 
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.type === selectedOption.type}
          onChange={(event, selectedOption) => 
            {
              handleInput('severity', selectedOption ? selectedOption.type : "");
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
            error={errorForm.severity}
            {...params} 
            label="Ниво на опасност" />}
        />

        <Autocomplete
          key={comboBoxKeys.key3} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the SubmitReportPage
          id="combo-box-duration-submit-report"
          sx={{
            pb: 3,
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
            {backgroundColor: "#b5ffcc !important"}
           }}
          options={getExpectedDurationHours()}
          disablePortal
        //! Uncomment when ready and test on mobile phone   fullWidth 
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.hours === selectedOption.hours}
          onChange={(event, selectedOption) => 
            {
              handleInput('expectedDuration', selectedOption ? selectedOption.hours : "");
            }}
          renderInput={
            (params) => 
            <TextField
            sx={{backgroundColor: 'white'}}
            required
            color="success"
            error={errorForm.expectedDuration}
            {...params} 
            label="Времетраене" />}
        />

        
       
     
        </div>
    
        <div className="report_component_fresh__container1__wrapper1__box2">
    
     
          <Autocomplete
            key={comboBoxKeys.key4} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the SubmitReportPage
            id="combo-box-zones-submit-report"
            sx={{
              pb: 1.5,
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
              {backgroundColor: "#b5ffcc !important"}
            }}
            options={getAllZones()}
            disablePortal
            //! Uncomment when ready and test on mobile phone   fullWidth 
            noOptionsText={"Няма такава опция"}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, selectedOption) => option.zoneId === selectedOption.zoneId}
            onChange={(event, selectedOption) => 
              {
                handleInput('zone', selectedOption ? selectedOption.zoneId : "");
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
              error={errorForm.zone}
              {...params} 
              label="Област" />}
          />
          <Autocomplete
            key={comboBoxKeys.key5} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the SubmitReportPage
            id="combo-box-areas-submit-report"
            sx={{
              pb:0.5,
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
              {backgroundColor: "#b5ffcc !important"}
            }}
            options={getAllAreasOfZoneForSubmitReport(reportForm.zone)}
            disablePortal
            disableClearable={true}
          //! Uncomment when ready and test on mobile phone   fullWidth 
            noOptionsText={"Моля изберете област"}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, selectedOption) => option === selectedOption}
            value={reportForm.area}
            onChange={(event, selectedOption) => 
              {
                handleInput('area', selectedOption ? selectedOption : "");
              }}
            renderInput={
              (params) => 
              <TextField
              sx={{backgroundColor: 'white'}}
              required
              color="success"
              error={errorForm.area}
              {...params} 
              label="Район" />}
          />
          <TextField
            sx={{backgroundColor: 'white', mb: 2.75}}
            autoComplete="off"
            id="address-submit-report"
            label="Адрес"
            name="address" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
            fullWidth
            color="success"
            margin="dense"
            error={errorForm.address}
            value={reportForm.address}
            onChange={(e) => handleInput(e.target.name, e.target.value)} 
          />
            
       </div>
    
    
      </div>
        
        
    
    </div>











    <div className="submit_report_component__container2">
    
      <div className="submit_report_component__container2__description">
      <TextField
          //? This text field has "A form field should have an id or name attribute" in the console
          sx={{backgroundColor: 'white'}}
          autoComplete="off"
          id="description-submit-report"
          label="Описание"
          multiline
          rows={10}
          name="description" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          color="success"
          margin="dense"
          error={errorForm.description}
          value={reportForm.description}
          onChange={(e) => handleInput(e.target.name, e.target.value)} 
        />
      </div>

                
      <div className="submit_report_component__container2__box3"> 

        <TextField
          sx={{
            backgroundColor: 'white',
            '& .MuiInputLabel-root': {
              fontSize: '14.5px',
              top: '3px'
            }
          }}
          autoComplete="off"
          id="location-submit-report"
          label="Линк локация / координати"
          name="locationUrl" // MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          color="success"
          margin="dense"
          error={errorForm.locationUrl}
          value={reportForm.locationUrl}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
            <IconButton
              disableRipple={true}
              type="button"
              sx={{ 
                p: '16px',
                left: '14px',
                backgroundColor: 'white !important',
                borderRadius: '0 4px 4px 0', 
                backgroundImage: 'url(/src/assets/images/mapButton.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
              }}
              aria-label="open-google-maps"
              onClick={() => window.open('https://www.google.com/maps', '_blank')}
            >
              <PlaceIcon sx={{color: 'white', opacity: 0}} />
            </IconButton>
          </InputAdornment>
            ),
          }}
            />

        <TextField
          sx={{backgroundColor: 'white', mb: 0.7}}
          autoComplete="off"
          id="firstname-submit-report"
          label="Име"
          name="firstName" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          color="success"
          margin="dense"
          error={errorForm.firstName}
          value={reportForm.firstName}
          onChange={(e) => handleInput(e.target.name, e.target.value)} 
        />

         <TextField
          sx={{backgroundColor: 'white', mb:0.6}}
          autoComplete="off"
          id="lastname-submit-report"
          label="Фамилия"
          name="lastName" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          color="success"
          margin="dense"
          error={errorForm.lastName}
          value={reportForm.lastName}
          onChange={(e) => handleInput(e.target.name, e.target.value)} 
        />

         <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="off"
          id="phone-submit-report"
          label="Моб. номер"
          name="phoneNumber" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          color="success"
          margin="dense"
          error={errorForm.phoneNumber}
          value={reportForm.phoneNumber}
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
      </div>

    </div>



      {errorMessage && <div className="submit_report_component__error-message">{errorMessage}</div>}
      

      <div className="submit_report_component__buttons-container">
      <Button 
        type="submit"
        disabled={isRequestSent}
        sx={{height: '50px', width: '150px', backgroundColor: '#009F58 !important'}}
        variant="contained" endIcon={<SendIcon />}>
        Изпрати
      </Button>
      </div>

    </form>
  );
};