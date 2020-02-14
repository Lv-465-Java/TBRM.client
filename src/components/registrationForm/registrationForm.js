import React, { Component } from "react";
import TextField from "../inputField/inputField";

class RegistrationForm extends Component{

    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        confPassword: undefined
    }
    onChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    onChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    onChangePhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangeConfPassword = (event) => {
        this.setState({
            confPassword: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>{this.state.firstName}</div>
                <div>{this.state.lastName}</div>
                <div>{this.state.email}</div>
                <div>{this.state.phone}</div>
                <div>{this.state.password}</div>
                <div>{this.state.confPassword}</div>
                <TextField type="firstName" label="firstName" onChange={this.onChangeFirstName}/>
                <TextField type="lastName" label="lastName" onChange={this.onChangeLastName}/>
                <TextField type="email" label="email" onChange={this.onChangeEmail}/>
                <TextField type="phone" label="phone" onChange={this.onChangePhone}/>
                <TextField type="password" label="password" onChange={this.onChangePassword}/>
                <TextField type="confPassword" label="confPassword" onChange={this.onChangeConfPassword}/>
            </div>
        );
    }

}
export default RegistrationForm;