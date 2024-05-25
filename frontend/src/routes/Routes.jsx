import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { BorderRoute } from "./BorderRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import { LoginPage } from "../pages/external/LoginPage";
import { ForgotPasswordPage } from "../pages/external/ForgotPasswordPage";
import { CmsDashboardPage } from "../pages/internal/CmsDashboardPage/index.js";
import { CmsAccountPage } from "../pages/internal/CmsAccountPage";
import { CmsSettingsPage } from "../pages/internal/CmsSettingsPage";
import { HomePage } from "../pages/external/HomePage";
import { NotFoundPage } from "../pages/external/NotFoundPage"; 
import { CmsLoggerPage } from "../pages/internal/CmsLoggerPage";
import { CmsDispatchersPage } from "../pages/internal/CmsDispatchersPage";
import { SubmitReportPage } from "../pages/external/SubmitReportPage";
import { CmsNewDispatcherPage } from "../pages/internal/CmsNewDispatcherPage";

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
      <Route path="/cms-new-dispatcher" element={
      <ProtectedRoute>
      <CmsNewDispatcherPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-dispatchers" element={
      <ProtectedRoute>
      <CmsDispatchersPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-logger" element={
      <ProtectedRoute>
      <CmsLoggerPage />
      </ProtectedRoute>
      }/>


      <Route index element={
      <PublicRoute>
      <HomePage />
      </PublicRoute>
      }/>
      <Route path="/submit-report" element={
      <PublicRoute>
      <SubmitReportPage />
      </PublicRoute>
      }/>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>    
  );
};