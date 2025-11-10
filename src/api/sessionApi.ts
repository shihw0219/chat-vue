import type {ChangeModelRequest, UpdateSessionNameRequest, UserLogin} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 获取会话列表
*/
export function sessionListApi(loading:boolean=true){
    return request({
        url: "/session/list",
        method: "GET",
        loading: loading
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 根据ID获取会话详情
*/
export function getSessionByIdApi(id:string){
    return request({
        url: "/session/getSessionById/" + id,
        method: "GET",
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 创建新会话
*/
export function createSessionApi(modelId:string){
    return request({
        url: `/session/create/${modelId}`,
        method: "GET",
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 更换模型
*/
export function changeModelApi(changeModelRequest:ChangeModelRequest){
    return request({
        url: `/session/changeModel`,
        method: "POST",
        data:changeModelRequest,
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 置顶会话
*/
export function toTopApi(sessionId:string){
    return request({
        url: `/session/toTop/${sessionId}`,
        method: "GET",
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:48
 * @description 取消置顶会话
*/
export function cancelTopApi(sessionId:string){
    return request({
        url: `/session/cancelTop/${sessionId}`,
        method: "GET",
        loading: false
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:58
 * @description 删除会话
*/
export function deleteSessionApi(sessionId:string){
    return request({
        url: `/session/delete/${sessionId}`,
        method: "GET"
    });
}

/**
 * @author shihw
 * @date 2025/11/10 20:59
 * @description 修改会话名称
*/
export function updateSessionNameApi(updateSessionNameRequest:UpdateSessionNameRequest){
    return request({
        url: `/session/updateName`,
        method: "POST",
        data: updateSessionNameRequest
    });
}
