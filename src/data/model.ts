export interface Result{
    code?: number,
    message?: string,
    data?: any
}



export interface UserInfo{
    id:string,
    name:string,
    username:string,
    email:string,
    phone?:string,
    password:string,
    inputTokens:number,
    outputTokens:number,
    createTime:string,
    token:string
}