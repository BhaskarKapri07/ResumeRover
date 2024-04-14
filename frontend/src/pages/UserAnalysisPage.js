import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../api/axios";
import "./UserAnalysesListPage.css"; // Make sure to create this CSS file

const UserAnalysesListPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAnalyses = async () => {
      try {
        const { data } = await customAxios.get("/user-analyses");
        setAnalyses(data);
      } catch (error) {
        console.error("Failed to fetch analyses:", error);
      }
    };

    fetchUserAnalyses();
  }, []);

  return (
    <div className="user-analyses">
      <h2 className="user-analyses__title">My Analyses</h2>
      <ul className="user-analyses__list">
        {analyses.map((analysis, index) => (
          <li
            key={index}
            className="user-analyses__item"
            onClick={() => navigate(`/detailed-analysis/${analysis._id}`)}
          >
            <span className="user-analyses__job-title">
              {analysis.jobDetails.title}
            </span>{" "}
            -{" "}
            <span className="user-analyses__date">
              {new Date(analysis.analysisDate).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAnalysesListPage;
