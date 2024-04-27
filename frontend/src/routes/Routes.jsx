import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { BorderRoute } from "./BorderRoute.jsx";
import { LoginPage } from "../pages/external/LoginPage";
import { ForgotPasswordPage } from "../pages/external/ForgotPasswordPage";
import { CmsDashboardPage } from "../pages/internal/CmsDashboardPage/index.js";
import { CmsAccountPage } from "../pages/internal/CmsAccountPage";
import { CmsSettingsPage } from "../pages/internal/CmsSettingsPage";
import { HomePage } from "../pages/external/HomePage";
import { NotFoundPage } from "../pages/external/NotFoundPage"; 
import { CmsLoggerPage } from "../pages/internal/CmsLoggerPage/CmsLoggerPage.jsx";


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
      <CmsDashboardPage />
      </ProtectedRoute>
      }/>
       <Route path="/cms-account" element={
      <ProtectedRoute>
      <CmsAccountPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-settings" element={
      <ProtectedRoute>
      <CmsSettingsPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-logger" element={
      <ProtectedRoute>
      <CmsLoggerPage />
      </ProtectedRoute>
      }/>


      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>    
  );
};