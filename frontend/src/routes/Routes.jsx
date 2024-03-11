import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/external/LoginPage";
import { ForgotPasswordPage } from "../pages/external/ForgotPasswordPage";
import { CmsHomePage } from "../pages/internal/CmsHomePage";
import { HomePage } from "../pages/external/HomePage";
import { NotFoundPage } from "../pages/external/NotFoundPage"; 

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