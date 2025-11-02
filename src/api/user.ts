/**
 * @author shihw
 * @date 2024/11/29 13:46
 * @description
 */
import request from "@/utils/request";

export function loginApi(data:any){
    return request({
        url: "/user/login",
        method: "POST",
        data: data
    });
}

export function registerApi(data:any){
    return request({
        url: "/user/register",
        method: "POST",
        data: data
    });
}

export function getUserListApi(param:any){
    return request({
        url: "/user/getList",
        method: "GET",
        params: param
    });
}

export function changeStatusApi(status:number,id:string){
    return request({
        url: `/user/changeStatus/${id}/${status}`,
        method: "GET"
    });
}

export function resetPasswordApi(data:any){
    return request({
        url: "/user/resetPassword",
        method: "POST",
        data: data
    });
}

export function delUserApi(id:string){
    return request({
        url: `/user/del/${id}`,
        method: "GET"
    });
}

export function updateUserApi(data:any){
    return request({
        url: "/user/update",
        method: "POST",
        data: data
    });
}
