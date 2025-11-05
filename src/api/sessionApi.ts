import type {UserLogin} from "@/data/requestModel.ts";
import request from "@/utils/request.ts";

export function listApi(){
    return request({
        url: "/session/list",
        method: "GET"
    });
}
