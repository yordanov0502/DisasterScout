import { TextField } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import { mapIdsToZones } from "../../../services/zoneService";
import "./account_component.scss";

export const AccountComponent = () => {

    const { authenticatedUser } = useUserContext();
        

      /* {testQuery.isError && display a message with a snack bar}  MUST BE PUT INSIDE THE <div> in the return*/
  return (
    <div className="account_component">

      <div className="account_component__title">Информация за акаунта</div>

      <div className="account_component__box">

     
      <TextField 
      fullWidth
      label="Име" 
      variant="outlined" 
      color="success" 
      /*focused*/ 
      margin="dense" 
      //helperText="Incorrect entry." 
      defaultValue={authenticatedUser.firstName}
      error
      />
      
      
      <TextField 
      fullWidth
      label="Фамилия" 
      variant="outlined" 
      color="success" 
      margin="dense" 
      /*focused*/
      error
      />
      
     
      <TextField 
      fullWidth
      label="Имейл адрес" 
      variant="outlined" 
      color="success" 
      margin="dense" 
      /*focused*/ 
      error
      />
      
      
      <TextField 
      fullWidth
      label="Потребителско име" 
      variant="outlined" 
      color="success" 
      margin="dense" 
      /*focused*/  
      error
      onChange={(event) => {
        setName(event.target.value);
      }}  
      />
      
     
      <TextField 
      fullWidth
      label="Роля" 
      variant="outlined" 
      color="success" 
      margin="dense" 
      /*focused*/
      />
     
      
      </div>

      <div className="account_component__error-message">оаяоаяоаоя</div>

      <div className="account_component__buttons-container">
      <button type="submit" className="account_component__buttons-container__submit" /*disabled={isRequestSent}*/>Актуализирай</button>
      <button type="submit" className="account_component__buttons-container__clear" /*disabled={isRequestSent}*/>Изчисти</button>
      </div>

    </div>
  );
};
