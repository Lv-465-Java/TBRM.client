import Axios from 'axios';
import {API_BASE_URL} from "../constants";
import LocalSessionStorageService from "../services/LocalStorageService";


const localStorageService = LocalSessionStorageService.getService();

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
                config.headers['Authorization'] = token;
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


// axios.interceptors.response.use(
//     response => {
//         let authorization = response.headers['authorization'];
//         let refreshToken = response.headers['refreshtoken'];
//         authorization && localStorageService.setAccessToken(authorization);
//         //sessionStorage.setItem('authorization', authorization);
//         refreshToken && localStorageService.setRefreshToken(refreshToken);
//         //localStorage.setItem('refreshtoken', refreshToken);
//
//         return response;
//     },
//     error=>{
//
//     }
// )

axios.interceptors.response.use(response => {
        let authorization = response.headers['Authorization'];
        let refreshToken = response.headers['RefreshToken'];
        authorization && localStorageService.setAccessToken(authorization);
        refreshToken && localStorageService.setRefreshToken(refreshToken);

        return response;
    },
//     error=>{
//         return Promise.reject(error);
//     }
// )
     function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;
            return axios.post('/refresh',
                {},{
                    headers: {
                        refreshToken: localStorageService.getRefreshToken()
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        //console.log(res.headers["Authorization"]);
                       // console.log(res.headers["RefreshToken"]);
                        localStorageService.setAccessToken(res.headers["Authorization"]);
                        localStorageService.setRefreshToken(res.headers["RefreshToken"]);

                        axios.defaults.headers.common['Authorization'] = localStorageService.getAccessToken();

                        return axios(originalRequest);
                    }
                })
        }

        return Promise.reject(error);
    });

export default axios;