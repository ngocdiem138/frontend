import React from "react";
import { Link } from "react-router-dom";
import { faList, faLock, faPlusSquare, faShoppingBag, faUsers, faHistory, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../pages/Menu/MenuStyle.css";
import UserProfile from "../Profile/UserProfile";

const AccountNavbar = () => {
    return (
        <nav id="sidebar">
            {(localStorage.getItem("userRole") === "ADMIN") ?
                <ul className="navbar-nav list-unstyled components">
                    <li className="nav-item">
                        <Link to={"/admin/orders"} className="nav-link text-light mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />List of all orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/admin/users/all"} className="nav-link text-light mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faUsers} />List of all users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/admin/add"} className="nav-link text-light mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faPlusSquare} />Add perfume</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/product/list/edit"} className="nav-link text-light mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faList} />List of perfumes</Link>
                    </li>
                </ul>
                :
                <ul className="list-unstyled ">
                    <li className="mb-2">
                        <Link to={"/user/edit"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faLock} />Change password</Link>
                    </li>
                    <li className="mb-2">
                        <Link to={"/user/orders"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faHistory} />History</Link>
                    </li>
                    <li className="mb-2">
                    {/* <Route path="/userprofile" component={UserProfile}/> */}
                        <Link to={"/user/profile"} className="nav-link mx-3">
                            <FontAwesomeIcon className="mr-2" icon={faHouseUser} />Profile</Link>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default AccountNavbar;