import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import customAxios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./ResumeUploadPage.css";
import { createAnalysisSession } from "../services/sessionService";

const ResumeUploadPage = () => {
  const [jobUrl, setJobUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJobUrlChange = (event) => {
    setJobUrl(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const invalidFiles = files.filter(file => file.type !== "application/pdf");

    if (invalidFiles.length > 0) {
      alert("Please upload only PDF files.");
      return;
    }

    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!jobUrl || selectedFiles.length === 0) {
      alert("Please provide a job URL and select resumes to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const sessionId = await createAnalysisSession();
      console.log(sessionId);
      if (!sessionId) {
        throw new Error("Failed to create analysis session.");
      }

      const formData = new FormData();
      formData.append("jobUrl", jobUrl);
      formData.append("sessionId", sessionId); // Attach the sessionId to the formData
      for (const file of selectedFiles) {
        formData.append("resume", file);
      }

      await customAxios.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("uploaded");
      //   const analysisResponse = await customAxios.post("/analyze", { jobUrl });
      setIsUploading(false);
      // Dispatch an action to store the uploaded resumes (if necessary)
      // For example: dispatch(setUploadedResumes(response.data));

      navigate("/analysis-results", { state: { jobUrl, sessionId } });
      //   console.log(analysisResponse.data) // Navigate to the results page
    } catch (error) {
      console.error("Error uploading resumes:", error);
      setIsUploading(false);
      // Handle error (show error message to the user)
    }
  };

  return (
    <div className="resume-upload">
      <h1 className="resume-upload__title">
        Upload Resumes and Enter Job Posting URL
      </h1>
      <form onSubmit={handleSubmit} className="resume-upload__form">
        <div className="resume-upload__form-group">
          <label className="resume-upload__label">Job Posting URL</label>
          <input
            type="text"
            value={jobUrl}
            onChange={handleJobUrlChange}
            placeholder="Enter the URL of the job posting"
            className="resume-upload__input"
            required
          />
        </div>
        <div className="resume-upload__form-group resume-upload__form-group--file">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="resume-upload__input resume-upload__input--file"
            multiple
            required
            hidden
          />
          <label htmlFor="file" className="resume-upload__file-label">
            <div id="file" className="resume-upload__file-button">
            {selectedFiles.length === 0
                ? "Drag or click to upload CVs or resumes"
                : `${selectedFiles.length} resume(s) uploaded`}
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="resume-upload__button"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Go"}
        </button>
      </form>
      {isUploading && (
        <div className="resume-upload__loading">Uploading resumes...</div>
      )}
    </div>
  );
};

export default ResumeUploadPage;
