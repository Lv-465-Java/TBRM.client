import React, { Component } from "react";
// import TextField from "../inputField/inputField";
import Axios from "axios";
//import Axios from "axios";
import axios from '../../utils/axios';
import {TextField, Button, FormControl, Grid, Box, CssBaseline} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

const textFieldStyles = {
    width: 300,
    minWidth: 100,
    maxWidth: 300
}
const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
}
const BoxStyle = {
    paddingLeft: 16,
    paddingRight: 16
}
const gridStyles = {
    marginTop: 30
}
class ResetPassword extends Component {

    state = {
        password: undefined,
        confirmationPassword:undefined,
        errorMessages: {},
        errorMassage: ''
    }

    isNotValid = () => {
        return this.state.password === undefined || this.state.confirmationPassword === undefined;
    }

    validatePassword = () => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(-_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(-_)/><?"|+=:]{7,}$/;
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
            //TODO redirect to main page
            this.props.history.push("/");
        }, error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(this.state.errorMessage);

        })
    }

    render() {
        return (
            <Grid container direction='column' alignItems='center' justify='space-between'
            style={gridStyles}>
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <Typography variant='h5' color='primary'>Change password</Typography>
                <TextField type="password" label="Password" style={textFieldStyles} onChange={this.onChangePassword}
                           helperText={this.state.errorMessages["password"]}
                           error={this.state.errorMessages["password"] !== undefined}
                />
                <TextField type="password" label="Repeat Password" style={textFieldStyles}
                           onChange={this.onChangeConfirmationPassword}
                           helperText={this.state.errorMessages["confirmationPassword"]}
                           error={this.state.errorMessages["confirmationPassword"] !== undefined}/>
                <Button onClick={this.getData}
                        variant="contained" color="primary" onClick={this.getData}
                        size="large"
                        style={buttomStyles} disabled={this.isNotValid()}> Submit</Button>
            </Grid>
        );
    }

}

export default ResetPassword;