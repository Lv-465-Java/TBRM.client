
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


class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/search" component={SearchResourceTemplate} />
                    <Route path="/resource/create" component={ResourceTemplateCreate} />
                    <Route path="/resource/update/:id" component={ResourceTemplateUpdate} />
                    <Route path="/resource" component={ResourceTemplateList} />
                    <Route path="/" exact component={LoginForm} />
                </Switch>
                <Footer/>
            </BrowserRouter>
        );
    }
}
export default Routers;
