export interface Result{
    code?: number,
    message?: string,
    data?: any
}

export interface UserRegister{
    name: string,
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    code: string,
    phone?: string
}

export interface UserLogin{
    username: string,
    password: string,
    code: string,
    captchaId: string
    remember: boolean
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