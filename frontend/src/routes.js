import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import VerifyEmail from "./components/VerifyEmail";
import Register from "./components/auth/Register";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import AnalysisResultsPage from "./pages/AnalysisResultsPage";
import CandidateDetailsPage from "./pages/CandidateDetailsPage";
import UserAnalysesPage from "./pages/UserAnalysisPage";
import AuthPage from "./components/auth/AuthPage";
import DetailedAnalysisPage from "./pages/DetailedAnalysisPage";
import ErrorPage from "./pages/ErrorPage";

// import Dashboard from './pages/Dashboard'; // Placeholder for your Dashboard component
// import Analyses from './pages/Analyses'; // Placeholder for your Analyses component

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/resume-upload" element={<ResumeUploadPage />} />
      <Route path="analysis-results" element={<AnalysisResultsPage />} />
      <Route
        path="/candidates/:candidateId"
        element={<CandidateDetailsPage />}
      />
      <Route path="/my-analyses" element={<UserAnalysesPage />} />
      <Route path="/detailed-analysis/:analysisId" element={<DetailedAnalysisPage />} />
      <Route path="*" element={<ErrorPage />} />

      {/* <Route path="/analyses" element={<Analyses />} /> */}
      {/* Add additional routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
