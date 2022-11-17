import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";
import { EmployerServiceIml } from "../../actions/admin-actions";
import { useState, useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants/url";

export default ({ job, classValue }) => {

  const [employer, setEmployer] = useState('');

  useEffect(() => {
    EmployerServiceIml.getEmployerById(job.createdEmployerId).then((response) => {
      setEmployer(response.data.data.firstname + " " + response.data.data.lastname)
    }).catch(error => {
      setEmployer('')
    })
  }, [job.createdEmployerId])

  function showButton(e) {
    setIsShown(true);
  }

  function hiddenButton(e) {
    setIsShown(false);
  }

  const ApplyButton = () => (
    <div className="text-center">
      <button className="rounded bg-danger text-white"
        onClick={() => saveForJob(job.id)}>Save</button>
    </div>
  )

  const saveForJob = (id) => {
    const auth = localStorage.getItem("userRole");
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      alert("You must login to apply for jobs");
    } else {

      axios
        .get(
          API_BASE_URL + "/candidate/save-job-post/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            job_id: id,
          }
        )
        .then((response) => {
          if (response.data.data) {
            //show success message
            alert("Successfuly saved for job");
          } else if (!response.data.data) {
            alert(response.data.data.message);
          } else {
            alert("Request Failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [isShown, setIsShown] = useState(false);
  return (
    <div className={classValue} onMouseOver={showButton} onMouseLeave={hiddenButton}>
      <div className="job-box d-flex align-items-center">
        <img
          src={job.logo ? job.logo : CompnayLogo}
          alt="Company Logo"
          className="job-logo"
        />
        <div className="job-info ">
          <ul>
            <li>
              <strong> {employer}</strong>
            </li>
            <li>
              <Link to={`/common/job-post/get-one/${job.id}`} className="job-title">
                {job.title}
              </Link>
            </li>
            <li>
              <small>Deadline: {job.dueTime} </small>
            </li>
            <li>
              {isShown ? <ApplyButton /> : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
