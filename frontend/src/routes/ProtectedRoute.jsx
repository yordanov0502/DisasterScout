import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/userService";
import { useEffect, } from "react";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`;

export const ProtectedRoute = ({ children }) => {
  const { isUserContextEmpty,updateUserContext } = useUserContext();

  const getUserAuthentication = useQuery({
    queryKey: ["isUserAuthenticatedPR"],
    queryFn: isUserAuthenticated,
    enabled: isUserContextEmpty(), //!The query executes ONLY if the userContext is empty
  });

  useEffect(() => {
     if (localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
         localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
         isUserContextEmpty() && 
         getUserAuthentication.isSuccess) {
           
      updateUserContext(getUserAuthentication.data.data);
      
    }
  }, [getUserAuthentication.isSuccess]);

  if(localStorage.getItem(LOCAL_STORAGE_KEY1) !== null && localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 && !isUserContextEmpty())
    {
      return children;
    }

  if(localStorage.getItem(LOCAL_STORAGE_KEY1) !== null && localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 && isUserContextEmpty())
    {
      if(getUserAuthentication.isLoading) return <h1> Loading</h1>
      if(getUserAuthentication.isSuccess) return children;
    }

    return <Navigate to="/login" />;
};
