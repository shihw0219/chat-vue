import request from "@/utils/request";

/**
 * @author shihw
 * @Date 2025/11/2 21:05
 * @description 获取登录图片验证码
*/
export function getCaptchaApi(){
    return request({
        url: "/captcha/getCaptcha",
        method: "GET",
        loading: false
    });
}