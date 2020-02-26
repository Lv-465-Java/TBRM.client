import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import LocalSessionStorageService from "../../services/LocalStorageService";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";


class FullOAuthRegister extends Component {

    state = {
        phone: undefined,
        password: undefined
    }
    getData = () => {
        axios.post("http://localhost:8080/oauth2/callback/google", this.state).then(response => {
            if (response !== undefined) {
                window.location.href = "/home";
            }
        }, error => {
            this.setState({ errorMessage: error.response.data.message });
            console.log(error.response.data.message);
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

    render() {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div>
                    <TextField
                        onChange={this.onChangePhone}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Continue register
                    </Button>

                </div>
            </Container>
        );
    }
}


export default FullOAuthRegister;