import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popper,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAllZones } from "../../../../../services/zoneService";
import "./add_dispatcher_fields.scss";

export const AddDispatcherDialog = ({ open, 
                                      onAgree, 
                                      onDisagree, 
                                      dispatcherForm,
                                      handleInput,
                                      errorMessage,
                                      errorForm,
                                      comboBoxKey, 
                                      comboBoxError, 
                                      setComboBoxError,
                                      setSelectedZoneId,
                                      setErrorMessage }) => {
  
  const [showPassword, setShowPassword] = useState(false); //? password field
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleMouseDownPassword = (event) => {event.preventDefault();};
  const handleFocus = () => {setIsPasswordFocused(true);};
  const handleBlur = () => {setIsPasswordFocused(false);};
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleAgree = () => {onAgree();};
  const handleClose = () => {onDisagree();};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-dispatcher-dialog-title"
      aria-describedby="add-dispatcher-dialog-description"
      sx={{ "& .MuiDialog-paper": { width: "535px", maxWidth: "none" } }}
    >
      <DialogTitle
        id="add-dispatcher-dialog-title"
        sx={{ textAlign: "center" }}
      >
        {"Регистриране на нов диспечер"}
      </DialogTitle>

      <form noValidate className="add_dispatcher_fields">
        <TextField
          sx={{ width: "222px", marginLeft: "30px" }}
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
          sx={{ width: "222px", marginLeft: "30px" }}
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
          sx={{ width: "222px", marginLeft: "30px" }}
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
          sx={{ width: "222px", marginLeft: "30px" }}
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
          sx={{ width: "222px", marginLeft: "30px" }}
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
          sx={{ width: "222px", marginLeft: "30px" }}
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

        <div className="add_dispatcher_fields__combobox">
          <Autocomplete
            key={comboBoxKey} //? When the key changes the comboBox selection is cleared. It does change on successful mutation from the CmsDispatchersPage
            disablePortal
            noOptionsText={"Няма такава област"}
            id="combo-box-zones-cache"
            options={getAllZones()}
            sx={{ width: "222px", marginTop: "8px" }}
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

        <div className="add_dispatcher_fields__error-message">
          {errorMessage}
        </div>
      </form>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleAgree}
          color="success"
          sx={{
            backgroundColor: "#009f58",
            color: "white",
            "&:hover": { backgroundColor: "#00b463" },
          }}
        >
          Актуализирай
        </Button>
        <Button
          onClick={handleClose}
          color="error"
          sx={{
            backgroundColor: "#e50000",
            color: "white",
            width: "130px",
            "&:hover": { backgroundColor: "#ff3e3e" },
          }}
        >
          Откажи
        </Button>
      </DialogActions>
    </Dialog>
  );
};
