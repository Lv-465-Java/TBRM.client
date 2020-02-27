
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import LoginForm from "./components/loginForm/loginForm";
import SearchResourceTemplate from "./components/search/resourceTemplate";
import RegistrationForm from "./components/registrationForm/registrationForm";
import ResourceTemplateList from "./components/resourceTemplate/resourceTemplateList";
import HomePage from "./components/home/home";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ResourceTemplateCreate from "./components/resourceTemplate/resourceTemplateCreate";
import ResetPassword from "./components/resetPassword/resetPassword";
import ForgotPassword from "./components/resetPassword/forgotPassword";
import ResourceTemplateUpdate from "./components/resourceTemplate/resourceTemplateUpdate";
import ResourceTemplateView from "./components/resourceTemplate/resourcetemplateView";
import PermissionResourceTemplateList from "./components/permissions/permissionResourceTemplateList";
import PermissionResourceTemplateAdd from "./components/permissions/permissionResourceTemplateAdd";
import {Message} from "@material-ui/icons";
import ForgotPasswordMessage from "./components/resetPassword/ForgotPasswordMessage";
import ProfileForm from "./components/profile/ProfileForm";




class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/search" component={SearchResourceTemplate} />
                    <Route path="/registration" component={RegistrationForm}/>
                    <Route path="/reset_password" component={ResetPassword} />
                    <Route path="/profile" component={ProfileForm} />
                    <Route path="/forgot_password" exact component={ForgotPassword} />
                    <Route path="/resource-template/create" component={ResourceTemplateCreate} />
                    <Route path="/resource-template/update/:id" component={ResourceTemplateUpdate} />
                    <Route path="/resource-template/view/:id" component={ResourceTemplateView} />
                    <Route path="/resource-template/permission/add/:id" component={PermissionResourceTemplateAdd} />
                    <Route path="/resource-template/permission/:id" component={PermissionResourceTemplateList} />
                    <Route path="/resource-template" component={ResourceTemplateList} />
                    <Route path="/forgot_password/:email" component={ForgotPasswordMessage} />
                    <Route path="/" exact component={LoginForm} />
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}
export default Routers;
