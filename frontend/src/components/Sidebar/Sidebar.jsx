import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestoreIcon from '@mui/icons-material/Restore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutRequest } from "../../services/userService";
import { useIsRequestSent } from "../../hooks/useIsRequestSent";
import { useUserContext } from "../../hooks/useUserContext";
import './sidebar.css'; 

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`; 

export const Sidebar = ({isOpen, toggleSidebar}) => {

    const [activeButton, setActiveButton] = useState(null);
    const { isRequestSent, setIsRequestSent } = useIsRequestSent();
    const { clearUserContext, authenticatedUser } = useUserContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: (/*response*/) => {
    
    },
    onError: (/*error*/) => {
      
    },
    onSettled: () => {
      //? This approach ensures that even if the server fails to process the logout for some reason 
      //? (e.g., the server is down, or there's a network issue), the client application still behaves as 
      //? if the user has been logged out, which is a safe default for security reasons.
      queryClient.clear(); //! Completely clears the query cache of all queries and mutations. This method is the most drastic as it removes everything from the cache.
      clearUserContext();
      localStorage.removeItem(LOCAL_STORAGE_KEY1);
      navigate("/login");
      setIsRequestSent(false);
    }
  });

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const onPressLogout = (event) => {
    event.preventDefault();
    if(!isRequestSent){logoutMutation.mutate();}
    }


   
   
   

   
   

  return (
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-details">
          <i className="icon"/>
          <i id="sidebar_burger" onClick={toggleSidebar}>{isOpen ? <MenuOpenIcon fontSize="large"/> : <MenuIcon fontSize="large"/>}</i>
        </div>
        <ul className="nav-list">
          
        <li className={activeButton === 'cms-dashboard' ? 'active' : ''} onClick={() => handleButtonClick('cms-dashboard')}>
          <Link to={"/cms-dashboard"}>
            <i><DashboardIcon/></i>
            <span className="links_name">Табло</span>
            <span className="tooltip">Табло</span>
          </Link>
        </li>
        <li className={activeButton === 'cms-reports' ? 'active' : ''} onClick={() => handleButtonClick('cms-reports')}>
          <a>
            <i><DescriptionIcon/></i>
            <span className="links_name">Доклади</span>
            <span className="tooltip">Доклади</span>
          </a>
        </li>
        <li className={activeButton === 'cms-zones' ? 'active' : ''} onClick={() => handleButtonClick('cms-zones')}>
          <a>
            <i><LocationOnIcon/></i>
            <span className="links_name">Области</span>
            <span className="tooltip">Области</span>
          </a>
        </li>
        <li className={activeButton === 'cms-chronology' ? 'active' : ''} onClick={() => handleButtonClick('cms-chronology')}>
          <a>
            <i><RestoreIcon/></i>
            <span className="links_name">Хронология</span>
            <span className="tooltip">Хронология</span>
          </a>
        </li>
        <li className={activeButton === 'cms-account' ? 'active' : ''} onClick={() => handleButtonClick('cms-account')}>
          <a>
            <i><PersonIcon/></i>
            <span className="links_name">Акаунт</span>
            <span className="tooltip">Акаунт</span>
          </a>
        </li>
        <li className={activeButton === 'cms-settings' ? 'active' : ''} onClick={() => handleButtonClick('cms-settings')}>
          <a>
            <i><SettingsIcon/></i>
            <span className="links_name">Настройки</span>
            <span className="tooltip">Настройки</span>
          </a>
        </li>

{ authenticatedUser && authenticatedUser.role === "ADMIN" && (
  <>
        <li className={activeButton === 'cms-dispatchers' ? 'active' : ''} onClick={() => handleButtonClick('cms-dispatchers')}>
          <a>
            <i className="dispatcherss"><GroupsIcon/></i>
            <span className="links_name" id="dispatcherss-link_name">Диспечери</span>
            <span className="tooltip" id="dispatcherss-tooltip">Диспечери</span>
          </a>
        </li>
        <li className={activeButton === 'cms-logger' ? 'active' : ''} onClick={() => handleButtonClick('cms-logger')}>
          <a>
            <i className="loggerr"><AutoStoriesIcon/></i>
            <span className="links_name" id="loggerr-link_name">Логър</span>
            <span className="tooltip" id="loggerr-tooltip">Логър</span>
          </a>
        </li>
  </>
)
}
        <li onClick={onPressLogout}>
          <a>
            <i className="logout"><LogoutIcon/></i>
            <span className="links_name" id="logout-link_name">Изход</span>
            <span className="tooltip" id="logout-tooltip">Изход</span>
          </a>
        </li>

       
        </ul>
      </div>
  );
};
