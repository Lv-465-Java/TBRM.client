import React, { Component } from "react";
import TextField from "../inputField/inputField";
// import Axios from "axios";
//import Axios from "axios";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";


class LoginForm extends Component {

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
        return (
        <div>
            <TextField type="email" label="email" onChange={this.onChangeEmail}/>
            <TextField type="password" label="password" onChange={this.onChangePassword}/>
            <Button onClick={this.getData}>Login</Button>
        </div>
        );
    }

}

export default LoginForm;