import React from "react";
import { Link } from "react-router-dom";
import { faChalkboard, faList, faLock, faUsers, faHistory, faHouseUser, faStickyNote, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../pages/Menu/MenuStyle.css";

const AccountNavbar = () => {
    return (
        <nav id="sidebar" style={{ marginLeft: "1vw" }}>
            {(localStorage.getItem("userRole") === "ADMIN") ?
                <ul className="list-unstyled">
                    <li className="mb-2">
                        <Link to={"/admin/users/all"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faUsers} />List of all user</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/admin/companys/all"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faList} />List of all company</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/admin/skills/all"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faList} />List of all skill</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/admin/positions/all"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faList} />List of all position</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/admin/companys/validate"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faStickyNote} />List company validate</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/user/editPassword"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faLock} />Change password</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/user/profile"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faHouseUser} />Profile</Link>
                    </li>
                </ul>
                : (localStorage.getItem("userRole") === "EMPLOYER") ?
                    <ul className="list-unstyled ">
                        <li className="mb-2">
                            <Link to={"/employer/dashboard"} className="nav-link mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faChalkboard} />Dashboard</Link>
                        </li>

                        <li className="mb-2">
                            <Link to={"/employer/jobs"} className="nav-link mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faList} />List of all JobPost</Link>
                        </li>
                        <li className="mb-2">
                            <Link to={"/employer/jobPost/new"} className="nav-link mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faKeyboard} />Create new JobPost</Link>
                        </li>
                        <li className="mb-2">
                            <Link to={"/user/editPassword"} className="nav-link mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faLock} />Change password</Link>
                        </li>
                        <li className="mb-2">
                            <Link to={"/user/profile"} className="nav-link mx-3">
                                <FontAwesomeIcon className="mr-2" icon={faHouseUser} />Profile</Link>
                        </li>
                    </ul>
                    : (localStorage.getItem("userRole") === "CANDIDATE") ?
                        <ul className="list-unstyled ">
                            <li className="mb-2">
                                <Link to={"/candidate/jobs"} className="nav-link mx-3">
                                    <FontAwesomeIcon className="mr-2" icon={faHistory} />View Applied Jobs</Link>
                            </li>
                            <li className="mb-2">
                                <Link to={"/user/editPassword"} className="nav-link mx-3">
                                    <FontAwesomeIcon className="mr-2" icon={faLock} />Change password</Link>
                            </li>
                            <li className="mb-2">
                                <Link to={"/user/profile"} className="nav-link mx-3">
                                    <FontAwesomeIcon className="mr-2" icon={faHouseUser} />Profile</Link>
                            </li>
                        </ul>
                        : <ul className="list-unstyled ">
                            <li className="mb-2">
                                <Link to={"/user/editPassword"} className="nav-link mx-3">
                                    <FontAwesomeIcon className="mr-2" icon={faLock} />Change password</Link>
                            </li>
                            <li className="mb-2">
                                <Link to={"/user/profile"} className="nav-link mx-3">
                                    <FontAwesomeIcon className="mr-2" icon={faHouseUser} />Profile</Link>
                            </li>
                        </ul>
            }
        </nav>
    )
}

export default AccountNavbar;