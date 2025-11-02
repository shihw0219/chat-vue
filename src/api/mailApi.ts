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
        }
    });
}