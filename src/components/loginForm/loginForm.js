import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";
import GoogleLogin from 'react-google-login';
import {PostData} from "../../services/PostData";
import {Redirect} from "react-router";
import { GoogleLogout } from 'react-google-login';
import LocalSessionStorageService from "../../services/LocalStorageService";
import SocialLogin from "./socialLogin";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const localStorageService = LocalSessionStorageService.getService();
// const useStyles = makeStyles(theme => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

class LoginForm extends Component {
//const LoginForm=(props)=>{


    //const
    state = {
        email: undefined,
        password: undefined
    }

    //const
    getData = () => {
        axios.post("/authentication", this.state).then(response => {
                if (response !== undefined) {
                    window.location.href = "/home";
                }
            }
        ).catch(error => {
                console.log(error);
            }
        )
    }

    //const
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
        // if (this.state.redirect) {
        //     return (<Redirect to='/home'/>)
        // }
       // const {classes} = useStyles();

        // const responseGoogle = (response) => {
        //     console.log(response);
        //     const jwt=response.accessToken;
        //     console.log(jwt);
        //     localStorageService.setAccessToken('Bearer '+ jwt);
        //    // this.signup(response,'google');
        // }


       // return (

            // <Container component="main" maxWidth="xs">
            //     <CssBaseline/>
            //     <div className={classes.paper}>
            //         <form className={classes.form} noValidate onSubmit={this.getData}>
            //             <TextField
            //                 onChange={this.onChangeEmail}
            //                 variant="outlined"
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 id="email"
            //                 label="Email Address"
            //                 name="email"
            //                 autoComplete="email"
            //                 autoFocus
            //             />
            //             <TextField
            //                 onChange={this.onChangePassword}
            //                 variant="outlined"
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 name="password"
            //                 label="Password"
            //                 type="password"
            //                 id="password"
            //                 autoComplete="current-password"
            //             />

                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}

                        // <Button
                        //     type="submit"
                        //     fullWidth
                        //     variant="contained"
                        //     color="primary"
                        //     className={classes.submit}
                        //     onClick={this.getData}
                        // >
                        //     Sign In
                        // </Button>
                        //
                        // <h6>Log in using your account on </h6>
                        // <SocialLogin/>

                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Forgot password?*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            {"Don't have an account? Sign Up"}*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    // </form>

                    {/*  <GoogleLogin*/}
                    {/*      clientId="395793978735-vp0r0da1tjvdtp9mjbvq6arjp5tk0eu0.apps.googleusercontent.com"*/}
                    {/*      buttonText="Login"*/}
                    {/*      onSuccess={responseGoogle}*/}
                    {/*      onFailure={responseGoogle}*/}
                    {/*      cookiePolicy={'single_host_origin'}*/}
                    {/*  />*/}

                    {/*  <GoogleLogout*/}
                    {/*      clientId="395793978735-vp0r0da1tjvdtp9mjbvq6arjp5tk0eu0.apps.googleusercontent.com"*/}
                    {/*      buttonText="Logout"*/}
                    {/*      onLogoutSuccess={'/login'}*/}
                    {/*  >*/}
                    {/*  </GoogleLogout>*/}
           //      </div>
           // // </Container>
        // );

            return (
                <div>
                    <TextField type="email" label="email" onChange={this.onChangeEmail}/>
                    <TextField type="password" label="password" onChange={this.onChangePassword}/>
                    <Button onClick={this.getData}>Login</Button>

                    <h6>Log in using your account on </h6>
                     <SocialLogin/>
                </div>
            );
        }
}


export default LoginForm;