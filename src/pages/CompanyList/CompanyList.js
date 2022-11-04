import React from 'react';
import { Button, Table } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CompanyList.css';
import { format } from 'date-fns';
import { Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import CompanyService from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";

const CompanyList = () => {

    const [companys, setCompanys] = useState([]);
    console.log(companys)
    useEffect(() => {
        CompanyService.getAllCompanys().then((response) => { setCompanys(response.data.data) });
    }, [])

    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');

    function setCompanysList(data){
        if(data){
            data.map(company => {
                return <tr key={company.id}>
                    <td><input type="checkbox" disabled={company.status == "NEW" ? false : true} value={company.id} onChange={handleCheck}></input></td>
                    <td style={{ whiteSpace: 'nowrap' }}><Link to={"/companys/" + company.id} >{company.number}</Link></td>
                    <td>{company.name}</td>
                    <td>{company.active}</td>
                    <td>{company.description}</td>
                    <td>{company.followingCandidate.length}</td>
                    <td>{company.jobPostEntities.length}</td>
                    {/* <td>{company.startDate ? format(new Date(company.startDate), 'dd.MM.yyyy') : company.startDate}</td> */}
                    <td>
                        {company.active == false ? <Button className='btn-delete' onClick={() => remove(company.id)}><Trash /></Button> : ""}
                    </td>
                </tr>
            });        
        }
    }

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }
    async function handleSearch() {
        const { data } = await CompanyService.getCompanyByKeyWordAndStatus(keyword, status);
        console.log(data);
        setCompanys(data);
    }
    function remove(number) {
        CompanyService.deleteCompany(number).then(() => CompanyService.getAllCompanys().then((response) => { setCompanys(response.data) }));
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
            CompanyService.deleteCompany(item).then(() => CompanyService.getAllCompanys().then((response) => { setCompanys(response.data.data) }));
            var updatedList = [...checked];
            updatedList.splice(checked.indexOf(item), 1);
            setChecked(updatedList);
        })
    }
    const companyList = companys.map(company => {
        return <tr key={company.id}>
            <td><input type="checkbox" disabled={company.active == false ? false : true} value={company.id} onChange={handleCheck}></input></td>
            <td style={{ whiteSpace: 'nowrap' }}><Link to={"/companys/" + company.id} >{company.id}</Link></td>
            <td>{company.name}</td>
            <td>{company.active == false ? "INACTIVE" : "ACTIVE"}</td>
            <td>{company.description}</td>
            <td>{company.followingCandidate.length}</td>
            <td>{company.jobPostEntities.length}</td>
            {/* <td>{company.startDate ? format(new Date(company.startDate), 'dd.MM.yyyy') : company.startDate}</td> */}
            <td  style={{ textAlign: 'right' }}>
                {company.active == false ? <Button className='btn-delete' onClick={() => remove(company.id)}><Trash /></Button> : ""}
            </td>
        </tr>
    });        

    return (
        <div>
            <AccountNavbar />

            <div className="content">
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name">
                                <h1>Company List</h1>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col xl={11} className="search">
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-5">
                                        <input className='form-control' value={keyword} onChange={handleInputChange} placeholder='Company number, name' >
                                        </input>
                                    </div>
                                    <div className="col-md-3">
                                        <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value="" selected  >Company status</option>
                                            <option value="NEW">NEW</option>
                                            <option value="PLA">Planned</option>
                                            <option value="INP">In progress</option>
                                            <option value="FIN">Finished</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button submit" class="btn btn-primary" onClick={handleSearch}>Search Company</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-light">Reset Search</button>
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
                                        <th width="10%">Number</th>
                                        <th width="25%">Name</th>
                                        <th width="10%">Status</th>
                                        <th width="25%">Description</th>
                                        <th width="8%">Candidate</th>
                                        <th width="8%">JobPost</th>
                                        <th width="9%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyList}
                                    <tr>
                                        <td colspan="6">{checked.length} items selected</td>
                                        <td  style={{ textAlign: 'right' }} colspan="2" >delete selected items <Button className='btn-delete' onClick={() => removeSelected(checked)} ><Trash /></Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    );
}
export default CompanyList;