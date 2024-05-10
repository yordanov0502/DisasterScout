import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { logoutRequest } from "../../../services/userService";
import { useUserContext } from "../../../hooks/useUserContext";
import "./main_speed_dial.css";

const adminButtons = [
  { icon: <DashboardIcon />, name: "Табло" },
  { icon: <DescriptionIcon />, name: "Доклади" },
  { icon: <LocationOnIcon />, name: "Области" },
  { icon: <RestoreIcon />, name: "Хронология" },
  { icon: <PersonIcon />, name: "Акаунт" },
  { icon: <SettingsIcon />, name: "Настройки" },
  { icon: <GroupsIcon />, name: "Диспечери" },
  { icon: <AutoStoriesIcon />, name: "Логър" },
  { icon: <LogoutIcon />, name: "Изход" },
];

const dispatcherButtons = [
  { icon: <DashboardIcon />, name: "Табло" },
  { icon: <DescriptionIcon />, name: "Доклади" },
  { icon: <LocationOnIcon />, name: "Области" },
  { icon: <RestoreIcon />, name: "Хронология" },
  { icon: <PersonIcon />, name: "Акаунт" },
  { icon: <SettingsIcon />, name: "Настройки" },
  { icon: <LogoutIcon />, name: "Изход" },
];

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;

export const MainSpeedDial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isRequestSent, setIsRequestSent } = useIsRequestSent();
  const { authenticatedUser, clearUserContext } = useUserContext();
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //? used for the main speed dial buttons to be automatically selected based on the current URL path
    const path = location.pathname;

    if (path.includes("/cms-dashboard")) setActiveButton("Табло");
    else if (path.includes("/cms-account")) setActiveButton("Акаунт");
    else if (path.includes("/cms-settings")) setActiveButton("Настройки");
    else if (path.includes("/cms-dispatchers")) setActiveButton("Диспечери");
    else if (path.includes("/cms-logger")) setActiveButton("Логър");
    // ...
  }, [location]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onPressLogout = () => {
    if (!isRequestSent) {
      logoutMutation.mutate();
    }
  };

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onMutate: () => {
      setIsRequestSent(true);
    },
    onSuccess: (/*response*/) => {},
    onError: (/*error*/) => {},
    onSettled: () => {
      //? This approach ensures that even if the server fails to process the logout for some reason
      //? (e.g., the server is down, or there's a network issue), the client application still behaves as
      //? if the user has been logged out, which is a safe default for security reasons.
      queryClient.clear(); //! Completely clears the query cache of all queries and mutations. This method is the most drastic as it removes everything from the cache.
      clearUserContext();
      localStorage.removeItem(LOCAL_STORAGE_KEY1);
      //navigate("/login");
      navigate("/login", { replace: true });
      setIsRequestSent(false);
    },
  });

  const handleClick = (buttonName) => {
    switch (buttonName) {
      case "Табло":
        navigate("/cms-dashboard");
        setActiveButton("Табло");
        break;
      case "Доклади":
        // navigate("/cms-reports");
        setActiveButton("Доклади");
        break;
      case "Области":
        // navigate("/cms-zones");
        setActiveButton("Области");
        break;
      case "Хронология":
        // navigate("/cms-chronology");
        setActiveButton("Хронология");
        break;
      case "Акаунт":
        navigate("/cms-account");
        setActiveButton("Акаунт");
        break;
      case "Настройки":
        navigate("/cms-settings");
        setActiveButton("Настройки");
        break;
      case "Диспечери":
        navigate("/cms-dispatchers");
        setActiveButton("Диспечери");
        break;
      case "Логър":
        navigate("/cms-logger");
        setActiveButton("Логър");
        break;
      case "Изход":
        onPressLogout();
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <div className={"main_speed_dial"}>
      <div className="msd-text1">Disaster</div>
      <div className="msd-text2">Scout</div>
        <SpeedDial
          ariaLabel="MainSpeedDial tooltip"
          sx={{
            position: "absolute",
            bottom: authenticatedUser.role === "ADMIN" ? -652 : -510,
            right: 0,
            "& .MuiFab-root": {
              bgcolor: "#009F58",
              
              "&:hover": { bgcolor: "#009F58" },
            }
          }}
          icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="down"
        >
          {authenticatedUser.role === "ADMIN"
            ? adminButtons.map((adminButton) => (
                <SpeedDialAction
                  key={adminButton.name}
                  icon={adminButton.icon}
                  tooltipTitle={adminButton.name}
                  tooltipOpen
                  onClick={() => handleClick(adminButton.name)}
                  sx={{
                    "& .MuiSpeedDialAction-staticTooltipLabel": {
                      borderColor:
                        activeButton === adminButton.name ? "red" : "#009F58",
                      color:
                        activeButton === adminButton.name ? "red" : "#009F58",
                    },
                  }}
                  FabProps={{
                    style: {
                      backgroundColor:
                        activeButton === adminButton.name ? "red" : "#009F58",
                      width: 55,
                      height: 55,
                    },
                  }}
                />
              ))
            : dispatcherButtons.map((dispatcherButton) => (
                <SpeedDialAction
                  key={dispatcherButton.name}
                  icon={dispatcherButton.icon}
                  tooltipTitle={dispatcherButton.name}
                  tooltipOpen
                  onClick={() => handleClick(dispatcherButton.name)}
                  sx={{
                    "& .MuiSpeedDialAction-staticTooltipLabel": {
                      borderColor:
                        activeButton === dispatcherButton.name
                          ? "red"
                          : "#009F58",
                      color:
                        activeButton === dispatcherButton.name
                          ? "red"
                          : "#009F58",
                    },
                  }}
                  FabProps={{
                    style: {
                      backgroundColor:
                        activeButton === dispatcherButton.name
                          ? "red"
                          : "#009F58",
                      width: 55,
                      height: 55,
                    },
                  }}
                />
              ))}
        </SpeedDial>
    </div>
  );
};
