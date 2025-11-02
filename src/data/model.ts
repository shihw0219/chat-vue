/**
 * @author shihw
 * @date 2025/1/15 21:48
 * @description
 */

interface User{
    id?: string
    phone?: string
    password?: string
    name?: string
    dept?: string
    job?: string
    wristband?: number
    recorder?: number
    status?: number
}

interface Equipment{
    id?: string
    name?: string
    type?: string
    model?: string
    examineStatus?: string
    productionStatus?: string
    runStatus?: string
}