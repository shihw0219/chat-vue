import type {UserRegister} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

export function modelListApi(){
    return request({
        url: "/model/list",
        method: "GET",
        loading: false
    });
}

export function getModelByIdApi(id:string){
    return request({
        url: `/model/getModelById/${id}`,
        method: "GET",
        loading: false
    });
}