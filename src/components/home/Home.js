import React, {Component} from "react";
import {Redirect} from "react-router";

class Home extends Component{

    constructor(props) {
        super(props);
        this.state={
            redirect: false,
            name:'',
            email:''
        }
    }

    componentDidMount() {
        let data=JSON.parse(sessionStorage.getItem('userData'));
        this.setState({name:data.userData.name});
        this.setState({email:data.userData.email});
    }

    render() {
        if (!sessionStorage.getItem('userData')){
            return (<Redirect to='/'/>)
        } return (
            <div className="row small-up-2 medium-up-3 large-up-4" id="Body">
                <div className="medium-12 columns">
                    <h2>Welcome {this.state.name}</h2>
                </div>
            </div>
        );
    }
}

export default Home;