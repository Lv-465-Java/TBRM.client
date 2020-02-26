export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'authorization';
export const REFRESH_TOKEN='refreshToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const OAUTH2_FULL_REGISTER_REDIRECT_URI = 'http://localhost:3000/oauth2/fullRegister'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' +OAUTH2_REDIRECT_URI;
