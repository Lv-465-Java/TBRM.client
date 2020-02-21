import React, { Component } from "react";
import TextField from "../inputField/inputField";
import Axios from "axios";
//import Axios from "axios";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";


class ResetPassword extends Component {

    state = {
        password: undefined
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
                <TextField type="password" label="password" onChange={this.onChangePassword}/>
                <Button onClick={this.getData}>Save</Button>
            </div>
        );
    }

}

export default ResetPassword;