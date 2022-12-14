import React, { Component } from "react";
import { Button, Table } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash, Bullseye } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { JobPostServiceIml } from '../../actions/user-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import { API_BASE_URL } from "../../utils/constants/url";

const ViewCreatedJobs = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    JobPostServiceIml.getJobPostCreateByEmployer().then((response) => { setJobs(response.data.data) }).then(()=>setLoading(false));
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
  function remove(number) {
    console.log('delete', number);
    JobPostServiceIml.deleteJob(number)
      .then(() => JobPostServiceIml.getAllJobs().then((response) => { setJobs(response.data.data) }))
  }

  function view(number) {
    console.log('delete', number);
    JobPostServiceIml.deleteJob(number)
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
    return <tr key={job.id}>
      <td><input type="checkbox" value={job.id} onChange={handleCheck}></input></td>
      <td style={{ whiteSpace: 'nowrap' }}><Link to={"/employer/jobPost/" + job.id} >{job.id}</Link></td>
      <td>{job.title}</td>
      {/* <td>{job.applicationIds.length}</td> */}
      {/* <td>{job.savedCandidateIds.length}</td> */}
      {/* <td style={{ whiteSpace: 'nowrap' }}><Link to={"/employer/jobPost/" + job.id} >{jobApplication(job.id).then(data => console.log(data.data.length))}</Link></td> */}
      <td>{job.city}</td>
      <td>{job.minBudget}$-{job.minBudget}$ </td>
      <td>{job.dueTime ? (new Date(job.dueTime)).getDate() + "/" + (new Date(job.dueTime)).getMonth() + "/" + (new Date(job.dueTime)).getFullYear() : job.dueTime}</td>
      <td style={{ textAlign: 'right' }}>
        <Button className='btn-delete' onClick={() => remove(job.id)}><Trash /></Button>
      </td>
      <td style={{ textAlign: 'right' }}>
        <Link className='btn-delete' to={"/employer/viewApplication/"+job.id}><Bullseye /></Link>
      </td>
    </tr>
  })) : (
    <tr>
      <td colSpan="5">No jobs created yet</td>
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
                <h1>Job Created List</h1>
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
                    <button type="button" class="btn btn-light"><Link to={"/employer/jobPost/new"} >New Job</Link></button>
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
                    <th width="15%">Job Title</th>
                    {/* <th width="10%">N.Applied</th> */}
                    {/* <th width="10%">Quantity</th> */}
                    <th width="15%">City</th>
                    <th width="15%">Salary</th>
                    <th width="10%">Expiry Date</th>
                    <th width="5%">Delete</th>
                    <th width="5%">View</th>
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
export default ViewCreatedJobs;
