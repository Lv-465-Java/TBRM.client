import React, { Component } from "react";
import TextField from "../inputField/inputField";
import Axios from "axios";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";


class ForgotPassword extends Component {

    state = {
        email: undefined
    }

    getData =() => {
        axios.get(`/forgot_password?email=${this.state.email}`).then(response => {
            //TODO redirect to massege "check your email smth like this"
            this.props.history.push("/");
        }, error => {

        })
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    render() {
        return (
            <div>
                <h3>Please enter you email and you will receive link to reset you password</h3>
                <TextField type="text" label="email" onChange={this.onChangeEmail}/>
                <Button onClick={this.getData}>OK</Button>
            </div>
        );
    }

}

export default ForgotPassword;