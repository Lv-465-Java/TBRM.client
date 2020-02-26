
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import LoginForm from "./components/loginForm/loginForm";
import SearchResourceTemplate from "./components/search/resourceTemplate";
import ResourceTemplateList from "./components/resourceTemplate/resourceTemplateList";
import HomePage from "./components/home/home";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ResourceTemplateCreate from "./components/resourceTemplate/resourceTemplateCreate";
import ResourceTemplateUpdate from "./components/resourceTemplate/resourceTemplateUpdate";
import ResourceTemplateView from "./components/resourceTemplate/resourcetemplateView";
import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler";
import PermissionResourceTemplateList from "./components/permissions/permissionResourceTemplateList";
import PermissionResourceTemplateAdd from "./components/permissions/permissionResourceTemplateAdd";
import FullOAuthRegister from "./components/oauth2/FullOAuthRegister";



class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/search" component={SearchResourceTemplate} />
                    <Route path="/resource-template/create" component={ResourceTemplateCreate} />
                    <Route path="/resource-template/update/:id" component={ResourceTemplateUpdate} />
                    <Route path="/resource-template/view/:id" component={ResourceTemplateView} />
                    <Route path="/resource-template/permission/add/:id" component={PermissionResourceTemplateAdd} />
                    <Route path="/resource-template/permission/:id" component={PermissionResourceTemplateList} />
                    <Route path="/resource-template" component={ResourceTemplateList} />
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                    <Route path="/oauth2/fullRegister" component={FullOAuthRegister}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}
export default Routers;
