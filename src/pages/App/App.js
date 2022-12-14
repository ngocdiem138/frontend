import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Menu from "../Menu/Menu";
import Contacts from "../Contacts/Contacts";
import Footer from "../../component/Footer/Footer";
import Home from "../Home/Home";
import NavBar from "../../component/NavBar/NavBar";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Product from "../Perfume/Perfume";
import Account from "../Account/Account";
import JobSave from "../JobSave/JobSave";
import Order from "../Order/Order";
import OrderFinalize from "../OrderFinalize/OrderFinalize";
import AddProduct from "../AddProduct/AddProduct";
import OrdersList from "../OrdersList/OrdersList";
import UserList from "../UserList/UserList";
import CompanyList from "../CompanyList/CompanyList";
import EditUser from "../EditUser/EditUser";
import EditPerfumesList from "../EditPerfumesList/EditPerfumesList";
import EditPerfume from "../EditPerfume/EditPerfume";
import UserJobsList from "../UserOrdersList/UserOrdersList";
import UserProfile from "../UserProfile/UserProfile";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Resumes from '../Resumes/Resumes';
import AddCompanyComponent from '../AddCompany/AddCompany';
import AddAccountComponent from '../AddAccount/AddAccount';
import JobPage from '../Home/JobPage'
import Page404 from '../Page404/404';
import SkillList from '../SkillList/SkillList';
import ViewAppliedJobs from '../Home/ViewAppliedJobs'
import ViewCreatedJobs from '../Home/ViewCreatedJobs'
import { validatePostNewJob } from '../../utils/Helpers';
import PostNewJob from '../Home/PostNewJob'
import EmployerLanding from '../EmployerLanding/EmployerLanding';
import Register from '../RegisterOfUser/Register';
import ViewApplication from '../ViewApplication/ViewApplication';

class App extends Component {
    render() {
        const isAdmin = localStorage.getItem("userRole") === "ADMIN";
        const isEmployer = localStorage.getItem("userRole") === "EMPLOYER";
        const isCandidate = localStorage.getItem("userRole") === "CANDIDATE";
        const isUser = localStorage.getItem("userRole") === "USER";
        return (
            <div>
                <NavBar />
                <Switch paddingTop={500}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/forgot" component={ForgotPassword} />
                    <Route exact path="/reset/:code" component={ResetPassword} />
                    <Route exact path="/activate/:code" component={Login} />
                    <Route exact path="/menu" component={Menu} />
                    <Route exact path="/product/:id" component={Product} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/resumes" component={Resumes} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/jobs" render={() => (isCandidate) ?
                        (<Route component={JobSave} />) : (<Route component={Login} />)} />
                    <Route exact path="/order" component={Order} />
                    <Route exact path="/order/finalize" component={OrderFinalize} />
                    <Route exact path="/admin/add" render={() => (isAdmin) ?
                        (<Route component={AddProduct} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/orders" render={() => (isAdmin) ?
                        (<Route component={OrdersList} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/companys/all" render={() => (isAdmin) ?
                        (<Route component={CompanyList} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/skills/all" render={() => (isAdmin) ?
                        (<Route component={SkillList} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/companys/addOrUpdateCompany/:id" render={() => (isAdmin) ?
                        (<Route component={AddCompanyComponent} />) : (<Route component={Home} />)} />
                    <Route exact path="/employer/jobPost/:id" render={() => (isEmployer) ?
                        (<Route component={PostNewJob} />) : (<Route component={Home} />)} />
                    <Route exact path="/employer/dashboard" render={() => (isEmployer) ?
                        (<Route component={EmployerLanding} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/accounts/addOrUpdateAccount/:id" render={() => (isAdmin) ?
                        (<Route component={AddAccountComponent} />) : (<Route component={Home} />)} />
                    <Route exact path="/common/job-post/get-one/:id" component={JobPage} />
                    <Route exact path="/admin/users/all" render={() => (isAdmin) ?
                        (<Route component={UserList} />) : (<Route component={Home} />)} />
                    <Route exact path="/admin/user/:id" render={() => (isAdmin) ?
                        (<Route component={EditUser} />) : (<Route component={Home} />)} />
                    <Route exact path="/product/list/edit" render={() => (isAdmin) ?
                        (<Route component={EditPerfumesList} />) : (<Route component={Home} />)} />
                    <Route exact path="/product/list/edit/:id" render={() => (isAdmin) ?
                        (<Route component={EditPerfume} />) : (<Route component={Home} />)} />
                    <Route exact path="/user/editPassword" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={ResetPassword} />) : (<Route component={Home} />)} />
                    <Route exact path="/candidate/jobs" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={ViewAppliedJobs} />) : (<Route component={Home} />)} />
                    <Route exact path="/employer/jobs" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={ViewCreatedJobs} />) : (<Route component={Home} />)} />
                    <Route exact path="/registerOfUser" render={() => (isUser) ?
                        (<Route component={Register} />) : (<Route component={Home} />)} />
                    <Route exact path="/employer/viewApplication/:id" render={() => (isEmployer) ?
                        (<Route component={ViewApplication} />) : (<Route component={Home} />)} />
                    {/* <Route exact path="/user/orders" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={UserOrdersList} />) : (<Route component={Home} />)} /> */}
                    <Route exact path="/user/profile" render={() => localStorage.getItem("isLoggedIn") ?
                        (<Route component={UserProfile} />) : (<Route component={Home} />)} />
                    <Route path="*" component={Page404} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
