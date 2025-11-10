import axios from "axios";
import {ElMessage} from "element-plus";
import { ElLoading } from 'element-plus'
import router from "@/router";
import type {UserInfo} from "@/data/model.ts";
const request = (option:any)=>{
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL
    });
    let loading:any;
    instance.interceptors.request.use((config:any)=>{
        if (config.loading===undefined || config.loading === true) {
            loading = ElLoading.service({ fullscreen: true });
        }
        if (localStorage.getItem("token") !==undefined && localStorage.getItem("token")!== null){
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        return config;
    }, (error:any)=>{
        return Promise.reject(error);
    });
    instance.interceptors.response.use((response:any)=>{
        if (loading !== undefined) {
            loading.close();
        }
        if (response.headers['Fresh-Token']!==undefined) {
            localStorage.setItem("token", response.headers['Fresh-Token']);
            let loginUser:UserInfo = JSON.parse(<string>localStorage.getItem("login_user"));
            loginUser.token = response.headers['Fresh-Token'];
            localStorage.setItem("login_user", JSON.stringify(loginUser));
        }
        const tokenErrorCode:number[] = [401,1003,1004,1005,1006,1007,1008];
        if (tokenErrorCode.includes(response.data.code)) {
            ElMessage.error(response.data.message);
            localStorage.removeItem("login_user");
            localStorage.removeItem("token");
            router.push("/login");
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