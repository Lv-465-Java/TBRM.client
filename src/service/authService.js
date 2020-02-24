

export const logout = () => {
    sessionStorage.removeItem('authorization');
}

export const isUserLoggedIn = () => {
    return sessionStorage.getItem('authorization') !== null;
}