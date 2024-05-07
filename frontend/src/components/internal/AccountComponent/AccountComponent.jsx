import { TextField } from "@mui/material";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import "./account_component.scss";

export const AccountComponent = ({ isLoading, accountForm, errorForm, errorMessage, handleInput, role, onPressUpdate, isRequestSent, resetAccountForm }) => {
 
  if(isLoading)
  {
  return (
    <div className="account_component">
      <div className="account_component__loader-box">
        <ComponentLoader />
      </div>
    </div>
  );
  }
  
  return (
    //! noValidate removes default HTML5 validation for empty fields
    <form noValidate className="account_component" onSubmit={onPressUpdate}>

      <div className="account_component__title">Информация за акаунта</div>

      <div className="account_component__box">

      <TextField
      sx={{backgroundColor: 'white'}}
      autoComplete="on"
      name="firstName" //! MUST MATCH WITH THE RELATED KEY FROM AccountForm
      required
      fullWidth
      label="Име"
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.firstName}
      value={accountForm.firstName}
      onChange={handleInput}
      />

      <TextField
      sx={{backgroundColor: 'white'}}
      autoComplete="on"
      name="lastName" //! MUST MATCH WITH THE RELATED KEY FROM AccountForm
      required
      fullWidth
      label="Фамилия"
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.lastName}
      value={accountForm.lastName}
      onChange={handleInput}
      />

      <TextField
      sx={{backgroundColor: 'white'}}
      autoComplete="on"
      name="email" //! MUST MATCH WITH THE RELATED KEY FROM AccountForm
      required
      fullWidth
      label="Имейл адрес"
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.email}
      value={accountForm.email}
      onChange={handleInput}
      />

      <TextField
      sx={{backgroundColor: 'white'}}
      autoComplete="on"
      name="username" //! MUST MATCH WITH THE RELATED KEY FROM AccountForm
      required
      fullWidth
      label="Потребителско име"
      variant="outlined"
      color="success"
      margin="dense"
      error={errorForm.username}
      value={accountForm.username}
      onChange={handleInput}
      />

      <TextField
      sx={{backgroundColor: 'white'}}
      fullWidth
      label="Роля"
      variant="outlined"
      color="success"
      margin="dense"
      value={role === "ADMIN" ? "администратор" : "диспечер"}
      //disabled
      InputProps={{readOnly: true}}
      />

      </div>

      <div className="account_component__error-message">{errorMessage}</div>

      <div className="account_component__buttons-container">
      <button type="submit" className="account_component__buttons-container__submit" disabled={isRequestSent}>Актуализирай</button>
      <button type="button" className="account_component__buttons-container__clear" onClick={resetAccountForm}>Изчисти</button>
      </div>

    </form>
  );
};
