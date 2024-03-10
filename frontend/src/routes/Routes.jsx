import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

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

const CmsHomePage = lazy(() =>
  import("../pages/internal/CmsHomePage").then((module) => ({
    default: module.CmsHomePage,
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
      <Route path="/cms" element={<CmsHomePage/>}/>

      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>    
  );
};