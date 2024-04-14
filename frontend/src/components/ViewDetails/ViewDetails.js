import React from "react";
import "./ViewDetails.css"; // Ensure this CSS file follows the BEM naming convention

const ViewDetails = ({ candidate }) => {
  return (
    <div className="view-details">
      <h2 className="view-details__title">{candidate.name}'s Profile</h2>
      <div className="view-details__section view-details__section--requirements">
        <h3 className="view-details__heading">Requirements</h3>
        <ul className="view-details__list">
          {candidate.requirements.map((req, index) => (
            <li
              key={index}
              className={`view-details__item view-details__item--${
                req.satisfied ? "satisfied" : "not-satisfied"
              }`}
            >
              {req.requirement} - {req.satisfied ? "✅" : "❌"}
              <p className="view-details__explanation">{req.explanation}</p>
            </li>
          ))}
        </ul>
      </div>
      {candidate.bonus_requirements.length > 0 && (
        <div className="view-details__section view-details__section--bonus-requirements">
          <h3 className="view-details__heading">Bonus Requirements</h3>
          <ul className="view-details__list">
            {candidate.bonus_requirements.map((bonusReq, index) => (
              <li
                key={index}
                className={`view-details__item view-details__item--${
                  bonusReq.satisfied ? "satisfied" : "not-satisfied"
                }`}
              >
                {bonusReq.requirement} - {bonusReq.satisfied ? "✅" : "❌"}
                <p className="view-details__explanation">
                  {bonusReq.explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
