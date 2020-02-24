import React, { Component } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const accessToken = this.getUrlParameter(ACCESS_TOKEN);
        const refreshToken = this.getUrlParameter(REFRESH_TOKEN);
        console.log(accessToken);
        console.log(refreshToken);
        const error = this.getUrlParameter('error');
        console.log(error);

        if(accessToken) {
            sessionStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken)
            return <Redirect to={{
                pathname: "/home",
                state: { from: this.props.location }
            }}/>;
        } else {
            return <Redirect to={{
                pathname: "/",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>;
        }
    }
}

export default OAuth2RedirectHandler;