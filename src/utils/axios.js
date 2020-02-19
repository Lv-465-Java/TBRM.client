import Axios from 'axios';
import {API_BASE_URL} from "../constants";
import LocalSessionStorageServiceStorageService from "../services/LocalStorageService";


const localStorageService = LocalSessionStorageServiceStorageService.getService();

const axios = Axios.create({
    baseURL: API_BASE_URL,
    crossdomain: true,
})

axios.interceptors.request.use(
    //config => {
        //config.headers["Authorization"] = sessionStorage.getItem('authorization');
        config => {
            const token = localStorageService.getAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
        },
            error => {
                Promise.reject(error);
            });
       // return config;
   // },
   // error=>{

  //  }
//)


axios.interceptors.response.use(
    response => {
        let authorization = response.headers['authorization'];
        let refreshToken = response.headers['refreshtoken'];
        authorization && localStorageService.setAccessToken(authorization);
        //sessionStorage.setItem('authorization', authorization);
        refreshToken && localStorageService.setRefreshToken(refreshToken);
        //localStorage.setItem('refreshtoken', refreshToken);

        return response;
    },
    error=>{

    }
)

axios.interceptors.response.use((response) => {
        return response
    },
    function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            return axios.post('/refresh',
                {
                    "refresh_token": localStorageService.getRefreshToken()
                })
                .then(res => {
                    if (res.status === 201) {
                        localStorageService.setAccessToken(res.data.getAccessToken());

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

                        return axios(originalRequest);
                    }
                })
        }

        return Promise.reject(error);
    });

export default axios;