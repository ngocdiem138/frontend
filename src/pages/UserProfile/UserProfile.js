import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllUsersOrders } from "../../actions/admin-actions";
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import Skill from "../../component/Skill/Skill";
import Experience from "../../component/Experience/Experience";
import "../../assets/img/photo-1431578500526-4d9613015464.jpeg";
import "./UserProfile.css";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { printError, removeError } from "../../utils/Helpers";
import axios from "axios";
import Editor from "../Home/widgets/Editor";
import JobseekerProfile from "../images/jobseeker-profile.png";
import { ProfileImg } from "../../component/Styles";
import { API_BASE_URL } from '../../utils/constants/url';

const userRole = localStorage.getItem('userRole')
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            phone: "",
            profile: "",
            cv: "",
            active: false,
            avatar: "Upload avatar (jpg, png)",
            cv_label: "Upload Cv (pdf)",
        };
    }

    componentDidMount() {
        axios
            .get(API_BASE_URL + "/user/profile", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                if (response.data.data) {
                    this.setState({
                        ...response.data.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const apiPath = API_BASE_URL;
        removeError();
        let formData = new FormData(document.getElementById("edit-jobseeker"));
        let activeValue = document.querySelector('input[name="active"]:checked').value;
        formData.append("active", activeValue);

        const put_api = "/user/"
        console.log('Form data', formData);
        // axios({
        //     method: "POST",
        //     url: API_BASE_URL + "/common/register",
        //     data: data,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     }
        // });
        const response = await axios({
            method: "PUT",
            url: API_BASE_URL + "/user/" + this.state.id,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        
            .then((response) => {
                if (response.data.status == 200) {
                    //show success message
                    alert("Successfuly edited profile");

                    //update profile and cover
                    const { profile, cover } = response.data.user;
                    this.props.changeProfile(profile, cover);

                    //reset placeholder of profile and cv
                    this.setState({
                        avatar: "Upload profile (jpg, png)",
                    });

                    this.setState({
                        cv_label: "Upload Cv (pdf)",
                    });
                } else {
                    //show failure message
                    alert("Request Failed");
                }
            })
            .catch((error) => {
                //show erros message
                console.log(error);
                if (error.response && error.response.status === 422) {
                    alert("Please correct highlighted erros");
                    printError(error.response.data);
                }
            });
    };

    changeProfileLabel = (e) => {
        if (e.target.files.length > 0) {
            this.setState({
                avatar: e.target.files[0].name,
            });
        } else {
            this.setState({
                avatar: "Upload profile (jpg, png)",
            });
        }
    };

    changeCVLabel = (e) => {
        if (e.target.files.length > 0) {
            this.setState({
                cv_label: e.target.files[0].name,
            });
        } else {
            this.setState({
                cv_label: "Upload Cv (pdf)",
            });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "profile") {
            this.changeProfileLabel(e);
        }

        if (e.target.name === "cv") {
            this.changeCVLabel(e);
        }

        const errMsg = e.target.nextSibling || null;
        if (errMsg && errMsg.classList.contains("is-invalid")) {
            errMsg.remove();
        }
    };

    updateDescription = (value) => {
        if (value) this.setState({ description: value });
    };



    render() {
        return (
            <div className="container d-flex" style={{ minWidth: "90vw" }}>
                <AccountNavbar />
                <div className="content" style={{ minWidth: "82%", background: "#FFFFFF" }}>
                    <Container fluid>
                        <Row>
                            <Col md="9">
                                <div
                                    className="job-applied-wrapper table-responsive-md edit-profile-form-wrap container"
                                    id="edit-company-profile"
                                >
                                    <form
                                        onSubmit={this.handleSubmit}
                                        encType="multipart/form-data"
                                        id="edit-jobseeker"
                                    >
                                        <div className="row my-30" style={{ marginTop: "5%" }}>
                                            <div className="col-lg-6">
                                                <input
                                                    style={{ marginLeft: "-5%" }}
                                                    type="text"
                                                    name="username"
                                                    className="form-control p-3"
                                                    placeholder="User name"
                                                    value={this.state.username || ""}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 mt-4 mt-lg-0">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control p-3"
                                                    placeholder="Last Name"
                                                    value={this.state.email || ""}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row my-30" style={{ marginTop: "5%" }}>
                                            <div className="col-lg-6">
                                                <input
                                                    style={{ marginLeft: "-5%" }}
                                                    type="text"
                                                    name="phone"
                                                    className="form-control p-3"
                                                    placeholder="Contact Number"
                                                    value={this.state.phone || ""}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="col-lg-6 mt-4 mt-lg-0">
                                                <div className="row no-gutters mt-lg-2">
                                                    <label className="radio-wrapper col-3  ml-5  ml-lg-4">
                                                        <input
                                                            disabled={true}
                                                            type="radio"
                                                            name="active"
                                                            value="true"
                                                            onChange={this.onChange}
                                                            checked={this.state.active === true ? true : false}
                                                        />
                                                        <span className="checkmark"></span>
                                                        Active
                                                    </label>
                                                    <label className="radio-wrapper col-3">
                                                        <input
                                                            disabled={true}
                                                            type="radio"
                                                            name="active"
                                                            value="false"
                                                            checked={this.state.active === false ? true : false}
                                                            onChange={this.onChange}
                                                        />
                                                        <span className="checkmark"></span>
                                                        Inactive
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group my-30">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    name="profile"
                                                    onChange={this.onChange}
                                                />
                                                <label className="custom-file-label" htmlFor="customFile">
                                                    {this.state.avatar}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group my-30">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    name="cv"
                                                    onChange={this.onChange}
                                                />
                                                <label className="custom-file-label" htmlFor="customFile">
                                                    {this.state.cv_label}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-submit mt-30 mb-3">
                                            <button type="submit" className="post-job-btn b-0 px-3 primary">
                                                Edit profile
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="profile-pic" id="profilePic">
                                    <ProfileImg src={
                                        this.state.profile ? this.state.profile : JobseekerProfile
                                    }></ProfileImg>
                                </div>
                            </Col>
                        </Row>


                        {userRole === 'CANDIDATE' ? <Row>
                            <Col md="12">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h2">Experience</Card.Title>
                                    </Card.Header>
                                    <Experience />
                                </Card>
                            </Col>
                        </Row> :

                            ""}
                    </Container>
                </div>
            </div >
        );
    }
}

UserProfile.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    fetchAllUsersOrders: PropTypes.func.isRequired,
    skill: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    skill: state.admin.orders,
});

export default connect(mapStateToProps, { fetchAllUsersOrders })(UserProfile);
