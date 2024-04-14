import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customAxios from "../api/axios"; // Ensure this path is correct for your setup
import Spinner from "../components/spinner/Spinner"; // Adjust path as necessary

const DetailedAnalysisPage = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const [analysisDetails, setAnalysisDetails] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //   let candidate;

  useEffect(() => {
    const fetchAnalysisDetails = async () => {
      setIsLoading(true);
      try {
        // const response = await customAxios.get(`/analyses/${analysisId}`);
        // console.log(response.data);
        // // candidate = response.data.candidates;
        // // console.log(candidate);
        // setAnalysisDetails(response.data);
        // setJobTitle(response.data.jobDetails.title);
        const response = await customAxios.get(`/analyses/${analysisId}`);
        const candidatesSorted = response.data.candidates.sort((a, b) => {
          const aSatisfied = a.requirements.filter(
            (req) => req.satisfied
          ).length;
          const bSatisfied = b.requirements.filter(
            (req) => req.satisfied
          ).length;
          return bSatisfied - aSatisfied; // For descending order
        });

        setAnalysisDetails({ ...response.data, candidates: candidatesSorted });
        setJobTitle(response.data.jobDetails.title);
      } catch (error) {
        console.error("Error fetching analysis details:", error);
        setError("Failed to fetch analysis details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisDetails();
  }, [analysisId]);

  if (isLoading) return <Spinner />;
  if (error) return <div>{error}</div>;
  if (!analysisDetails) return <div>No analysis results found.</div>;

  const handleViewDetails = (index, result) => {
    // Use the index to navigate to the details page
    navigate(`/candidates/${index}`, {
      state: { candidate: result },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Mimicking the rendering from AnalysisResultsPage
  return (
    <div className="analysis-results">
      <button onClick={handleBack} className="candidate-details__back-button">
        Go Back
      </button>
      <h1 className="analysis-results__title">Analysis Details</h1>
      <h2>{jobTitle}</h2>
      {analysisDetails.candidates.map((result, index) => (
        <div key={index} className="analysis-results__item">
          <span>{result.name}</span>
          <span className="analysis-results__satisfied">
            {result.requirements.filter((req) => req.satisfied).length} /
            {result.requirements.length} requirements satisfied
          </span>

          {console.log("result", result)}
          <button onClick={() => handleViewDetails(index, result)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default DetailedAnalysisPage;
