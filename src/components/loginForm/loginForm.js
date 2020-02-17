import React, { Component } from "react";
import TextField from "../inputField/inputField";
// import Axios from "axios";
//import Axios from "axios";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";


class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined
    }

    getData =() =>{
        axios.post("/authentication", this.state).then(response => {

    })
    
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    

    render() {
        return (
        <div>
            <div>{this.state.email}</div>
            <div>{this.state.password}</div>
            <TextField type="email" label="email" onChange={this.onChangeEmail}/>
            <TextField type="password" label="password" onChange={this.onChangePassword}/>
            <Button onClick={this.getData}>Login</Button>

            <h6>Log in using your account on </h6>
            <div className = "col-md-6">
            <div className = "row">
                <a className="btn btn-secondary btn-block" href={GOOGLE_AUTH_URL} title="Google">
            <img  src = "http://pngimg.com/uploads/google/google_PNG19635.png" alt="" height="24" width="24"/>
            Google
                </a>
        </div>
            </div>
        </div>
        );
    }

}

export default LoginForm;