import React, {Component} from "react";
import TextField from "../inputField/inputField";
import Axios from "axios";
import axios from '../../utils/axios';
import {Box, Button, CssBaseline, FormControl, Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import EmailIcon from '@material-ui/icons/Email';
import Typography from "@material-ui/core/Typography";

const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
}
class ForgotPassword extends Component {

    state = {
        email: undefined,
        errorMessage: ''
    }

    validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }
    getData = () => {
        axios.get(`/forgot_password?email=${this.state.email}`).then(response => {
            //TODO redirect to massege "check your email smth like this"
            this.props.history.push("/forgot_password/message");
        }, error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(this.state.errorMessage);
        })
    }

    onChangeEmail = (event) => {
        let email = event.target.value;
        if (email.trim().length === 0) {
            email = undefined;
        }
        this.setState({email});
    }


    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.logout && <Alert severity="success">Email has been sent</Alert>}
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}

                <Typography variant='h6' color='textPrimary'>Please enter you email and you will receive link to reset you password</Typography>
                <TextField type="text" label="email" value={this.state.email} onChange={this.onChangeEmail}/>
                <Button style={buttomStyles} variant="contained" color="primary"
                        size="large"
                        onClick={this.getData} disabled={!this.validateEmail()}><EmailIcon/> Send email</Button>
            </Container>

        );
    }

}

export default ForgotPassword;