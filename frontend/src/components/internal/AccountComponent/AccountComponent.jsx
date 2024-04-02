import { useEffect, useState } from "react";
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { TextField } from "@mui/material";
import { useUserContext } from "../../../hooks/useUserContext";
import "./account_component.scss";

export const AccountComponent = () => {
  const { authenticatedUser, isUserContextEmpty } = useUserContext();
  const [isLoading, setIsLoading] = useState(true); //? isLoading is based whether UserContext is empty or not

  useEffect(() => {
    setIsLoading(isUserContextEmpty());
  }, [isUserContextEmpty]);

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
      defaultValue={authenticatedUser.lastName}
      error
      />

      <TextField
      fullWidth
      label="Имейл адрес"
      variant="outlined"
      color="success"
      margin="dense"
      /*focused*/
      defaultValue={authenticatedUser.email}
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
      defaultValue={authenticatedUser.username}
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
      defaultValue={authenticatedUser.role === "ADMIN" ? "администратор" : "диспечер"}
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
