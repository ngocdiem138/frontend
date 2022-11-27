import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from '@reach/router';
import { Link } from "gatsby";
import PageWrapper from "../components/PageWrapper";

import imgF1 from "../assets/image/l2/png/featured-job-logo-1.png";
import iconD from "../assets/image/svg/icon-dolor.svg";
import iconB from "../assets/image/svg/icon-briefcase.svg";
import iconL from "../assets/image/svg/icon-location.svg";
import iconC from "../assets/image/svg/cityscape-town-svgrepo-com.svg"

import { EmployerServiceIml } from "../actions/admin-actions";

import { JobPostServiceIml } from "../actions/user-actions";

import axios from "axios";
import { API_BASE_URL } from "../utils/constants/url";

const JobDetails = () => {

  const location = useLocation();
  const [job, setJob] = useState({});
  const [employer, setEmployer] = useState({});
  let arr = location.pathname.split('/');
  const id = arr[arr.length - 1];

  useEffect(() => {
    let employerId;
    JobPostServiceIml.getJobPostById(id).then((response) => {
      setJob(response.data.data);
      if (response.data.data.skills != null) {
        setSkill(response.data.data.skills.split(','))
      }
      employerId = response.data.data.createdEmployerId;
      EmployerServiceIml.getEmployerById(employerId).then((response) => {
        setEmployer(response.data.data);
      })
    })
      .catch(error => {
        setJob({});
      })
  }, [id])


  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  const [skill, setSkill] = useState(["No require"]);

  const listSkill = skill.map(skill => {
    return <li className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
      {skill}
    </li>
  });

  const saveForJob = () => {
    const auth = localStorage.getItem("userRole");
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      setError("You must login to save for jobs");
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
            setSucces("Successfuly saved for job");
          } else if (!response.data.data) {
            setError(response.data.message)
          } else {
            setSucces("Request Failed")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const applyForJob = () => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if (!isAuthenticated) {
      setError("You must login to apply for jobs")
    } else {
      axios
        .get(
          API_BASE_URL + "/candidate/apply-job-post/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            job_id: id,
          }
        )
        .then((response) => {
          if (response.data.errorCode == 200) {
            setSucces("Successfuly applied for job")
          } else if (response.data.errorCode != 200) {
            setError(response.data.message)
            window.location.assign("http://localhost:8000/registerOfUser");
          } else {

            setSucces("Request Failed")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="jobDetails-section bg-default-1 pt-28 pt-lg-27 pb-xl-25 pb-12">
          <div className="container">
            <div className="row justify-content-center">
              {error ? <div className="alert alert-danger col-12" role="alert">{error}</div> : null}
              {success ? <div className="alert alert-success col-12" role="alert">{success}</div> : null}
              {/* <!-- back Button --> */}
              <div className="col-xl-10 col-lg-11 mt-4 ml-xxl-32 ml-xl-15 dark-mode-texts">
                <div className="mb-9">
                  <Link to="/" className="d-flex align-items-center ml-4">
                    {" "}
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back to job board
                    </span>
                  </Link>
                </div>
              </div>
              {/* <!-- back Button End --> */}
              <div className="col-xl-9 col-lg-11 mb-8 px-xxl-15 px-xl-0">
                <div className="bg-white rounded-4 border border-mercury shadow-9">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row">
                      <div className="col-md-6">
                        {/* <!-- media start --> */}
                        <div className="media align-items-center">
                          {/* <!-- media logo start --> */}
                          <div className="square-72 d-block mr-8">
                            <img src={imgF1} alt="" />
                          </div>
                          {/* <!-- media logo end --> */}
                          {/* <!-- media texts start --> */}
                          <div>
                            <h3 className="font-size-6 mb-0">
                              {job.title}
                            </h3>
                            <span className="font-size-3 text-gray line-height-2">
                              {employer.lastname} {employer.firstname}
                            </span>
                          </div>
                          {/* <!-- media texts end --> */}
                        </div>
                        {/* <!-- media end --> */}
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-0 mt-md-n1">
                        {/* <!-- media date start --> */}
                        <div className="media justify-content-md-end">
                          <p className="font-size-4 text-gray mb-0">
                            {job.dueTime}
                          </p>
                        </div>
                        {/* <!-- media date end --> */}
                      </div>
                    </div>
                    <div className="row pt-9">
                      <div className="col-12">
                        {/* <!-- card-btn-group start --> */}
                        <div className="card-btn-group">
                          {(
                            <button
                              type="submit"
                              className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                              onClick={applyForJob}
                            >
                              Apply to this job
                            </button>
                          )}
                          {(
                            <button
                              type="submit"
                              className="btn btn-outline-mercury text-black-2 text-uppercase h-px-48 rounded-3 mb-5 px-5"
                              onClick={saveForJob}
                            >
                              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
                              Save job
                            </button>
                          )}
                        </div>
                        {/* <!-- card-btn-group end --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row mb-7">
                      <div className="col-md-4 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconD} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                            {job.minBudget} - {job.maxBudget}K $$
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 pr-lg-0 pl-lg-10 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconB} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                            {job.employmentType}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 pl-lg-0">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconL} alt="" />
                          </div>
                          <p className="font-size-5 text-gray mb-0">
                            {job.address},{" "}
                            <br className="d-md-none d-lg-block d-block" />
                            {job.city}
                            {/* <div > */}
                            <img className="image mr-5 col-md-3" src={iconC} alt="" />
                            {/* </div> */}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-lg-0 mb-10">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            Education Level
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                            {job.educationLevel}
                          </h6>
                        </div>
                        <div className="tags">
                          <p className="font-size-4 text-gray mb-0">
                            Soft Skill
                          </p>
                          <ul className="list-unstyled mr-n3 mb-0">
                            <li className="d-block font-size-4 text-black-2 mt-2">
                              <span className="d-inline-block mr-2">•</span>
                              Slack
                            </li>
                            <li className="d-block font-size-4 text-black-2 mt-2">
                              <span className="d-inline-block mr-2">•</span>
                              Basic English
                            </li>
                            <li className="d-block font-size-4 text-black-2 mt-2">
                              <span className="d-inline-block mr-2">•</span>Well
                              Organized
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            Quantity
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                            {job.quantity} employees
                          </h6>
                        </div>
                        <div className="tags">
                          <p className="font-size-4 text-gray mb-3">
                            Technical Skill
                          </p>
                          <ul className="d-flex list-unstyled flex-wrap pr-sm-25 pr-md-0">
                            {listSkill}
                            {/* <li className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
                              Editing
                            </li>
                            <li className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
                              Wire-framing
                            </li>
                            <li className="bg-regent-opacity-15 mr-md-0 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
                              XD
                            </li>
                            <li className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
                              User Persona
                            </li>
                            <li className="bg-regent-opacity-15 mr-3 h-px-33 text-center flex-all-center rounded-3 px-5 font-size-3 text-black-2 mt-2">
                              Sketch
                            </li> */}
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4 pl-lg-0">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            Workplace Type
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                            {job.workplaceType}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
                    <div className="row">
                      <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                        <p className="mb-4 font-size-6 text-black-2 font-weight-semibold">
                          Employer Info.{" "}
                        </p>
                        <div className="row">
                          <div className="col-md-4 mb-lg-0 mb-10">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Employer Name
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                                {employer.lastname} {employer.firstname}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Recruitment Email
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                                {employer.recruitmentEmail ? employer.recruitmentEmail : "Email don't update"}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 pl-lg-0">
                            <div className="">
                              <span className="font-size-4 d-block mb-4 text-gray">
                                Recruitment Phone
                              </span>
                              <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                                {employer.recruitmentPhone ? employer.recruitmentPhone : "Phone don't update"}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
                    <div className="row">
                      <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                        <div className="">
                          <p className="mb-4 font-size-6 text-black-2 font-weight-semibold">
                            Job Description.{" "}
                          </p>
                          <p className="font-size-4 text-black-2 mb-7">
                            {job.description}{" "}
                          </p>
                        </div>
                        <div className="">
                          {(
                            <button
                              type="submit"
                              className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                              onClick={applyForJob}
                            >
                              Apply to this job
                            </button>
                          )}
                          {/* <Link
                            to="/#"
                            className="btn btn-green text-uppercase btn-medium w-180 h-px-48 rounded-3 mr-4 mt-6"
                          >
                            Apply to this job
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default JobDetails;
