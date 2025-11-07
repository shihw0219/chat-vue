import type {UserLogin} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

export function sessionListApi(){
    return request({
        url: "/session/list",
        method: "GET"
    });
}

export function getSessionByIdApi(id:string){
    return request({
        url: "/session/getSessionById/" + id,
        method: "GET",
        loading: false
    });
}
