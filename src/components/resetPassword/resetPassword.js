import React, { Component } from "react";
import TextField from "../inputField/inputField";
import Axios from "axios";
//import Axios from "axios";
import axios from '../../utils/axios';
import {Button, Grid} from "@material-ui/core";

const textFieldStyles={
    width: 300,
    minWidth: 100,
    maxWidth: 300
}
class ResetPassword extends Component {

    state = {
        password: undefined,
        confirmationPassword:undefined,
        errorMessages: {}
    }

    isNotValid = () => {
        return this.state.password === undefined || this.state.confirmationPassword === undefined;
    }

    validatePassword = () => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(-_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(-_)/><?"|+=:]{8,}$/;
        return re.test(String(this.state.password));
    }


    onChangePassword = (event) => {
        let password = event.target.value;
        this.setState({password});
        if (!this.validatePassword()) {
            let errors = {
                ...this.state.errorMessages,
                ["password"]: "Password must contain at least eight characters and at least one character of "
                + " uppercase letter, lowercase letter, digit, special character"
            };
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["password"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    }

    onChangeConfirmationPassword = (event) => {
        let confirmationPassword = event.target.value;
        this.setState({confirmationPassword});
        if (confirmationPassword !== this.state.password) {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: "Passwords do not match"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    }

    getData =() => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        console.log(this.state.password);
        axios.post(`/reset_password?token=${token}`,this.state.password, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            //TODO redirect to massage "check your email smth like this"
            this.props.history.push("/");
        }, error => {
            let errors = {}
            error.response.data.forEach(err => {
                errors[[err.name]] = err.message;
            })
            this.setState({errorMessages: errors}, () => console.log(this.state))

        })
    }

    render() {
        return (
            <div>
                <TextField type="password" label="password" style={textFieldStyles} onChange={this.onChangePassword}
                           helperText={this.state.errorMessages["password"]}
                           error={this.state.errorMessages["password"] !== undefined}
                />
                <TextField type="password" label="confirmationPassword" style={textFieldStyles}
                           onChange={this.onChangeConfirmationPassword}
                           helperText={this.state.errorMessages["confirmationPassword"]}
                           error={this.state.errorMessages["confirmationPassword"] !== undefined}/>
                <Button onClick={this.getData} disabled={this.isNotValid()}> Save</Button>
            </div>
        );
    }

}

export default ResetPassword;