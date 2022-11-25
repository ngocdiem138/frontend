import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { API_BASE_URL, IMG_URL } from "../../utils/constants/url";
import Spinner from "../../component/Spinner/Spinner";
import { fetchSaveJob, removeFromSaveJob, applyToSaveJob } from "../../actions/job-actions";
import { faStreetView, faMinusSquare, faShoppingBag, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobPostLogo from "../images/jobpost-logo.jpg";

class JobSave extends Component {

    componentDidMount() {
        this.props.fetchSaveJob();
    }

    removeFromSaveJob = (jobPostId) => {
        const jobPost = this.props.saveJobItems.find((jobPost) => jobPost.id === jobPostId);

        this.props.removeFromSaveJob(jobPost);
        window.location.reload();
    };

    applyToSaveJob = (jobPostId) => {
        const jobPost = this.props.saveJobItems.find((jobPost) => jobPost.id === jobPostId);

        this.props.applyToSaveJob(jobPost);
    };

    render() {
        const { saveJobItems, loading } = this.props;
        let totalSaveJob = saveJobItems? saveJobItems.length :0;

        return (
            <div className="container mt-5 pb-5">
                {loading ? <Spinner /> :
                    <div>
                        {saveJobItems &&saveJobItems.length === 0 ?
                            <div style={{ textAlign: "center" }}>
                                <h2>Saved Job is empty</h2>
                            </div> :
                            <div>
                                <p className="h2 mb-4 text-center">
                                    <FontAwesomeIcon className="mr-2" icon={faSave} /> Saved Job
                                </p>
                                {saveJobItems.map((jobPost) => {
                                    return (
                                        <div key={jobPost.id} className="card mb-3 mx-auto" style={{ maxWidth: "940px" }}>
                                            <div className="row no-gutters">
                                                <div className="col-3 ml-3 mt-3">
                                                    <img src={jobPost.logo ? jobPost.logo : JobPostLogo}
                                                        className="rounded mx-auto w-50" />
                                                </div>
                                                <div className="col-6">
                                                    <div className="card-body">
                                                        <h4 className="card-title">{jobPost.title}</h4>
                                                        <p className="card-text">{jobPost.employmentType}</p>
                                                        <p className="card-text"><span>$ {jobPost.minBudget} - {jobPost.maxBudget}</span></p>
                                                        <p className="card-text"><span>Education Level: {jobPost.educationLevel}</span></p>
                                                        <p className="card-text"><span>Address: {jobPost.address}</span></p>
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="card-body">
                                                        <h5 className="card-title"><span>Quantity: {jobPost.quantity}</span></h5>
                                                        <button className="btn btn-success mb-2"
                                                            onClick={() => this.applyToSaveJob(jobPost.id)}>
                                                            <FontAwesomeIcon className="mr-2" icon={faShoppingBag} /> Apply
                                                        </button>
                                                        <button className="btn btn-warning mb-2"
                                                            onClick={() => this.removeFromSaveJob(jobPost.id)}>
                                                            <FontAwesomeIcon className="mr-2" icon={faMinusSquare} /> Remove
                                                        </button>
                                                        <button className="btn btn-info mb-2">
                                                            <Link className="text-white" to={`/common/job-post/get-one/${jobPost.id}`}>
                                                                <FontAwesomeIcon className="mr-2" icon={faStreetView} /> View
                                                            </Link>
                                                        </button>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <hr className="my-3" />
                                <div className="row">
                                    <div className="col-10">
                                        <p className="h5 text-right">Total:<span>{totalSaveJob}</span></p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

JobSave.propTypes = {
    fetchSaveJob: PropTypes.func.isRequired,
    removeFromSaveJob: PropTypes.func.isRequired,
    applyToSaveJob: PropTypes.func.isRequired,
    saveJobItems: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    saveJobItems: state.saveJob.saveJobItems,
    loading: state.saveJob.loading
});

export default connect(mapStateToProps, { fetchSaveJob, removeFromSaveJob, applyToSaveJob })(JobSave);
