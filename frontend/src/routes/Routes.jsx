import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

//! React.lazy can work ONLY with default exports
//? Each lazy import correctly targets a named export from a module and wraps it as a default export, so that React.lazy can work properly
const LoginPage = lazy(()=> import("../pages/external/LoginPage/LoginPage").then((module)=>({default: module.LoginPage})))
const ResetPasswordPage = lazy(()=> import("../pages/external/ResetPasswordPage/ResetPasswordPage").then((module)=>({default: module.ResetPasswordPage})))
const WelcomePage = lazy(()=> import("../pages/external/WelcomePage/WelcomePage").then((module)=>({default: module.WelcomePage})))

export const Router = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route index element={<WelcomePage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
  );
};
