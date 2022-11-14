import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {IMG_URL} from "../../utils/constants/url";
import Spinner from "../Spinner/Spinner";
import CompanyLogo from "../../pages/images/company-logo.png";

const PerfumeCardItem = ({job, colSize, link, btnName1, btnName2}) => {
    const [load, setLoad] = useState(false);

    return (
        <div className={`col-lg-${colSize} d-flex align-items-stretch`}>
            <div className="card mb-10">
                {load ? null :
                    <div className="d-block mx-auto w-100">
                        <Spinner/>
                    </div>
                }
                
                <img onLoad={() => setLoad(true)}
                     className="mx-auto w-100"
                     style={{display: load ? "block" : "none"}}
                     src={job.logo ? job.logo : CompanyLogo}/>
                <div className="card-body text-center">
                    <h6 color='blue'>{job.title}</h6>
                    <br></br>
                    <h7>Quantity: {job.quantity}</h7>
                    <br></br>
                    <h7>Deadline: {job.dueTime}</h7>
                    <br></br>
                    <h7>Experience: {job.experienceYear}</h7>
                    <br></br>
                    <h7>Education: {job.educationLevel}</h7>
                    <br></br>
                    <h7><span>${job.minBudget}-{job.maxBudget}</span>.00</h7>
                </div>
                <div className="text-center align-items-end mb-1">
                    <Link to={`${link}/${job.id}`}>
                        <span className="btn btn-dark">{btnName1}</span>
                    </Link>
                </div>
                <div className="text-center align-items-end mb-1">
                    <Link to={`${link}/${job.id}`}>
                        <span className="btn btn-dark">{btnName2}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PerfumeCardItem;