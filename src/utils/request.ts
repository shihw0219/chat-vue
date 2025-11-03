import axios from "axios";
import {ElMessage, type LoadingInstance} from "element-plus";
import { ElLoading } from 'element-plus'
const request = (option:any)=>{
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL
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
        if (loading !== undefined) {
            loading.close();
        }
        return response.data;
    }, (error:any)=>{
        if (loading !== undefined) {
            loading.close();
        }
        ElMessage({
            message: '服务器异常，请联系客服人员',
            type: 'error',
        })
        return Promise.reject(error);
    });
    return instance(option);
}

export default request;