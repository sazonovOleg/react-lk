export class ChatApi {
    webSocket: WebSocket

    constructor() {
        this.webSocket = new WebSocket("ws://127.0.0.1:3040")
    }

    getWebSocket() {
        return this.webSocket
    }
}