import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { BorderRoute } from "./BorderRoute.jsx";
import { LoginPage } from "../pages/external/LoginPage";
import { ForgotPasswordPage } from "../pages/external/ForgotPasswordPage";
import { CmsHomePage } from "../pages/internal/CmsHomePage";
import { CmsSettingsPage } from "../pages/internal/CmsSettingsPage";
import { HomePage } from "../pages/external/HomePage";
import { NotFoundPage } from "../pages/external/NotFoundPage"; 


export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={
      <BorderRoute>
      <LoginPage />
      </BorderRoute>
      } />
      <Route path="/forgot-password" element={
      <BorderRoute>
      <ForgotPasswordPage /> 
      </BorderRoute>
      }/>
        
      <Route path="/cms-dashboard" element={
      <ProtectedRoute>
      <CmsHomePage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-settings" element={
      <ProtectedRoute>
      <CmsSettingsPage />
      </ProtectedRoute>
      }/>


      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>    
  );
};