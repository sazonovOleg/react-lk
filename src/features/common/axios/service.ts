export function setAxiosBaseUrl(): string {
    return "http://127.0.0.1:3020"
}

export const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`

    return config
}