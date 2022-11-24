import React from "react";
export default function ({ isUserEntityCandidate, setUserEntity, action }) {
  return (
    <div className="form-top text-center">
      <h4>
        I want to become a {" "}
        <span className="highlight">
          {isUserEntityCandidate ? "Candidate" : "Employer"}
        </span>
      </h4>

      <div className="entity-select d-flex mt-4">
        <div
          className={`seeker login-as mb-lg-0 mb-2 ${
            isUserEntityCandidate ? "active" : ""
          } `}
          onClick={(e) => setUserEntity("Candidate")}
        >
          {action} as Candidate
        </div>
        <div
          className={`employer login-as ${
            !isUserEntityCandidate ? "active" : ""
          } `}
          onClick={(e) => setUserEntity("Employer")}
        >
          {action} as Employer
        </div>
      </div>
    </div>
  );
}
