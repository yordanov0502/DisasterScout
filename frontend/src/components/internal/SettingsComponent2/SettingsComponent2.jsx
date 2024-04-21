import { Autocomplete, TextField } from "@mui/material";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { getAllZones } from "../../../services/zoneService";
import "./settings_component2.scss";

export const SettingsComponent2 = ({ isLoading, changePasswordForm, errorForm, errorMessage, handleInput, role, onPressChangePassword, isRequestSent, resetChangePasswordForm }) => {
 
    

    if(isLoading)
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
    //! noValidate removes default HTML5 validation for empty fields
    <div className="settings_component2">

      <div className="settings_component2__title">Изчистване на кешираните данни</div>

      {role === "DISPATCHER" && (
         <div className="settings_component2__box1">
         <button className="settings_component2__box1__button1" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на моя акаунт</button>
         <button className="settings_component2__box1__button2" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на администратора</button>
         </div>
      )} 
     
     {role === "ADMIN" && (
         <div className="settings_component2__box2">

         <button className="settings_component2__box2__button1" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на моя акаунт</button>

         {/* <hr className="settings_component2__box2__separator1"/> */}
         <div className="settings_component2__box2__username-container">
         <TextField
          name="username" //! MUST MATCH WITH THE RELATED KEY FROM AccountForm
          required
          fullWidth
          label="Потребителско име"
          variant="outlined"
          color="success"
          margin="dense"
          // error={errorForm.username}
          // value={accountForm.username}
          onChange={handleInput}
         />
         </div>
         <button className="settings_component2__box2__button2" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на диспечер</button>
         
         <button className="settings_component2__box2__button3" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на всички потребители</button>
        
         <div className="settings_component2__box2__combobox-container">
         <Autocomplete
          disablePortal
          noOptionsText={"Няма такава област"}
          id="combo-box-zones-cache"
          options={getAllZones()}
          sx={{ width: 200}}
          renderInput={(params) => <TextField color="success" {...params} label="Област" />}
        />
        </div>
        <button className="settings_component2__box2__button4" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на област</button>
        
        <button className="settings_component2__box2__button5" disabled={isRequestSent} /*onClick={}*/>Изчисти кеш паметта на всички области</button>
        

         </div>
      )} 

    </div>
  );
};
