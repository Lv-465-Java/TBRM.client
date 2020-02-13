import React, { Component } from "react";
import TextField from "../inputField/inputField";


class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined
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
        </div>
        );
    }

}

export default LoginForm;