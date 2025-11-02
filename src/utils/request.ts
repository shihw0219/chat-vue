import axios from "axios";
import {ElMessage} from "element-plus";
import { ElLoading } from 'element-plus'
const request = (option:any)=>{
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API
    });
    let loading:any;
    instance.interceptors.request.use((config:any)=>{
        if (config.loading===undefined || config.loading === true) {
             loading = ElLoading.service({ fullscreen: true });
        }
        return config;
    }, (error:any)=>{
        return Promise.reject(error);
    });
    instance.interceptors.response.use((response:any)=>{
        loading.close();
        return response.data;
    }, (error:any)=>{
        loading.close();
        ElMessage({
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error);
    });
    return instance(option);
}

export default request;