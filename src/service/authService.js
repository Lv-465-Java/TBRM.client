

export const logout = () => {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userrole');
}

export const isUserLoggedIn = () => {
    return sessionStorage.getItem('authorization') !== null;
}

export const getUserRole = () => {
    return sessionStorage.getItem('userrole');
}