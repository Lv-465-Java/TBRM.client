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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const localStorageService = LocalSessionStorageService.getService();

const style={
    marginTop:40
}
const formControl= {
        marginTop: 15,
        minWidth: 395,
    }

class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined,
        userrole: '',
        errorMessage: '',
        tenant: undefined
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role.name)
            this.setState({ 'userrole': response.data.role.name });
            verifyUser();

        }, error => {

        })
    }



    getData = () => {
        axios.post("/authentication", this.state).then(response => {
                if (response !== undefined) {
                    this.getRole();
                }
            }, error => {
           this.setState({ errorMessage: error.response.data.message });
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

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };


    render() {

        return (
            <Container component="main" maxWidth="xs" style={style}>
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

                    <Grid>
                    <FormControl variant="outlined" style={formControl}>
                        <InputLabel ref="" htmlFor="outlined-age-native-simple">
                            Choose Tenant
                        </InputLabel>
                        <Select
                            native
                            value={this.state.tenant}
                            onChange={this.handleChange('tenant')}
                            labelWidth={110}
                            inputProps={{
                                name: 'tenant',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </FormControl>
                    </Grid>
                    {/*<PopupState variant="popover" popupId="demo-popup-menu">*/}
                    {/*    {popupState => (*/}
                    {/*        <React.Fragment>*/}
                    {/*            <Button variant="contained" color="primary" {...bindTrigger(popupState)}>*/}
                    {/*                Choose tenant*/}
                    {/*            </Button>*/}
                    {/*            <Menu {...bindMenu(popupState)}>*/}
                    {/*                <MenuItem onClick={popupState.close}>Cake</MenuItem>*/}
                    {/*                <MenuItem onClick={popupState.close}>Death</MenuItem>*/}
                    {/*            </Menu>*/}
                    {/*        </React.Fragment>*/}
                    {/*    )}*/}
                    {/*</PopupState>*/}

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