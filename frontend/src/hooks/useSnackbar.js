import { useState } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info"); //? success,info,warning,error
  const [position, setPosition] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const showSnackbar = (message, severity, vertical = 'top', horizontal = 'center') => {
    setMessage(message);
    setSeverity(severity);
    setPosition({vertical, horizontal});
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    severity,
    position,
    showSnackbar,
    closeSnackbar,
  };
};
