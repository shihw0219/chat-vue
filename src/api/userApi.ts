import request from "@/utils/request.ts";
import type {UserLogin, UserRegister, UserRest} from "@/data/requestModel.ts";

/**
 * @author shihw
 * @Date 2025/11/3 21:21
 * @description 注册
*/
export function registerApi(user:UserRegister){
    return request({
        url: "/user/register",
        method: "POST",
        data: user
    });
}

/**
 * @author shihw
 * @Date 2025/11/3 21:21
 * @description 登录
*/
export function loginApi(user:UserLogin){
    return request({
        url: "/user/login",
        method: "POST",
        data: user
    });
}

/**
 * @author shihw
 * @Date 2025/11/3 22:10
 * @description 重置密码
*/
export function resetPasswordApi(user:UserRest){
    return request({
        url: "/user/resetPassword",
        method: "POST",
        data: user
    });
}
