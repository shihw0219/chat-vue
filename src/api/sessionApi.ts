import type {UserLogin} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

export function sessionListApi(){
    return request({
        url: "/session/list",
        method: "GET"
    });
}
