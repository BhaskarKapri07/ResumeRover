import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import customAxios from "../api/axios";
import Spinner from "../components/spinner/Spinner"; // Make sure you have a Spinner component
import "./AnalysisResultsPage.css"; // Path to your CSS file for styling

const AnalysisResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisResults, setAnalysisResults] = useState(null);
  const [jobTitle, setJobTitle] = useState(null); // [TODO] Add jobTitle to state and use it to display the job title in the page title and in the analysis results list

  const [isLoading, setIsLoading] = useState(true);
  const jobUrl = location.state?.jobUrl;
  const sessionId = location.state?.sessionId;

  // Helper function to save to sessionStorage
  const saveToSessionStorage = (results) => {
    sessionStorage.setItem("analysisResults", JSON.stringify(results));
  };

  //Helper function to load from sessionStorage
  const loadFromSessionStorage = () => {
    const storedResults = sessionStorage.getItem("analysisResults");
    return storedResults ? JSON.parse(storedResults) : null;
  };

  // useEffect(() => {
  //   const storedResults = loadFromSessionStorage();
  //   console.log("storedResults", storedResults);
  //   if (storedResults) {
  //     setAnalysisResults(storedResults.candidates);
  //     setJobTitle(storedResults.jobDetails.title);
  //     console.log("type", typeof storedResults);
  //     setIsLoading(false);
  //   } else if (jobUrl) {
  //     const fetchAnalysisResults = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await customAxios.post("/analyze", {
  //           jobUrl,
  //           sessionId,
  //         });
  //         const { jobDetails, candidates } = response.data.newAnalysis;
  //         setAnalysisResults(candidates);
  //         setJobTitle(jobDetails.title);
  //         console.log(response.data.newAnalysis);
  //         saveToSessionStorage(response.data.newAnalysis);
  //       } catch (error) {
  //         console.error("Error fetching analysis results:", error);
  //         // Add your error handling here
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchAnalysisResults();
  //   } else {
  //     // If there's no jobUrl, handle appropriately, maybe navigate back to upload page
  //     navigate("/resume-upload");
  //   }
  // }, [jobUrl, navigate]);

  useEffect(() => {
    const storedResults = loadFromSessionStorage();
    console.log("storedResults", storedResults);
    if (storedResults) {
      setAnalysisResults(storedResults.candidates);
      setJobTitle(storedResults.jobDetails.title);
      console.log("type", typeof storedResults);
      setIsLoading(false);
    } else if (jobUrl) {
      const fetchAnalysisResults = async () => {
        setIsLoading(true);
        try {
          const response = await customAxios.post("/analyze", {
            jobUrl,
            sessionId,
          });
          const { jobDetails, candidates } = response.data.newAnalysis;

          // Sort candidates by the number of satisfied requirements in descending order
          const sortedCandidates = candidates.sort((a, b) => {
            const aSatisfied = a.requirements.filter(
              (req) => req.satisfied
            ).length;
            const bSatisfied = b.requirements.filter(
              (req) => req.satisfied
            ).length;
            return bSatisfied - aSatisfied; // For descending order
          });

          setAnalysisResults(sortedCandidates);
          setJobTitle(jobDetails.title);
          console.log(response.data.newAnalysis);
          saveToSessionStorage({
            ...response.data.newAnalysis,
            candidates: sortedCandidates, // Save sorted candidates
          });
        } catch (error) {
          console.error("Error fetching analysis results:", error);
          // Add your error handling here
        } finally {
          setIsLoading(false);
        }
      };

      fetchAnalysisResults();
    } else {
      // If there's no jobUrl, handle appropriately, maybe navigate back to upload page
      navigate("/resume-upload");
    }
  }, [jobUrl, navigate]);

  // useEffect(() => {
  //   const storedResults = loadFromSessionStorage();
  //   if (storedResults) {
  //     setAnalysisResults(storedResults);
  //     setIsLoading(false);
  //   } else if (jobUrl) {
  //     const fetchAnalysisResults = async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await customAxios.post("/analyze", {
  //           jobUrl,
  //           sessionId,
  //         });
  //         const { jobDetails, candidates } = response.data.newAnalysis;
  //         console.log("respdata", response.data.newAnalysis);
  //         console.log("jobTitle", jobDetails);
  //         console.log("analy", candidates);
  //         setAnalysisResults(candidates);
  //         setJobTitle(jobDetails.jobTitle);
  //         console.log(jobTitle);
  //         saveToSessionStorage(response.data.newAnalysis);
  //       } catch (error) {
  //         console.error("Error fetching analysis results:", error);
  //         // Add your error handling here
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchAnalysisResults();
  //   } else {
  //     // If there's no jobUrl, handle appropriately, maybe navigate back to upload page
  //     navigate("/resume-upload");
  //   }
  // }, [jobUrl, navigate]);

  const handleViewDetails = (index) => {
    // Use the index to navigate to the details page
    navigate(`/candidates/${index}`, {
      state: { candidate: analysisResults[index] },
    });
  };

  if (isLoading) {
    return (
      <>
        <div>Analyzing CVs</div>
        <div>Please Wait...</div>
        <Spinner />
      </>
    );
  }

  if (!analysisResults) {
    return (
      <div>No analysis results available or job URL was not provided.</div>
    );
  }

  return (
    <div className="analysis-results">
      <h1 className="analysis-results__title">Analysis Results </h1>
      <h2 className="analysis-results__job-title">{jobTitle}</h2>
      {console.log("jobtitle", jobTitle)}
      {analysisResults.map((result, index) => (
        <div key={index} className="analysis-results__item">
          <span className="analysis-results__name">{result.name}</span>
          <span className="analysis-results__satisfied">
            {result.requirements.filter((req) => req.satisfied).length} /
            {result.requirements.length} requirements satisfied
          </span>
          <button
            className="analysis-results__details-button"
            onClick={() => handleViewDetails(index)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default AnalysisResultsPage;
