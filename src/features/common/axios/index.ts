import axios from "axios";
import {authInterceptor, setAxiosBaseUrl} from "./service";

const $authHost = axios.create({
    baseURL: setAxiosBaseUrl(),
})

$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
}