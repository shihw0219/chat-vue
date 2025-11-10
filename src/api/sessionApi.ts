import type {UserLogin} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

export function sessionListApi(loading:boolean=true){
    return request({
        url: "/session/list",
        method: "GET",
        loading: loading
    });
}

export function getSessionByIdApi(id:string){
    return request({
        url: "/session/getSessionById/" + id,
        method: "GET",
        loading: false
    });
}

export function createSessionApi(modelId:string){
    return request({
        url: `/session/create/${modelId}`,
        method: "GET",
        loading: false
    });
}
