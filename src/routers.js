import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import LoginForm from "./components/loginForm/loginForm";
import SearchResourceTemplate from "./components/search/resourceTemplate";
import ResourceTemplateList from "./components/resourceTemplate/resourceTemplateList";
import HomePage from "./components/home/home";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ResourceTemplateCreate from "./components/resourceTemplate/resourceTemplateCreate";
import GroupCreate from "./components/group/groupCreate";


class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/search" component={SearchResourceTemplate}/>
                    <Route path="/resources" component={ResourceTemplateList}/>
                    <Route path="/resource/create" component={ResourceTemplateCreate}/>
                    <Route path="/groups" component={GroupCreate}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}

export default Routers;
