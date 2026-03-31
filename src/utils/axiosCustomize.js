import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    // timeout:1000,
    // headers:{'token'}
})
instance.interceptors.response.use((response) => {
    console.log('>>> interceptor ', response)
    return response && response.data ? response.data : response
}, (error) => {
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error)
})
export default instance;