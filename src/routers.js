
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import LoginForm from "./components/loginForm/loginForm";
import SearchResourceTemplate from "./components/search/resourceTemplate";


class Routers extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginForm}/>
                    <Route path="/search" component={SearchResourceTemplate}/>
                    <Route path="/"/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routers;
