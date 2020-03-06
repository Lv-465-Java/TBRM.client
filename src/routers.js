import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
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
import ResourceTemplateView from "./components/resourceTemplate/resourceTemplateView";
import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler";
import PermissionResourceTemplateList from "./components/permissions/permissionResourceTemplateList";
import PermissionResourceTemplateAdd from "./components/permissions/permissionResourceTemplateAdd";
import PermissionResourceTemplateRemove from "./components/permissions/permissionResourcetemplateRemove";
import PermissionResourceTemplateChangeOwner from "./components/permissions/permissionResourceTemplateChangeOwner";
import ForgotPasswordMessage from "./components/resetPassword/ForgotPasswordMessage";
import ProfileForm from "./components/profile/ProfileForm";
import GroupList from "./components/group/groupList";
import GroupItem from "./components/group/groupItem";
import EditGroup from "./components/group/editGroup";
import AddPermission from "./components/group/addPermission";
import FullOAuthRegister from "./components/oauth2/FullOAuthRegister";
import ResourceRecordView from "./components/resourceRecord/ResourceRecordView";
import TestMaps from "./components/resourceParameters/GoogleMap";
import ResourceTemplateItem from "./components/resourceTemplate/resourceTemplateItem";
import ResourceRecordItemView from "./components/resourceRecord/ResourceRecordItemView";
import ResourceRecordCreate from "./components/resourceRecord/ResourceRecordCreate";



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
                    <Route path="/resource-template/permission/remove/:id" component={PermissionResourceTemplateRemove} />
                    <Route path="/resource-template/permission/owner/:id" component={PermissionResourceTemplateChangeOwner} />
                    <Route path="/resource-template/permission/:id" component={PermissionResourceTemplateList} />
                    <Route path="/resource-template" component={ResourceTemplateList} />
                    <Route path="/resource/view/:tableName/:recordId" component={ResourceRecordItemView} />
                    <Route path="/resource/:tableName" component={ResourceRecordView} />
                    <Route path="/resource/create" component={ResourceRecordCreate} />
                    <Route path="/test-maps" component={TestMaps} />
                    <Route path="/forgot_password/:email" component={ForgotPasswordMessage} />
                    <Route path="/group/edit/:name" component={EditGroup}/>
                    <Route path="/group/view/:name" component={GroupItem}/>
                    <Route path="/group/permission/:id" component={AddPermission}/>
                    <Route path="/group" component={GroupList}/>
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                    <Route path="/oauth2/fullRegister" component={FullOAuthRegister}/>
                    <Route path="/" exact component={LoginForm} />
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default Routers;
