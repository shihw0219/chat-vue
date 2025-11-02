export interface UserRegister{
    name: string,
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    code: string,
    phone?: string
}

export interface Result{
    code?: number,
    message?: string,
    data?: any
}