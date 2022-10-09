import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { faEdit, faLock, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import { updateUserProfile } from "../../actions/user-actions";
import "../../assets/img/photo-1431578500526-4d9613015464.jpeg";
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";

class UserProfile extends Component {
    state = {
        user_id: this.props.user_id,
        username: this.props.username,
        email: this.props.email,
        profileImage: this.props.profileImage,
        msg: this.props.msg,
        uploadedFile: null
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        const userData = {
            password: this.state.password,
            email: localStorage.getItem("email")
        };

        this.props.updateUserInfo(userData, this.props.history);
    }

    changeProfileImage = (event) => {

        this.setState({ uploadedFile: event.target.files[0] });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const userData = {
            password: this.state.password,
            email: localStorage.getItem("email")
        };

        this.props.updateUserProfile(userData, this.props.history);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="container d-flex">
                <AccountNavbar />
                <Container fluid>
                    <Row>
                        <Col md="9">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Edit Profile</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="First Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Last Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Education</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Education"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Work Status</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Work Status"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Phone number</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        disabled
                                                        placeholder="Phone number"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Username</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Username"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label htmlFor="exampleInputEmail1">
                                                        Email address
                                                    </label>
                                                    <Form.Control
                                                        placeholder="Email"
                                                        type="email"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>Address</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Home Address"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>City</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="City"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Country</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Country"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>Postal Code</label>
                                                    <Form.Control
                                                        placeholder="ZIP Code"
                                                        type="number"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>About Me</label>
                                                    <Form.Control
                                                        cols="80"
                                                        defaultValue={this.state.username}
                                                        placeholder="Here can be your description"
                                                        rows="4"
                                                        as="textarea"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                            onClick={this.onFormSubmit}>
                                            Update Profile
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card className="card-user">
                                <Card.Body>
                                    <div className="author">
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("../../assets/img/faces/face-3.jpg")}
                                        ></img>
                                        <h5 className="title">Name</h5>
                                    </div>
                                </Card.Body>
                                <hr></hr>
                                <div className="button-container mr-auto ml-auto">
                                    <Form.Group controlId="formCategory4">
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage} />
                                    </Form.Group>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

UserProfile.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { updateUserProfile })(UserProfile);
