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

export interface UserRest{
    username: string,
    password: string,
    code: string,
    confirmPassword: string
}