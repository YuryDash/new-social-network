import axios from "axios";

export type ResponseDataType<T = {}> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: string[]
    data: T;
};
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
})
