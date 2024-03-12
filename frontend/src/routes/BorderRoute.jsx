import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/userService";
import { useEffect, } from "react";
import { PageLoader } from "../components/Loaders/PageLoader";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`;

export const BorderRoute = ({ children }) => {
  const { isUserContextEmpty,updateUserContext } = useUserContext();

  const getUserAuthentication = useQuery({
    queryKey: ["isUserAuthenticatedBR"],
    queryFn: isUserAuthenticated,
    enabled: false, //!The query is disabled from running automatically
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
        
      return <Navigate to="/cms-home" />;
    }

  if(localStorage.getItem(LOCAL_STORAGE_KEY1) !== null && localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 && isUserContextEmpty())
    {
      getUserAuthentication.refetch();  
      if(getUserAuthentication.isLoading) return <PageLoader/>
      if(getUserAuthentication.isSuccess) return <Navigate to="/cms-home" />;
    }

    return children;
};
