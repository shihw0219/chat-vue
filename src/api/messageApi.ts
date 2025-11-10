import request from "@/utils/request.ts";
import type {MessageRequest} from "@/data/requestModel.ts";

/**
 * @author shihw
 * @date 2025/11/10 20:50
 * @description 根据会话ID获取历史消息
*/
export function getMessageBySessionIdApi(id:string,loading:boolean=true){
    return request({
        url: `/message/getMessageList/${id}`,
        method: "GET",
        loading: loading
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:50
 * @description 新增消息
*/
export function insertMessageApi(message:MessageRequest){
    return request({
        url: `/message/insertMessage`,
        method: "POST",
        data: message,
        loading: false
    });
}