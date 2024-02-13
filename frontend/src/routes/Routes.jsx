import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

//* Pages are loaded lazily for successfull implementation of code splitting
//! React.lazy can work ONLY with default exports
//? Each lazy import correctly targets a named export from a module and wraps it as a default export, so that React.lazy can work properly
const LoginPage = lazy(() =>
  import("../pages/external/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const ForgotPasswordPage = lazy(() =>
  import("../pages/external/ForgotPasswordPage").then((module) => ({
    default: module.ForgotPasswordPage,
  }))
);
const HomePage = lazy(() =>
  import("../pages/external/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
const NotFoundPage = lazy(() =>
  import("../pages/external/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

export const Router = () => {
  return (
    <Routes>
      
       {/* Pages should have redirect to cms main page if authenticatedCookie is available on the local storage, after that request to empty but secured endpoint should be made to check the validity of the jwt inside httpOnly cookie if of course exists */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Pages should have redirect to cms main page if authenticatedCookie is available on the local storage, after that request to empty but secured endpoint should be made to check the validity of the jwt inside httpOnly cookie if of course exists */}






        <Route index element={<HomePage />} /> {/* "index" is equal to "/" */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
