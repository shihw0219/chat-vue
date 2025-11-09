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
    token:string,
    roleIds:string[],
    roleNames:string[]
}

export interface Model {
    id:string,
    name:string,
    createTime:string,
    enabled:number,
    modelId:string,
    inputPrice:number,
    outputPrice:number,
    deleted:number
}

export interface Session {
    id:string,
    title:string,
    messageCount:number,
    userId:string,
    isTop:number,
    inputTokens:number,
    outputTokens:number,
    createTime:string,
    updateTime:string
    deleted:number
}

export interface Message {
    id?:string,
    content:string,
    tokens:number,
    deleted:number,
    sessionId:string,
    createTime:string,
    type:number
}