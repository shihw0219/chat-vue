import request from "@/utils/request.ts";

/**
 * @author shihw
 * @Date 2025/11/2 21:06
 * @description 获取注册邮箱验证码
*/
export function sendRegisterMailApi(mail:string){
    return request({
        url: "/mail/sendRegisterMail",
        method: "POST",
        data: {
            'email':mail
        },
        loading: false
    });
}

/**
 * @author shihw
 * @Date 2025/11/3 16:04
 * @description 获取重置密码邮箱验证码
*/
export function sendResetPasswordCodeApi(username:string){
    return request({
        url: "/mail/sendResetPasswordCode",
        method: "POST",
        data: {
            'username':username
        },
        loading: false
    });
}