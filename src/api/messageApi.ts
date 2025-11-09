import request from "@/utils/request.ts";
import type {MessageRequest} from "@/data/requestModel.ts";

export function getMessageBySessionIdApi(id:string,loading:boolean=true){
    return request({
        url: `/message/getMessageList/${id}`,
        method: "GET",
        loading: loading
    });
}

export function insertMessageApi(message:MessageRequest){
    return request({
        url: `/message/insertMessage`,
        method: "POST",
        data: message,
        loading: false
    });
}