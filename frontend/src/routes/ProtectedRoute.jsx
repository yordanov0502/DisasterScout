import { Navigate} from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { isUserAuthenticated } from "../services/userService";
import { useEffect } from "react";
import { PageLoader } from "../components/Loaders/PageLoader";
import { Layout1 } from "../layouts/Layout1/Layout1.jsx";
import { useResponsiveContext } from "../hooks/useResponsiveContext";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const LOCAL_STORAGE_VALUE1 = `${import.meta.env.VITE_LOCAL_STORAGE_VALUE1}`;

export const ProtectedRoute = ({ children }) => {
  const { isUserContextEmpty, updateUserContext } = useUserContext();
  const { isTouchScreen, setIsTouchScreen } = useResponsiveContext();

  const getUserAuthentication = useQuery({
    queryKey: ["isUserAuthenticatedPR"],
    queryFn: isUserAuthenticated,
    enabled: isUserContextEmpty(), //!The query executes ONLY if the userContext is empty
  });

  useEffect(() => {
    const matchMedia = window.matchMedia('(pointer: coarse)');
    const handleChange = (e) => { setIsTouchScreen(e.matches); };

    matchMedia.addEventListener('change',handleChange);
    handleChange(matchMedia);

    return () => {
      matchMedia.removeEventListener('change',handleChange);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY1) !== null &&
        localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 &&
        isUserContextEmpty() &&
        getUserAuthentication.isSuccess) {

      updateUserContext(getUserAuthentication.data.data);

    }
  }, [getUserAuthentication.isSuccess]);

  if(isTouchScreen === null) //! This condition is checked more than once despite the fact that the first useEffect is run only once. This is because the 2nd useEffect triggers multiple re-renders and the touchScreen condition is checked again because of it. If there were no userContext with its related useEffect to trigger more re-renders, the PageLoader would be infinite, and I would have needed to add the isTouchScreen state to the dependecy array.
  { 
    //? Disables flashing sidebar on page reload, when on mobile.(This check and related useEffect were initially in the Layout1.jsx)
    return <PageLoader/>
  }

  if(localStorage.getItem(LOCAL_STORAGE_KEY1) !== null && localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 && !isUserContextEmpty()) 
  {
    return <Layout1>{children}</Layout1>;
  }

  if(localStorage.getItem(LOCAL_STORAGE_KEY1) !== null && localStorage.getItem(LOCAL_STORAGE_KEY1) === LOCAL_STORAGE_VALUE1 && isUserContextEmpty()) 
  {
    if (getUserAuthentication.isLoading) return <PageLoader/>;
    if (getUserAuthentication.isSuccess) return <Layout1>{children}</Layout1>;
  }

  //? replace={true} means the user won't be able to hit the back button to return to the previous page
  return <Navigate to="/login" replace={true} state={{ showExpiredSessionSnackbar: true }} />; 
};
