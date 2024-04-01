import { useUserContext } from "../../../hooks/useUserContext";
import { mapIdsToZones } from "../../../services/zoneService";
import "./cms_account_page.scss";

export const CmsAccountPage = () => {

    const { authenticatedUser } = useUserContext();
        

      /* {testQuery.isError && display a message with a snack bar}  MUST BE PUT INSIDE THE <div> in the return*/
  return (
    <div className="cms_account_page">
      <div className="cms_account_page__box">
      <div className="cms_account_page__box__separator"/>
      <div className="cms_account_page__box__content">
    
      <span className="account_label"><u>Име:</u></span> <b><i>{authenticatedUser.firstName}</i></b><br/><br/>
      <span className="account_label"><u>Фамилия:</u></span> <b><i>{authenticatedUser.lastName}</i></b><br/><br/>
      <span className="account_label"><u>Имейл:</u></span> <b><i>{authenticatedUser.email}</i></b><br/><br/>
      <span className="account_label"><u>Потребителско име:</u></span> <b><i>{authenticatedUser.username}</i></b><br/><br/>
      <span className="account_label"><u>Роля:</u></span> <b><i>{`${authenticatedUser.role === "ADMIN" ? "администратор" : "диспечер"}`}</i></b><br/><br/>
      <span className="account_label"><u>Достъпни области:</u></span> <b><i>{authenticatedUser.role === "ADMIN" ? "всички" : (authenticatedUser.availableZoneIds && authenticatedUser.availableZoneIds.length > 0 ? mapIdsToZones(authenticatedUser.availableZoneIds) : 'няма')}</i></b>
  
      </div>
                         
      </div>
    </div>
  );
};
