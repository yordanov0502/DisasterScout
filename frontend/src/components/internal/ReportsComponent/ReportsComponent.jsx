import { useEffect } from "react";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { ReportCard } from "../ReportCard";
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, Box, FormLabel, Pagination, TextField } from "@mui/material";
import { getFullZoneById, getAllZones, getBadgeOfZone, getZonesByIds } from "../../../services/zoneService";
import { getAllCategories, getAllIssuesByCategory, getFullCategoryObjectByCategory, getFullIssueObjectByIssue } from "../../../services/reportService";
import "./reports_component.scss";


const GreyRadio = styled(Radio)({
  '&.Mui-checked': {
    color: 'grey',
  },
});

const CamouflageRadio = styled(Radio)({
  '&.Mui-checked': {
    color: '#717a40',
  },
});

const YellowRadio = styled(Radio)({
  '&.Mui-checked': {
    color: '#dbdb02',
  },
});

//? Global variable to act as storage for already loaded local images (zone badges)
const loadedImages = {};

export const ReportsComponent = ({
                                 authenticatedUser,
                                 status,
                                 isLoadingComponent,
                                 handlePageChange,
                                 pageNumber,
                                 handleStateChange,
                                 state,
                                 handleSeverityTypeChange,
                                 severityType,
                                 handleSelectedZoneChange,
                                 selectedZoneId,
                                 handleCategoryChange,
                                 handleIssueChange,
                                 issue,
                                 category,
                                 pages,
                                 rows,
                                }) => {

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

    if(isLoadingComponent)
    {
    return (
      <div className="reports_component">
        <div className="reports_component__loader-box">
          <ComponentLoader />
        </div>
      </div>
    );
    }    

  return (
    <div className="reports_component">

    <div className="reports_component__header">
     
    <div className="reports_component__header__state-filter">
    <FormControl sx={{mb: 6, top: 23}}>
    <FormLabel id="reports-row-radio-buttons-group1-label" sx={{color: 'black !important'}}>Статус</FormLabel>
      <RadioGroup
        id="reports-buttons-radio-group1"
        aria-labelledby="reports-row-radio-buttons-group1-label"
        name="reports-row-radio-buttons-group1"
        value={state}
        onChange={(event) => handleStateChange(event.target.value)}
      >
        <FormControlLabel value="PENDING" control={<Radio color="warning" />} label="Изчакващи" />
        <FormControlLabel value="FOR_REVALUATION" control={<Radio color="primary" />} label="За преоценка" />
        <FormControlLabel value="FRESH" control={<Radio color="success"/>} label="Активни" />
        <FormControlLabel value="INACTIVE" control={<GreyRadio />} label="Изтекли" />
      </RadioGroup>
    </FormControl>
    </div>

    <div className="reports_component__header__severity-filter">
    <FormControl sx={{mb: 6, top: 23}}>
    <FormLabel id="reports-row-radio-buttons-group2-label" sx={{color: 'black !important'}}>Ниво на опасност</FormLabel>
      <RadioGroup
        id="reports-buttons-radio-group2"
        aria-labelledby="reports-row-radio-buttons-group2-label"
        name="reports-row-radio-buttons-group2"
        value={severityType}
        onChange={(event) => handleSeverityTypeChange(event.target.value)}
      >
        <FormControlLabel value="ALL" control={<GreyRadio />} label="Всички" />
        <FormControlLabel value="CRITICAL" control={<CamouflageRadio />} label="Критично" />
        <FormControlLabel value="HIGH" control={<Radio color="error"/>} label="Високо" />
        <FormControlLabel value="MEDIUM" control={<Radio color="warning" />} label="Средно" />
        <FormControlLabel value="LOW" control={<YellowRadio/>} label="Ниско" />
      </RadioGroup>
    </FormControl>
    </div>

    
    <div className="reports_component__header__comboboxes">
    
    <div className="reports_component__header__comboboxes__zone-filter">
    <Autocomplete
          key={201} //? THIS KEY SHOULD NEVER EVER CHANGE AS THE COMBOBOX SHOULD ALWAYS HAVE SELECTED OPTION (When the key changes the comboBox selection is cleared. )
          id="combo-box-zones-search-reports-cms"
          sx={{
            pb: 2,
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
            {backgroundColor: "#b5ffcc !important"}
           }}
          disableClearable={true}
          options={authenticatedUser.role === "ADMIN" ? getAllZones() : getZonesByIds(authenticatedUser.availableZoneIds)}
          disablePortal 
          value={getFullZoneById(selectedZoneId)}
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.zoneId === selectedOption.zoneId}
          onChange={(event, selectedOption) => 
            {
              handleSelectedZoneChange(selectedOption.zoneId);
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
    </div>

    <div className="reports_component__header__comboboxes__category-filter">
    <Autocomplete
          key={202} //? THIS KEY SHOULD NEVER EVER CHANGE AS THE COMBOBOX SHOULD ALWAYS HAVE SELECTED OPTION (When the key changes the comboBox selection is cleared. )
          id="combo-box-categories-search-reports-cms"
          sx={{
            pb: 2,
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
            {backgroundColor: "#b5ffcc !important"}
           }}
          disableClearable={true}
          options={getAllCategories()}
          disablePortal
          value={getFullCategoryObjectByCategory(category)}
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.category === selectedOption.category}
          onChange={(event, selectedOption) => 
            {
              handleCategoryChange(selectedOption.category)
            }}
          renderInput={
            (params) => 
            <TextField
            sx={{backgroundColor: 'white'}}
            required
            color="success"
            {...params} 
            label="Категория" />}
        />
    </div>

    <div className="reports_component__header__comboboxes__issue-filter">
    <Autocomplete
          key={203} //? THIS KEY SHOULD NEVER EVER CHANGE AS THE COMBOBOX SHOULD ALWAYS HAVE SELECTED OPTION (When the key changes the comboBox selection is cleared. )
          id="combo-box-issues-search-reports-cms"
          sx={{
            pb: 2,
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
            {backgroundColor: "#b5ffcc !important"}
           }}
          disableClearable={true}
          options={getAllIssuesByCategory(category)}
          disablePortal 
          value={getFullIssueObjectByIssue(issue)}
          noOptionsText={"Няма такава опция"}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.issue === selectedOption.issue}
          onChange={(event, selectedOption) => 
            {
              handleIssueChange(selectedOption.issue)
            }}
          renderInput={
            (params) => 
            <TextField
            sx={{backgroundColor: 'white'}}
            required
            color="success"
            {...params} 
            label="Бедствие / Авария" />}
        />
    </div>

   

    </div>
    

    </div>

    <div className="reports_component__card-container">
          {
            status !== 'error' && rows.length > 0 ?
            (
              rows.map((row) => (
              <ReportCard 
               key={row.id}  //? key is used by React, not passed as a prop
               row={row}
              />  
              ))
            ) 
            : ( <div style={{ fontSize: '24px' }}> Няма информация</div>) 
          }
    </div>

    <div className="reports_component__footer">
    <Pagination page={pageNumber} count={pages} onChange={handlePageChange} size="large" color="success" shape="rounded"  />
    </div>

    </div>
  );
};