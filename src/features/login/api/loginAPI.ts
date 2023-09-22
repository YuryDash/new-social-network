import {instance, ResponseDataType} from "api/instance";

export type ResponseMe = {
    id: number
    login: string
    email: string
}


export const loginAPI = {
    me() {
        return instance.get<ResponseDataType<ResponseMe>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        console.log(rememberMe)
        return instance.post<ResponseDataType<{ userId: number }>>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}