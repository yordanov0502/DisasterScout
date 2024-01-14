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
const ResetPasswordPage = lazy(() =>
  import("../pages/external/ResetPasswordPage").then((module) => ({
    default: module.ResetPasswordPage,
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
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route index element={<HomePage />} /> {/* "index" is equal to "/" */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
