import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewDetails from "../components/ViewDetails/ViewDetails";
import "./CandidateDetailsPage.css"; // Ensure you have this CSS file for styling

const CandidateDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const candidate = location.state?.candidate;

  const handleBack = () => {
    navigate(-1);
  };

  if (!candidate) {
    return (
      <div className="candidate-details__error-message">
        No candidate details available.
      </div>
    );
  }

  return (
    <div className="candidate-details">
      <div className="candidate-details__content-wrapper">
        <button onClick={handleBack} className="candidate-details__back-button">
          Go Back
        </button>
        <ViewDetails
          candidate={candidate}
          className="candidate-details__view-details"
        />
      </div>
    </div>
  );
};

export default CandidateDetailsPage;
