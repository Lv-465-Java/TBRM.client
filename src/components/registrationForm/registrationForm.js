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
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false

       // validFirstName: this.validate(this.props.firstName)

    }

    validate(name){
        return name.trim().length>0
    }
    onChangeFirstName = (event) => {
        //const valid = this.validate(event.target.value);
        this.setState({
            firstName: event.target.value,
           // validFirstName:valid
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

        }).catch(error => {
            console.log('Error', error.message);
        });
        this.props.history.push("/")
    }

    render(){
        //var color = this.state.valid===true?"green":"red";
        return (
            <div>
                <div>{this.state.firstName}</div>
                <div>{this.state.lastName}</div>
                <div>{this.state.email}</div>
                <div>{this.state.phone}</div>
                <div>{this.state.password}</div>
                <div>{this.state.confirmationPassword}</div>
                <TextField type="firstName" label="firstName" style={{borderColor:color}} onChange={this.onChangeFirstName}/>
                <TextField error id="standard-error-helper-text" helperText="Incorrect entry."
                           type="lastName" label="lastName" onChange={this.onChangeLastName}/>
                <TextField error id="standard-error-helper-text" helperText="Incorrect entry."
                           type="email" label="email"  onChange={this.onChangeEmail}/>
                <TextField error id="standard-error-helper-text" helperText="Incorrect entry."
                           type="phone" label="phone" onChange={this.onChangePhone}/>
                <TextField error id="standard-error-helper-text" helperText="Incorrect entry."
                           type="password" label="password" onChange={this.onChangePassword}/>
                <TextField error id="standard-error-helper-text" helperText="Incorrect entry."
                           type="password" label="confirmationPassword" onChange={this.onChangeConfirmationPassword}/>
                <Button variant="contained" color="primary" onClick={this.getData}>Sign up
                </Button>
            </div>
        );
    }

}
export default RegistrationForm;