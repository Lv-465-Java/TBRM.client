import React, { Component } from "react";
import TextField from "../inputField/inputField";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import {GOOGLE_AUTH_URL} from "../../constants";
import GoogleLogin from 'react-google-login';
import {PostData} from "../../services/PostData";
import {Redirect} from "react-router";


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginError: false,
            redirect:false
        }
        this.signup=this.signup.bind(this);
    }

    signup(res, type) {
        let postData;
        //     if (type === 'google' && res.w3.U3) {
        //         postData = {
        //             name: res.w3.ig,
        //             provider: type,
        //             email: res.w3.U3,
        //             provider_id: res.El,
        //             token: res.Zi.access_token,
        //             provider_pic: res.w3.Paa
        //         };
        // }
        if (type === 'google' && res.Qt) {
            postData = {
                name: res.Qt.Ad,
                provider: type,
                email: res.Qt.zu,
                provider_id: res.El,
                token: res.uc.access_token,
                provider_pic: res.Qt.jL
            };
        }
        if (PostData) {
            PostData('signup', postData).then((result) => {
                let responseJson = result;
                if (responseJson.userData) {
                    sessionStorage.setItem("userData", JSON.stringify(responseJson));
                    this.setState({redirect: true});
                }
            });
        } else {
        }
    }



    state = {
        email: undefined,
        password: undefined
    }

    getData =() =>{
        axios.post("/authentication", this.state).then(response => {

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
        if (this.state.redirect){
            return (<Redirect to='/home'/>)
        }

        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response,'google');
        }
        return (
        <div>
            <div>{this.state.email}</div>
            <div>{this.state.password}</div>
            <TextField type="email" label="email" onChange={this.onChangeEmail}/>
            <TextField type="password" label="password" onChange={this.onChangePassword}/>
            <Button onClick={this.getData}>Login</Button>

          <h6>Log in using your account on </h6>
        {/*    <div className = "col-md-6">*/}
        {/*    <div className = "row">*/}
        {/*        <a className="btn btn-secondary btn-block" href={GOOGLE_AUTH_URL} title="Google">*/}
        {/*    <img  src = "http://pngimg.com/uploads/google/google_PNG19635.png" alt="" height="24" width="24"/>*/}
        {/*    Google*/}
        {/*        </a>*/}
        {/*</div>*/}
        {/*    </div>*/}

            <GoogleLogin
                clientId="733965756435-bsql7crsvtrd1s7a27ad6397836805n7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
        );
    }

}

export default LoginForm;