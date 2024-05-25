import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Popper, TextField } from "@mui/material";
import { getAllZones, getBadgeOfZone } from "../../../services/zoneService";
import "./new_dispatcher_component.scss";

//? Global variable to act as storage for already loaded local images (zone badges)
const loadedImages = {};

export const NewDispatcherComponent = ({ isUserContextLoading,
                                        dispatcherForm,
                                        handleInput,
                                        errorMessage,
                                        errorForm,
                                        comboBoxKey, 
                                        comboBoxError, 
                                        setComboBoxError,
                                        setSelectedZoneId,
                                        setErrorMessage,
                                        isRequestSent,
                                        onPressAddDispatcher
                                       }) => {
 
  const [showPassword, setShowPassword] = useState(false); //? password field
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleMouseDownPassword = (event) => {event.preventDefault();};
  const handleFocus = () => {setIsPasswordFocused(true);};
  const handleBlur = () => {setIsPasswordFocused(false);};
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  if(isUserContextLoading) {return;}
  
  return (
    //! noValidate removes default HTML5 validation for empty fields
    <form noValidate className="new_dispatcher_component" onSubmit={onPressAddDispatcher}>

      <div className="new_dispatcher_component__title">Добавяне на нов диспечер</div>

      <div className="new_dispatcher_component__box">

      <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="off"
          name="id" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
          required
          fullWidth
          label="ЕГН"
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.id}
          value={dispatcherForm.id}
          onChange={handleInput}
        />

        <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="on"
          name="firstName" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
          required
          fullWidth
          label="Име"
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.firstName}
          value={dispatcherForm.firstName}
          onChange={handleInput}
        />

        <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="on"
          name="lastName" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
          required
          fullWidth
          label="Фамилия"
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.lastName}
          value={dispatcherForm.lastName}
          onChange={handleInput}
        />

        <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="on"
          name="email" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
          required
          fullWidth
          label="Имейл адрес"
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.email}
          value={dispatcherForm.email}
          onChange={handleInput}
        />

        <TextField
          sx={{backgroundColor: 'white'}}
          autoComplete="on"
          name="username" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
          required
          fullWidth
          label="Потребителско име"
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.username}
          value={dispatcherForm.username}
          onChange={handleInput}
        />

        <FormControl
          sx={{backgroundColor: 'white'}}
          required
          fullWidth
          variant="outlined"
          color="success"
          margin="dense"
          error={errorForm.password}
        >
          <InputLabel htmlFor="dispatcher-password">Парола</InputLabel>
          <OutlinedInput
            name="password" //! MUST MATCH WITH THE RELATED KEY FROM dispatcherForm
            value={dispatcherForm.password}
            onChange={handleInput}
            id="dispatcher-password"
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            onFocus={() => handleFocus()}
            onBlur={() => handleBlur()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color={
                    errorForm.password
                      ? "error"
                      : !isPasswordFocused
                      ? "default"
                      : "success"
                  }
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Парола"
          />
        </FormControl>

        <div className="new_dispatcher_component__box__combobox">
          <Autocomplete
            key={comboBoxKey} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the CmsDispatchersPage
            disablePortal
            noOptionsText={"Няма такава опция"}
            id="combo-box-zones-add-dispatcher"
            options={getAllZones()}
            sx={{
              marginTop: "8px",
              backgroundColor: 'white',
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true']":
              {backgroundColor: "#b5ffcc !important"}
             }}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, selectedOption) =>
              option.zoneId === selectedOption.zoneId
            }
            onChange={(event, selectedOption) => {
              setSelectedZoneId(selectedOption ? selectedOption.zoneId : null);
              setErrorMessage("");
              setComboBoxError(false);
            }}
            PopperComponent={({ popperRef, style, ...props }) => (
              <Popper
                ref={popperRef}
                style={{ ...style, maxHeight: "270px" }}
                placement="top-start"
                {...props}
              />
            )}
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
            renderInput={(params) => (
              <TextField
                required
                color="success"
                error={comboBoxError}
                {...params}
                label="Област"
              />
            )}
          />
        </div>

        

      </div>

      <div className="new_dispatcher_component__error-message">
          {errorMessage}
      </div>

      <div className="new_dispatcher_component__buttons-container">
      <button type="submit" className="new_dispatcher_component__buttons-container__submit" disabled={isRequestSent}>Добави</button>
      </div>

    </form>
  );
};
