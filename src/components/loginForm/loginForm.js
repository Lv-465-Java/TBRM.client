import React, { Component } from "react";
import TextField from "../inputField/inputField";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";
import GoogleLogin from 'react-google-login';
import {PostData} from "../../services/PostData";
import {Redirect} from "react-router";
import { GoogleLogout } from 'react-google-login';
import LocalSessionStorageService from "../../services/LocalStorageService";

const localStorageService = LocalSessionStorageService.getService();


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginError: false,
            redirect:false
        }
       // this.signup=this.signup.bind(this);
    }

    // signup(res, type) {
    //     let postData;
    //     //     if (type === 'google' && res.w3.U3) {
    //     //         postData = {
    //     //             name: res.w3.ig,
    //     //             provider: type,
    //     //             email: res.w3.U3,
    //     //             provider_id: res.El,
    //     //             token: res.Zi.access_token,
    //     //             provider_pic: res.w3.Paa
    //     //         };
    //     // }
    //     if (type === 'google' && res.Qt) {
    //         postData = {
    //             name: res.Qt.Ad,
    //             provider: type,
    //             email: res.Qt.zu,
    //             provider_id: res.El,
    //             token: res.uc.access_token,
    //             provider_pic: res.Qt.jL
    //         };
    //     }
    //     if (PostData) {
    //         PostData('signup', postData).then((result) => {
    //             let responseJson = result;
    //             if (responseJson.userData) {
    //                 sessionStorage.setItem("userData", JSON.stringify(responseJson));
    //                 this.setState({redirect: true});
    //             }
    //         });
    //     } else {
    //     }
    // }



    state = {
        email: undefined,
        password: undefined
    }

    getData =() =>{
        try{
            axios.post("/authentication", this.state).then(response => {
                if(response !== undefined){
            window.location.href = "/resources";
                }
    }
    )
    }catch(error){
        console.log(error);
    }
        
    
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
        if (this.state.redirect){
            return (<Redirect to='/home'/>)
        }

        const responseGoogle = (response) => {
            console.log(response);
            const jwt=response.tokenId;
            //console.log(jwt);
            localStorageService.setAccessToken('Bearer '+ jwt);
           // this.signup(response,'google');
        }
        return (
        <div>
            <TextField type="email" label="email" onChange={this.onChangeEmail}/>
            <TextField type="password" label="password" onChange={this.onChangePassword}/>
            <Button onClick={this.getData}>Login</Button>

          <h6>Log in using your account on </h6>

            <GoogleLogin
                clientId="395793978735-vp0r0da1tjvdtp9mjbvq6arjp5tk0eu0.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

            <GoogleLogout
                clientId="395793978735-vp0r0da1tjvdtp9mjbvq6arjp5tk0eu0.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={'/login'}
            >
            </GoogleLogout>
        </div>
        );
    }

}

export default LoginForm;