import React, {Component} from "react";
import axios from "../../utils/axios";

class AdminPage extends Component{
   state={
       firstName: this.props.firstName,
       lastName: this.props.lastName,
       email: this.props.email,
       phone: this.props.phone,
       password: this.props.password,
       enabled: this.props.enabled,
       imageUrl: this.props.imageUrl,
   }

    getData = () => {
        axios.get(`/all_accounts`).then(
            response => {
                console.log(response.data);
                let data = response.data;
                this.setState({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    enabled: data.enabled,
                    imageUrl: data.imageUrl,

                })
            }).catch(error => {
            console.dir(error.response.data);

        })
    }
}