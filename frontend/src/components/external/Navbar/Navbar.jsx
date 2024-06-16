import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useResponsiveContext } from "../../../hooks/useResponsiveContext";
import './navbar.css';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isTouchScreen } = useResponsiveContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="navbar">

      {
        isTouchScreen && location.pathname !== "/" &&
        <>
        <div className="navbar-text1">Disasster</div> <div className="navbar-text2">Scout</div>
        </>
      }
      
      <div className="navbar-burger-button" onClick={toggleSidebar}>
        {isSidebarOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </div>

      {isSidebarOpen && <div className="navbar-close-button" onClick={toggleSidebar}><CloseIcon fontSize="large" /></div>}

      <ul className={`navbar-list ${isSidebarOpen ? 'open' : ''}`}>


        <li>
          <Button variant="contained" 
            id="nav-button-submit-report"
            sx={{
              width: '130px',
              top: "-14px",
              height: "55px",
              backgroundColor: location.pathname.includes("/submit-report") ? '#E50000' : '#009F58',
              boxShadow: 'none',
              fontSize: '17px',
              '&:hover': {
                  backgroundColor: location.pathname.includes("/submit-report") ? 'rgb(180, 0, 0)' : '#02b062',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                },
              }}
              onClick={() => handleNavigation("/submit-report")}
            >
              Докладвай
          </Button>
        </li>


        <li>
          <Button variant="contained" 
            id="nav-button-search-reports"
            sx={{
              width: '130px',
              top: "-14px",
              height: "55px",
              backgroundColor: location.pathname.includes("/search-reports") ? '#E50000' : '#009F58',
              boxShadow: 'none',
              fontSize: '17px',
              '&:hover': {
                  backgroundColor: location.pathname.includes("/search-reports") ? 'rgb(180, 0, 0)' : '#02b062',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                },
              }}
              onClick={() => handleNavigation("/search-reports")}
            >
              Търси
          </Button>
        </li>


        <li>
          {isSidebarOpen ? (<div className="logo-navbar2" onClick={() => handleNavigation("/")}></div>) 
                         : (<div className="logo-navbar1" onClick={() => handleNavigation("/")}></div>)}
        </li>


        <li>
          <Button variant="contained" 
            id="nav-button-categories"
            sx={{
              width: '130px',
              top: "-14px",
              height: "55px",
              backgroundColor: location.pathname.includes("/categories") ? '#E50000' : '#009F58',
              boxShadow: 'none',
              fontSize: '17px',
              '&:hover': {
                  backgroundColor: location.pathname.includes("/categories") ? 'rgb(180, 0, 0)' : '#02b062',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                },
              }}
              onClick={() => handleNavigation("/categories")}
            >
              Категории
          </Button>
        </li>


        <li>
          <Button variant="contained" 
            id="nav-button-zones"
            sx={{
              width: '130px',
              top: "-14px",
              height: "55px",
              backgroundColor: location.pathname.includes("/zones") ? '#E50000' : '#009F58',
              boxShadow: 'none',
              fontSize: '17px',
              '&:hover': {
                  backgroundColor: location.pathname.includes("/zones") ? 'rgb(180, 0, 0)' : '#02b062',
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                },
              }}
              onClick={() => handleNavigation("/zones")}
            >
              Области
          </Button>
        </li>


      </ul>
    </div>
  );
};