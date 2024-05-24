import { useEffect } from "react";
import { PageLoader } from "../components/Loaders/PageLoader";
import { useResponsiveContext } from "../hooks/useResponsiveContext";
import { Layout2 } from "../layouts/Layout2/Layout2.jsx";

export const PublicRoute = ({ children }) => {
  const { isTouchScreen, setIsTouchScreen } = useResponsiveContext();

  useEffect(() => {
    const matchMedia = window.matchMedia('(pointer: coarse)');
    const handleChange = (e) => { setIsTouchScreen(e.matches); };

    matchMedia.addEventListener('change',handleChange);
    handleChange(matchMedia);

    return () => {
      matchMedia.removeEventListener('change',handleChange);
    };
  }, [isTouchScreen]);

  //! MIGHT NOT BE NEEDED IF I SET NAVBAR DROPDOWN COVER WHOLE PAGE BY MEDIA QUERY INSTEAD
  if(isTouchScreen === null)
  { 
    //? Disables flashing sidebar on page reload, when on mobile.(This check and related useEffect were initially in the Layout1.jsx)
    return <PageLoader/>
  }

  return <Layout2>{children}</Layout2>;

};
