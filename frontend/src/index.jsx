import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter} from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import { ResponsiveContextProvider } from "./contexts/ResponsiveContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ResponsiveContextProvider> 
    <UserContextProvider>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </UserContextProvider>
   </ResponsiveContextProvider>
  </React.StrictMode>
);
