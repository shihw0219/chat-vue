import type {UserRegister} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

/**
 * @author shihw
 * @date 2025/11/10 20:50
 * @description 获取模型列表
*/
export function modelListApi(){
    return request({
        url: "/model/list",
        method: "GET",
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:50
 * @description 根据模型ID获取模型信息
*/
export function getModelByIdApi(id:string){
    return request({
        url: `/model/getModelById/${id}`,
        method: "GET",
        loading: false
    });
}