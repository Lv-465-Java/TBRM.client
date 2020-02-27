import React from 'react';

const Auth = (props) => {
    if (sessionStorage.getItem('authorization') === null) {
        return <h3>You are not authorized</h3>
    } else {
        return props.children;
    }
}

export default Auth;