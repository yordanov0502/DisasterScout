import { Autocomplete, TextField } from "@mui/material";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { getAllZones } from "../../../services/zoneService";
import "./settings_component2.scss";

export const SettingsComponent2 = ({ isLoading2, 
                                     role, 
                                     isRequestSent, 
                                     onPressClearMyCache, 
                                     onPressClearAdminCache, 
                                     username, 
                                     handleUsernameInput, 
                                     usernameError, 
                                     onPressClearDispatcherCache, 
                                     onPressClearAllUsersCache, 
                                     setSelectedZoneId, 
                                     comboBoxError, 
                                     setComboBoxError, 
                                     onPressClearZoneCache, 
                                     comboBoxKey,
                                     onPressClearAllZonesCaches }) => {
 
    if(isLoading2)
    {
    return (
      <div className="settings_component2">
        <div className="settings_component2__loader-box">
          <ComponentLoader />
        </div>
      </div>
    );
    }

  return (
    <div className="settings_component2">

      <div className="settings_component2__title">Изчистване на кешираните данни</div>

      {role === "DISPATCHER" && (
         <div className="settings_component2__box1">
         <button className="settings_component2__box1__button1" disabled={isRequestSent} onClick={onPressClearMyCache}>Изчисти кеш паметта на моя акаунт</button>
         <button className="settings_component2__box1__button2" disabled={isRequestSent} onClick={onPressClearAdminCache}>Изчисти кеш паметта на администратора</button>
         </div>
      )} 
     
     {role === "ADMIN" && (
         <div className="settings_component2__box2">

         <button className="settings_component2__box2__button1" disabled={isRequestSent} onClick={onPressClearMyCache}>Изчисти кеш паметта на моя акаунт</button>

         <div className="settings_component2__box2__username-container">
         <TextField
          name="username" //! MUST MATCH WITH THE RELATED useState username from CmsSettingsPage
          required
          fullWidth
          label="Потребителско име"
          variant="outlined"
          color="success"
          margin="dense"
          error={usernameError}
          value={username}
          onChange={handleUsernameInput}
         />
         </div>
         <button className="settings_component2__box2__button2" disabled={isRequestSent} onClick={onPressClearDispatcherCache}>Изчисти кеш паметта на диспечер</button>
         
         <button className="settings_component2__box2__button3" disabled={isRequestSent} onClick={onPressClearAllUsersCache}>Изчисти кеш паметта на всички потребители</button>
        
         <div className="settings_component2__box2__combobox-container">
         <Autocomplete
          key={comboBoxKey} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the CmsSettingsPage
          disablePortal
          noOptionsText={"Няма такава област"}
          id="combo-box-zones-cache"
          options={getAllZones()}
          sx={{ width: 200}}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selectedOption) => option.zoneId === selectedOption.zoneId}
          onChange={(event, selectedOption) => 
            {setSelectedZoneId(selectedOption ? selectedOption.zoneId : null); 
             setComboBoxError(false);
            }}
          renderInput={
            (params) => 
            <TextField
            required
            color="success"
            error={comboBoxError}
            {...params} 
            label="Област" />}
        />
        </div>
        <button className="settings_component2__box2__button4" disabled={isRequestSent} onClick={onPressClearZoneCache}>Изчисти кеш паметта на област</button>
        
        <button className="settings_component2__box2__button5" disabled={isRequestSent} onClick={onPressClearAllZonesCaches}>Изчисти кеш паметта на всички области</button>
        

         </div>
      )} 

    </div>
  );
};
