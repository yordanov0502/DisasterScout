// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import RestoreIcon from '@mui/icons-material/Restore';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import './navbar.scss'; 


export const Navbar = ({isOpen, toggleSidebar}) => {

  //   const location = useLocation();
  //   const [activeButton, setActiveButton] = useState(null);
  //   const navigate = useNavigate();
    
  // const handleButtonClick = (buttonId) => {
  //   setActiveButton(buttonId);
  // };

  



  return (
      <div className="navbar">
        <div className="logo-navbar">
          {/* <i className="icon-navbar"/> */}
          {/* <i id="navbar_burger" onClick={toggleSidebar}>{isOpen ? <MenuOpenIcon fontSize="large"/> : <MenuIcon fontSize="large"/>}</i> */}
        </div>
        <ul className="navbar-list">
          
          
        {/* <li className={activeButton === 'cms-dashboard' ? 'active' : ''} onClick={() => handleButtonClick('cms-dashboard')}>
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
        <Link to={"/cms-account"}>
            <i><PersonIcon/></i>
            <span className="links_name">Акаунт</span>
            <span className="tooltip">Акаунт</span>
        </Link>
        </li>
        <li className={activeButton === 'cms-settings' ? 'active' : ''} onClick={() => handleButtonClick('cms-settings')}>
        <Link to={"/cms-settings"}>
            <i><SettingsIcon/></i>
            <span className="links_name">Настройки</span>
            <span className="tooltip">Настройки</span>
        </Link>
        </li>

{ authenticatedUser.role === "ADMIN" && (
  <>
        <li className={activeButton === 'cms-dispatchers' ? 'active' : ''} onClick={() => handleButtonClick('cms-dispatchers')}>
          <Link to={"/cms-dispatchers"}>
            <i className="dispatcherss"><GroupsIcon/></i>
            <span className="links_name" id="dispatcherss-link_name">Диспечери</span>
            <span className="tooltip" id="dispatcherss-tooltip">Диспечери</span>
          </Link>
        </li>
        <li className={activeButton === 'cms-logger' ? 'active' : ''} onClick={() => handleButtonClick('cms-logger')}>
        <Link to={"/cms-logger"}>
            <i className="loggerr"><AutoStoriesIcon/></i>
            <span className="links_name" id="loggerr-link_name">Логър</span>
            <span className="tooltip" id="loggerr-tooltip">Логър</span>
        </Link>
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
        </li> */}

       
        </ul>
      </div>
  );
};
