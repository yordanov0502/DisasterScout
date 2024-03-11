import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/userService";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`;

export const ProtectedRoute = ({ children }) => {
  const { isUserContextEmpty,updateUserContext } = useUserContext();

  const getUserAuthentication = useQuery({
    queryKey: ["isUserAuthenticated"],
    queryFn: isUserAuthenticated,
    enabled: isUserContextEmpty(), //!The query executes ONLY if the userContext is empty
  });

  function doWork(data) {
    updateUserContext(data);
    console.log("updated user context");
    return children;
  }

  if (
    localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
    localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
    !isUserContextEmpty()
  ) {console.log("case 1");
    return children;
   } 
//    else if (
//     localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
//     localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
//     isUserContextEmpty()
//   ) {
//     //getUserAuthentication.refetch();
//     //console.log(getUserAuthentication.isSuccess);

//     //return getUserAuthentication.isLoading && <h1>Loading...</h1>
//     console.log("case 2");
//      return (getUserAuthentication.isSuccess && doWork(getUserAuthentication.data));
//   } 
  else {
    console.log("case 3");
    return <Navigate to="/login" />;
  }
};
