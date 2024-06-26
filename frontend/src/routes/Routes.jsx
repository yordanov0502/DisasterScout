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
import { SearchReportsPage } from "../pages/external/SearchReportsPage";
import { CategoriesPage } from "../pages/external/CategoriesPage";
import { ZonesPage } from "../pages/external/ZonesPage";
import { CmsNewDispatcherPage } from "../pages/internal/CmsNewDispatcherPage";
import { CmsReportsPage } from "../pages/internal/CmsReportsPage";
import { CmsReportPage } from "../pages/internal/CmsReportPage";
import { CmsZonesPage } from "../pages/internal/CmsZonesPage";
import { ReportPage } from "../pages/external/ReportPage";
import { CategoryPage } from "../pages/external/CategoryPage";
import { FAQPage } from "../pages/external/FAQPage";
import { TermsOfUsePage } from "../pages/external/TermsOfUsePage";
import { PrivacyPolicyPage } from "../pages/external/PrivacyPolicyPage";

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
      <Route path="/cms-reports" element={
      <ProtectedRoute>
      <CmsReportsPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-report" element={
      <ProtectedRoute>
      <CmsReportPage />
      </ProtectedRoute>
      }/>
      <Route path="/cms-zones" element={
      <ProtectedRoute>
      <CmsZonesPage />
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
      <Route path="/search-reports" element={
      <PublicRoute>
      <SearchReportsPage />
      </PublicRoute>
      }/>
      <Route path="/report" element={
      <PublicRoute>
      <ReportPage />
      </PublicRoute>
      }/>
      <Route path="/categories" element={
      <PublicRoute>
      <CategoriesPage />
      </PublicRoute>
      }/>
      <Route path="/category" element={
      <PublicRoute>
      <CategoryPage />
      </PublicRoute>
      }/>
      <Route path="/zones" element={
      <PublicRoute>
      <ZonesPage />
      </PublicRoute>
      }/>

      <Route path="/terms-of-use" element={
      <PublicRoute>
      <TermsOfUsePage />
      </PublicRoute>
      }/>
      <Route path="/privacy-policy" element={
      <PublicRoute>
      <PrivacyPolicyPage />
      </PublicRoute>
      }/>
      <Route path="/czv" element={
      <PublicRoute>
      <FAQPage />
      </PublicRoute>
      }/>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>    
  );
};