import React, {Component} from 'react';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
import {Redirect} from 'react-router-dom'
import LocalSessionStorageService from "../../services/LocalStorageService";

const localStorageService = LocalSessionStorageService.getService();

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const accessToken = this.getUrlParameter(ACCESS_TOKEN);
        const refreshToken = this.getUrlParameter(REFRESH_TOKEN);
        const isNewUser = this.getUrlParameter("isNewUser");
        console.log(accessToken);
        console.log(refreshToken);
        console.log(isNewUser);
        const error = this.getUrlParameter('error');
        console.log(error);

        if (accessToken) {
            localStorageService.setAccessToken(accessToken);
            localStorageService.setRefreshToken(refreshToken);
            if (isNewUser === 'true') {
                return <Redirect to={{
                    pathname: "/oauth2/fullRegister",
                    state: {from: this.props.location}
                }}/>;
            } else {
                return window.location.href = "/home"
            }


        } else {
            return window.location.href = "/"
        }
    }
}

export default OAuth2RedirectHandler;