import Axios from 'axios';
import {API_BASE_URL} from "../constants";

const axios = Axios.create({
    baseURL: API_BASE_URL,
    crossdomain: true,
})

axios.interceptors.request.use(
    config => {
        config.headers["Authorization"] = sessionStorage.getItem('authorization');
        // const token = localStorageService.getAccessToken();
        // if (token) {
        //     config.headers['Authorization'] = 'Bearer ' + token;
        // }
        return config;
    },
    error=>{

    }
)


axios.interceptors.response.use(
    response => {
        let authorization = response.headers['authorization'];
        let refreshToken = response.headers['refreshtoken'];
        sessionStorage.setItem('authorization', authorization);
        sessionStorage.setItem('refreshtoken', refreshToken);
        return response;
    },
    error=>{

    }
)

export default axios;