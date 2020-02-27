

export const logout = () => {
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('refreshToken');
}

export const isUserLoggedIn = () => {
    return sessionStorage.getItem('authorization') !== null;
}