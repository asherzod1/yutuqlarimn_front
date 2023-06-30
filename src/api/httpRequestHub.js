import {TOKEN_ACCESS, BASE_URL} from "./host"
import axios from "axios";

export const HttpRequestHub = (config = null) => {
    const token = localStorage.getItem(TOKEN_ACCESS);
    let headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: token ? `Bearer ${token}` : "",
        "Accept-Language": "uz",
    };
    let axiosInstance = axios.create({
        baseURL: `${BASE_URL}/`,
        headers,
        timeout: 100000,
    });

    axiosInstance.interceptors.response.use(
        response => {
            return response
        },
        function (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(TOKEN_ACCESS);
                window.location.href = "/login";
            }
            return Promise.reject(error)
        }
    )
    return axiosInstance(config);
};
