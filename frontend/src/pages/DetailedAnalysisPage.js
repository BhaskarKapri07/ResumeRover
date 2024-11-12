import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customAxios from "../api/axios"; // Ensure this path is correct for your setup
import Spinner from "../components/spinner/Spinner"; // Adjust path as necessary
import "./DetailedAnalysisPage.css"; 

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

  return (
      <div className="detailed-analysis">
        <div className="detailed-analysis__content-wrapper">
          <button onClick={handleBack} className="detailed-analysis__back-button">
            Go Back
          </button>
          <h1 className="detailed-analysis__title">Analysis Details</h1>
          <h2 className="detailed-analysis__job-title">{jobTitle}</h2>
          <div className="detailed-analysis__list">
            {analysisDetails.candidates.map((result, index) => (
              <div key={index} className="detailed-analysis__item">
                <span className="detailed-analysis__name">{result.name}</span>
                <span className="detailed-analysis__satisfied">
                  {result.requirements.filter((req) => req.satisfied).length} /
                  {result.requirements.length} requirements satisfied
                </span>
                <button 
                  onClick={() => handleViewDetails(index, result)}
                  className="detailed-analysis__view-button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default DetailedAnalysisPage;
