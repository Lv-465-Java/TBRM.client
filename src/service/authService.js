import Alert from "@material-ui/lab/Alert";

export const logout = () => {
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userrole');
    // Alert.success("You're safely logged out!");
}

export const isUserLoggedIn = () => {
    return sessionStorage.getItem('authorization') !== null;
}

export const getUserRole = () => {
    return sessionStorage.getItem('userrole');
}