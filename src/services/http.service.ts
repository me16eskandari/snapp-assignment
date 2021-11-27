import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export namespace HttpService {

    const getConfig = (url: string, method: Method, data?: any, headers: any = {}): AxiosRequestConfig => {

        return {
            baseURL: process.env.REACT_APP_API_URL || "",
            url,
            method,
            data,
            headers
        };
    };

    export const Fetch = function* (url: string, method: string, data?: any, headers: any = {}) {
        const reqCongif: AxiosRequestConfig = getConfig(url, method as Method, data, headers);
        try {
            const response: AxiosResponse = yield axios(reqCongif);
            return response;
        }
        catch (error) {
        }
    };
}