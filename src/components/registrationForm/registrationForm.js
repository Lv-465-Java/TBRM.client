import React, { Component } from "react";
import TextField from "../inputField/inputField";
import Button from '@material-ui/core/Button';
import axios from "../../utils/axios";
import { makeStyles } from '@material-ui/core/styles';


class RegistrationForm extends Component{

    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
       confirmationPassword: undefined,
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

    onChangeConfirmationPassword = (event) => {
        this.setState({
            confirmationPassword: event.target.value
        })
    }
    getData =() => {
        axios.post("/registration", this.state).then(response => {
            this.props.history.push("/");
        }, error => {

        })
    }

    render(){
        return (
            <div>
                <div>{this.state.firstName}</div>
                <div>{this.state.lastName}</div>
                <div>{this.state.email}</div>
                <div>{this.state.phone}</div>
                <div>{this.state.password}</div>
                <div>{this.state.confirmationPassword}</div>
                <TextField type="firstName" label="firstName"  onChange={this.onChangeFirstName}/>
                <TextField type="lastName" label="lastName" onChange={this.onChangeLastName}/>
                <TextField type="email" label="email"  onChange={this.onChangeEmail}/>
                <TextField type="phone" label="phone" onChange={this.onChangePhone}/>
                <TextField type="password" label="password" onChange={this.onChangePassword}/>
                <TextField type="password" label="confirmationPassword" onChange={this.onChangeConfirmationPassword}/>
                <Button variant="contained" color="primary" onClick={this.getData}>Sign up
                </Button>
            </div>
        );
    }

}
export default RegistrationForm;