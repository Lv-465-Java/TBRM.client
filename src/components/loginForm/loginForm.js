import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import {Box, Button} from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";
import LocalSessionStorageService from "../../services/LocalStorageService";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import googleLogo from "../../img/google-logo.png";
import Alert from "@material-ui/lab/Alert";
import { getUserRole, verifyUser } from '../../service/authService';


const localStorageService = LocalSessionStorageService.getService();

const style={
    marginTop:40
}

class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined,
        userrole: '',
        errorMessage: ''
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role.name)
            this.setState({ 'userrole': response.data.role.name });
            verifyUser();

        }, error => {
            console.log(error.response.data.message);
        })
    }

    

    getData = () => {
        axios.post("/authentication", this.state).then(response => {
                if (response !== undefined) {
                    this.getRole();
                }
            }, error => {
           this.setState({ errorMessage: error.response.data.message });
            console.log(error.response.data.message);
        })
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
            <Container component="main" maxWidth="xs" style={style}>
                {this.logout && <Alert severity="success">You're safely logged out!</Alert>}
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <div>
                    <TextField
                        onChange={this.onChangeEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Sign In
                    </Button>

                    <Box mt={3}>
                    <Grid container>
                        <Grid item xs>
                            <Link href={"/forgot_password"}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>Don't have an account?
                            <Link href={"/registration"}>
                                 Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    </Box>
                    <h2>OR</h2>
                    <Grid>
                        <h3>Log in using your account on:</h3>
                        <Button
                            variant="contained"
                            color="default"
                            endIcon={<img src={googleLogo} alt="" width={30} height={30}/>}
                        ><Link href={GOOGLE_AUTH_URL}>Log in with Google</Link></Button>
                    </Grid>
                </div>
            </Container>
        );
    }
}


export default LoginForm;