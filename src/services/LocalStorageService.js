import React, {Component} from "react";

const LocalSessionStorageService = (function(){ var _service; function _getService() {
    if(!_service) {
        _service = this;
        return _service
    }   return _service
}

function _setToken(tokenObj) {
    sessionStorage.setItem('Authorization', tokenObj.access_token);
    localStorage.setItem('refreshToken', tokenObj.refresh_token);
}

function _getAccessToken() {
    return sessionStorage.getItem('Authorization');
}

function _getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function _clearToken() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('refreshToken');
}

return {
    getService : _getService,
    setToken : _setToken,
    getAccessToken : _getAccessToken,
    getRefreshToken : _getRefreshToken,
    clearToken : _clearToken
}})();


export default LocalSessionStorageService;