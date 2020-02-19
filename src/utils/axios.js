import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:8080/',
    crossdomain: true,
})

axios.interceptors.request.use(
    config => {
        config.headers["Authorization"] = sessionStorage.getItem('authorization');
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
)


axios.interceptors.response.use(
    response => {
        let authorization = response.headers['authorization'];
        let refreshToken = response.headers['refreshtoken'];
        
        authorization && sessionStorage.setItem('authorization', authorization);
        refreshToken && sessionStorage.setItem('refreshtoken', refreshToken);
        return response;
    },
    error=>{
        return Promise.reject(error);
    }
)

export default axios;