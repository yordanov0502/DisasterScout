import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import "./settings_component1.scss";

export const SettingsComponent1 = ({ isLoading1, changePasswordForm, errorForm, errorMessage, handleInput, onPressChangePassword, isRequestSent, resetChangePasswordForm }) => {
 
    const [showField1, setShowField1] = useState(false); //? currentPassword
    const [showField2, setShowField2] = useState(false); //? newPassword
    const [showField3, setShowField3] = useState(false); //? confirmNewPassword

    const [isField1Focused, setIsField1Focused] = useState(false);
    const [isField2Focused, setIsField2Focused] = useState(false);
    const [isField3Focused, setIsField3Focused] = useState(false);

    const handleClickShowField1 = () => setShowField1((show) => !show);
    const handleClickShowField2 = () => setShowField2((show) => !show);
    const handleClickShowField3 = () => setShowField3((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleFocus = (field) => {
      if (field === 'field1') {setIsField1Focused(true);} 
      else if (field === 'field2') {setIsField2Focused(true);}
      else if (field === 'field3') {setIsField3Focused(true);}
    };
  
    const handleBlur = (field) => {
      if (field === 'field1') {setIsField1Focused(false);} 
      else if (field === 'field2') {setIsField2Focused(false);}
      else if (field === 'field3') {setIsField3Focused(false);}
    };

    if(isLoading1)
    {
    return (
      <div className="settings_component1">
        <div className="settings_component1__loader-box">
          <ComponentLoader />
        </div>
      </div>
    );
    }

  return (
    //! noValidate removes default HTML5 validation for empty fields
    <form noValidate className="settings_component1" onSubmit={onPressChangePassword}>

      <div className="settings_component1__title">Задаване на нова парола</div>

      <div className="settings_component1__box">

      <FormControl 
      required
      fullWidth
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.currentPassword}
      >
          <InputLabel htmlFor="current-password">Текуща парола</InputLabel>
          <OutlinedInput
            name="currentPassword" //! MUST MATCH WITH THE RELATED KEY FROM ChangePasswordForm
            value={changePasswordForm.currentPassword}
            onChange={handleInput}
            id="current-password"
            autoComplete="off"
            type={showField1 ? 'text' : 'password'}
            onFocus={() => handleFocus('field1')}
            onBlur={() => handleBlur('field1')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color={errorForm.currentPassword ? "error" : (!isField1Focused ? "default" : "success")}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowField1}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showField1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Текуща парола"
          />
      </FormControl>

      <FormControl 
      required
      fullWidth
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.newPassword}
      >
          <InputLabel htmlFor="new-password">Нова парола</InputLabel>
          <OutlinedInput
            name="newPassword" //! MUST MATCH WITH THE RELATED KEY FROM ChangePasswordForm
            value={changePasswordForm.newPassword}
            onChange={handleInput}
            id="new-password"
            autoComplete="off"
            type={showField2 ? 'text' : 'password'}
            onFocus={() => handleFocus('field2')}
            onBlur={() => handleBlur('field2')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color={errorForm.newPassword ? "error" : (!isField2Focused ? "default" : "success")}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowField2}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showField2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Нова парола"
          />
      </FormControl>

      <FormControl 
      required
      fullWidth
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.confirmNewPassword}
      >
          <InputLabel htmlFor="confirm-new-password">Потвърди</InputLabel>
          <OutlinedInput
            name="confirmNewPassword" //! MUST MATCH WITH THE RELATED KEY FROM ChangePasswordForm
            value={changePasswordForm.confirmNewPassword}
            onChange={handleInput}
            id="confirm-new-password"
            autoComplete="off"
            type={showField3 ? 'text' : 'password'}
            onFocus={() => handleFocus('field3')}
            onBlur={() => handleBlur('field3')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color={errorForm.confirmNewPassword ? "error" : (!isField3Focused ? "default" : "success")}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowField3}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showField3 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Потвърди"
          />
      </FormControl>

      </div>

      <div className="settings_component1__error-message">{errorMessage}</div>

      <div className="settings_component1__buttons-container">
      <button type="submit" className="settings_component1__buttons-container__submit" disabled={isRequestSent}>Актуализирай</button>
      <button type="button" className="settings_component1__buttons-container__clear" onClick={resetChangePasswordForm}>Изчисти</button>
      </div>

    </form>
  );
};
