export function setAxiosBaseUrl(): string {
    return "http://localhost:3020"
}

export const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`

    return config
}