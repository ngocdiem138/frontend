import React, { useEffect, useState } from "react";
import { JobPostServiceIml } from "../../actions/user-actions";
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";

const EmployerLanding = () => {

  useEffect(() => {
    JobPostServiceIml.getJobPostCreateByEmployer().then((response) => { setTotalJobsPosted(response.data.data.length) });
  }, [])

  const [totalJobsPosted, setTotalJobsPosted] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);

  return (
    <div className="container d-flex" style={{ minWidth: "90vw" }}>
      <AccountNavbar />

      <div className="content" style={{ minWidth: "82%" }}>
        <div className="row mt-4 mx-0">
          {totalJobsPosted !== "" && (
            <div className="col-lg-6">
              <div className="card-counter success">
                <i className="fa fa-database"></i>
                <span className="count-numbers">{totalJobsPosted}</span>
                <span className="count-name">Total Jobs Posted</span>
              </div>
            </div>
          )}
          {totalApplicants !== "" && (
            <div className="col-lg-6">
              <div className="card-counter info">
                <i className="fa fa-users"></i>
                <span className="count-numbers">{totalApplicants}</span>
                <span className="count-name">Total Applicants</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmployerLanding;