import request from "@/utils/request.ts";
import type {UserLogin, UserRegister} from "@/data/model.ts";

export function registerApi(user:UserRegister){
    return request({
        url: "/user/register",
        method: "POST",
        loading: false,
        data: user
    });
}

export function loginApi(user:UserLogin){
    return request({
        url: "/user/register",
        method: "POST",
        loading: false,
        data: user
    });
}
