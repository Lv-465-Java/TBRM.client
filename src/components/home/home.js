import React, { Component } from 'react';
import {BrowserRouter, Link} from 'react-router-dom';

class HomePage extends Component{
    
    render(){
        return(
            <BrowserRouter>
            <div>
                <h1>Home Page</h1>
                <Link to="/resources">Resource Templates</Link>
            </div>
            </BrowserRouter>
        );
    }
}

export default HomePage;