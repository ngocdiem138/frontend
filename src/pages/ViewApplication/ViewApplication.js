import React, { Component } from "react";
import { Button, Table } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash, Spellcheck } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { EmployerServiceIml } from "../../actions/admin-actions";
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import { API_BASE_URL } from "../../utils/constants/url";
import { useHistory, useParams } from 'react-router-dom';

const ViewApplication = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    EmployerServiceIml.getApplication(id).then((response) => { setJobs(response.data.data) }).then(()=>setLoading(false));
  }, [])

  const [keyword, setKeyword] = useState('');

  function handleInputChange(e) {
    setKeyword(e.target.value)
  }
  async function handleSearch() {
    const { data } = await JobPostServiceIml.getJobByKeyWordAndStatus(keyword);
    console.log(data);
    setJobs(data);
  }
  function remove(applicationId) {
    console.log('delete', applicationId);
    EmployerServiceIml.responseApplication(applicationId, false, "reject")
      .then(() => JobPostServiceIml.getAllJobs().then((response) => { setJobs(response.data.data) }))
  }

  function allow(applicationId) {
    console.log('allow', applicationId);
    EmployerServiceIml.responseApplication(applicationId, true, "allow")
      .then(() => JobPostServiceIml.getAllJobs().then((response) => { setJobs(response.data.data) }))
  }

  const [checked, setChecked] = useState([]);
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(checked)
  };
  function removeSelected(checked) {
    checked.map(item => {
      JobPostServiceIml.deleteJob(item).then(() => JobPostServiceIml.getJobPostCreateByEmployer().then((response) => { setJobs(response.data.data) }));
      var updatedList = [...checked];
      updatedList.splice(checked.indexOf(item), 1);
      setChecked(updatedList);
    })
  }
  const [jobApplicationQuality, setjobApplicationQuality] = useState([]);
  async function jobApplication(jobId) {
    const settings = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
    };
    let result = await fetch(
      `${API_BASE_URL}/employer/get-application-by-job-post/${jobId}`,
      settings
    )
    .then((response) => {
      let dataJson = response.json();
      if (dataJson.data) {
        return dataJson.data.length;
      } else {
        return dataJson;
      }
    })
    return result;
  }
  

  const jobList = !loading&& jobs && jobs.length ? (jobs.map(job => {
    return <tr key={job.candidateDTO}>
      <td><input type="checkbox" value={job.candidateDTO.id} onChange={handleCheck}></input></td>
      <td style={{ whiteSpace: 'nowrap' }}><Link to={"/employer/viewCandidate" + job.candidateDTO.id} >{job.candidateDTO.id}</Link></td>
      <td>{job.candidateDTO.firstName}</td>
      {/* <td>{job.applicationIds.length}</td> */}
      {/* <td>{job.savedCandidateIds.length}</td> */}
      {/* <td style={{ whiteSpace: 'nowrap' }}><Link to={"/employer/jobPost/" + job.id} >{jobApplication(job.id).then(data => console.log(data.data.length))}</Link></td> */}
      <td>{job.candidateDTO.lastName}</td>
      <td>{job.candidateDTO.phoneNum} </td>
      <td>{job.candidateDTO.educationLevel} </td>
      <td style={{ textAlign: 'right' }}>
        <Button className='btn-delete' onClick={() => remove(job.candidateDTO.id)}><Trash /></Button>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Link className='btn-delete' onClick={() => allow(job.candidateDTO.id)}><Spellcheck /></Link>
      </td>
    </tr>
  })) : (
    <tr>
      <td colSpan="5">No candidate apply</td>
    </tr>
  );

  return (
    <div className="container d-flex" style={{ minWidth: "90vw" }}>
      <AccountNavbar />

      <div className="content" style={{ minWidth: "82%" }}>
        <Container fluid>
          <Row>
            <Col xl={11}>
              <p className="name">
                <h1>Job Application List</h1>
              </p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col xl={11} className="search">
              <div class="container">
                <div class="row">
                  <div className="col-md-4">
                    <input className='form-control' value={keyword} onChange={handleInputChange} placeholder='Job number, name' >
                    </input>
                  </div>
                  <div class="col-md-2">
                    <button type="button submit" class="btn btn-primary" onClick={handleSearch}>Search Job</button>
                  </div>
                  <div class="col-md-2">
                    <button type="button" class="btn btn-light">Reset Search</button>
                  </div>
                  <div class="col-md-2">
                    {/* <button type="button" class="btn btn-light"><Link to={"/employer/viewCandidate"} >New Job</Link></button> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={11}>
              <Table className="col-md-12" bordered>
                <thead>
                  <tr>
                    <th width="5%"></th>
                    <th width="5%">S.N</th>
                    <th width="15%">First Name</th>
                    <th width="15%">Last Name</th>
                    <th width="15%">Phone N.</th>
                    <th width="10%">Education</th>
                    <th width="5%">Reject</th>
                    <th width="5%">Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {jobList}
                  <tr>
                    <td colspan="5">{checked.length} items selected</td>
                    <td colspan="3" > <Button style={{ textAlign: 'right' }} className='btn-delete' onClick={() => removeSelected(checked)} >delete selected items <Trash /></Button></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

        </Container>
      </div>
    </div >
  );
}
export default ViewApplication;
