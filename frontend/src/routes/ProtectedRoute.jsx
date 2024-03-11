import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/userService";
import { useRef } from "react";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`;

export const ProtectedRoute = ({ children }) => {
  const { isUserContextEmpty,updateUserContext } = useUserContext();
  const hasUpdatedUserContext = useRef(false);

  const getUserAuthentication = useQuery({
    queryKey: ["isUserAuthenticated"],
    queryFn: isUserAuthenticated,
    enabled: isUserContextEmpty(), //!The query executes ONLY if the userContext is empty
  });

  function doWork(data) {
    if(!hasUpdatedUserContext.current){
      updateUserContext(data);
      hasUpdatedUserContext.current = true; // Set the flag to true after updating
    }
    //console.log("updated user context");
    console.log(data);
    return children;
  }

  return(
    <>
         {
          localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
          localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
          !isUserContextEmpty() && children
         }
         {
          localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
          localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
          isUserContextEmpty() && getUserAuthentication.isLoading && <h1>Loading</h1> 
         }
         {
          localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
          localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
          isUserContextEmpty() && getUserAuthentication.isSuccess &&  doWork(getUserAuthentication.data)
         }
         {
           localStorage.getItem(LOCAL_STORAGE_KEY1) === null && <Navigate to="/login" />
         }
    </>
  );
};
