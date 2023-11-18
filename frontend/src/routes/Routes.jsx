import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { lazyLoadPage } from "../utils/lazyLoadPage";

const LoginPage = lazyLoadPage("../pages/external/LoginPage/LoginPage","LoginPage");
const ResetPasswordPage = lazyLoadPage("../pages/external/ResetPasswordPage/ResetPasswordPage","ResetPasswordPage");
const WelcomePage = lazyLoadPage("../pages/external/WelcomePage/WelcomePage","WelcomePage");

export const Router = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route index element={<WelcomePage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </Suspense>
  );
};
