// import { useNavigate } from "react-router-dom";
// import { useIsSessionExpired } from "../hooks/useIsSessionExpired";
// import { useUserContext } from "../hooks/useUserContext";
// import { useQueryClient } from "@tanstack/react-query";

//const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;

export const ProtectedRoute = ({children}) =>{

   //isUserLoggedIn when context is null or when locaStorage item does not Exist then in the custom hook try to send api call to empty endpoint but secured just to check whether the cookie of the user is in the browser and the jwt is valid and if so update the context and localstorage item. DO THE SAME FOR LOGIN AND FORGOT PASSWORD PAGE BUT IN DIFFERENT CUSTOM HOOK AND WITH REDIRECT FORWARD IF EVERYTHING IS OK, BUT FOR THIS IF NOTHGIN IS OK THEN REDIRECT TO THE LOGINPAGE

   
    

    return children;
}