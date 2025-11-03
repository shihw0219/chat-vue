import axios from "axios";
import {ElMessage, type LoadingInstance} from "element-plus";
import { ElLoading } from 'element-plus'
import router from "@/router";
import type {UserInfo, UserLogin} from "@/data/model.ts";
const request = (option:any)=>{
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL
    });
    let loading:any;
    let whiteUri:string[] = ['/user/register','/user/login','/mail/sendRegisterMail','/captcha/getCaptcha','/mail/sendResetPasswordCode','/user/resetPassword'];
    instance.interceptors.request.use((config:any)=>{
        let token = localStorage.getItem('token');
        let login_user = localStorage.getItem('login_user');
        let url = config.url;
        if (whiteUri.indexOf(url) === -1 && (token === undefined || token === null || login_user === undefined || login_user === null) ) {
            localStorage.removeItem('token');
            localStorage.removeItem('login_user');
            ElMessage({
                type: 'error',
                message: '用户信息不存在，请重新登录'
            })
            router.push('/login');
            return;
        }
        if (config.loading===undefined || config.loading === true) {
            loading = ElLoading.service({ fullscreen: true });
        }
        if (localStorage.getItem("token") !==undefined && localStorage.getItem("token")! == null){
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