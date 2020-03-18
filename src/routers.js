import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import LoginForm from "./components/loginForm/loginForm";
import SearchResourceTemplate from "./components/search/resourceTemplate";
import RegistrationForm from "./components/registrationForm/registrationForm";
import ResourceTemplateList from "./components/resourceTemplate/resourceTemplateList";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ResourceTemplateCreate from "./components/resourceTemplate/resourceTemplateCreate";
import ResetPassword from "./components/resetPassword/resetPassword";
import ForgotPassword from "./components/resetPassword/forgotPassword";
import ResourceTemplateUpdate from "./components/resourceTemplate/resourceTemplateUpdate";
import ResourceTemplateView from "./components/resourceTemplate/resourceTemplateView";
import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler";
import ForgotPasswordMessage from "./components/resetPassword/ForgotPasswordMessage";
import ProfileForm from "./components/profile/ProfileForm";
import GroupItem from "./components/permissions/group/groupItem";
import EditGroup from "./components/permissions/group/editGroup";
import AddPermission from "./components/permissions/group/addPermission";
import FullOAuthRegister from "./components/oauth2/FullOAuthRegister";
import { getUserRole, isUserLoggedIn } from './service/authService';
import Forbidden from "./hoc/forbidden";
import GuestPage from "./components/guest";
import ResourceRecordView from "./components/resourceRecord/ResourceRecordView";
import TestMaps from "./components/resourceParameters/GoogleMap";
import ResourceRecordItemView from "./components/resourceRecord/ResourceRecordItemView";
import ResourceRecordCreate from "./components/resourceRecord/ResourceRecordCreate";
import ResourceRecordUpdate from "./components/resourceRecord/ResourceRecordUpdate";
import GroupChangeOwner from "./components/permissions/group/groupChangeOwner";
import AdminPage from "./components/adminPage/adminPage";
import UserList from "./components/user/userList";
import PermissionResourceTemplate from "./components/permissions/permissionResourceTemplate";

import FilterView from "./components/resourceRecord/filters/filterView";
import TenantList from "./components/tenant/tenantList";

const ProtectedRoute
    = ({ isAllowed, ...props }) =>
        !isUserLoggedIn() || getUserRole() === "ROLE_GUEST"
            ? <Forbidden />
            : <Route {...props} />;

const AdminRoute
    = ({ isAllowed, ...props }) =>
        getUserRole() === "ROLE_ADMIN"
            ? <Route {...props} />
            : <Forbidden />;

const ManagerRoute
    = ({ isAllowed, ...props }) =>
        getUserRole() === "ROLE_MANAGER"
            ? <Route {...props} />
            : <Forbidden />;

const RegisterRoute
    = ({ isAllowed, ...props }) =>
    getUserRole() === "ROLE_REGISTER"
        ? <Route {...props} />
        : <Forbidden />;

const GuestRoute
    = ({ isAllowed, ...props }) =>
    getUserRole() === "ROLE_GUEST"
        ? <Route {...props} />
        : <Forbidden />;

const ResourceRoute
    = ({ isAllowed, ...props }) =>
        getUserRole() === "ROLE_MANAGER" || getUserRole() === "ROLE_REGISTER"
         || getUserRole() === "ROLE_USER"
            ? <Route {...props} />
            : <Forbidden />;

class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/search" component={SearchResourceTemplate} />
                    <Route path="/registration" component={RegistrationForm}/>
                    <Route path="/reset_password" component={ResetPassword} />
                    <ProtectedRoute path="/profile" component={ProfileForm} />
                    <AdminRoute path="/admin-panel" component={UserList}/>
                    <Route path="/forgot_password" exact component={ForgotPassword} />
                    <ManagerRoute path="/resource-template/create" component={ResourceTemplateCreate} />
                    <ManagerRoute path="/resource-template/update/:id" component={ResourceTemplateUpdate} />
                    <ManagerRoute path="/resource-template/view/:id" component={ResourceTemplateView} />
                    <ManagerRoute path="/resource-template/permission/:id" component={PermissionResourceTemplate} />
                    <ResourceRoute path="/resource-template" component={ResourceTemplateList} />
                    <ResourceRoute path="/resource/:tableName" component={ResourceRecordView}/>
                    <Route path="/test-maps" component={TestMaps} />
                    <Route path="/forgot_password/:email" component={ForgotPasswordMessage} />
                    <ManagerRoute path="/group/edit/:id/:name" component={EditGroup} />
                    <ManagerRoute path="/group/view/:id/:name" component={GroupItem} />
                    <ManagerRoute path="/group/permission/owner/:name" component={GroupChangeOwner} />
                    <ManagerRoute path="/group/permission/:id" component={AddPermission} />
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                    <Route path="/oauth2/fullRegister" component={FullOAuthRegister} />
                    <GuestRoute path="/welcome" component={GuestPage} />
                    <Route path="/FilterView" component={FilterView} />
                    <Route path="/super-admin" component={TenantList} />
                    <Route path="/" exact component={LoginForm} />
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default Routers;
