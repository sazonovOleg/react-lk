import {ChatApi} from "../data/chat_api";
import {BehaviorSubject} from "rxjs";
import {ChatMessageModelType, UserMessageModelType} from "../models/chat_model";

export const isOpenWebSocketStream = new BehaviorSubject<boolean>(false)
export const messageListStream = new BehaviorSubject<ChatMessageModelType>({
    reactUserMessages: [],
    flutterUserMessages: [],
})

export class ChatService {
    private chatApi: ChatApi

    constructor() {
        this.chatApi = new ChatApi()
    }

    socket() {
        return this.chatApi.getWebSocket()
    }

    openWebSocket() {
        this.socket().addEventListener("open", event => {
            if (event.type == 'open') {
                isOpenWebSocketStream.next(true)
            }
        })
    }

    sendMessageInChat(message: string) {
        let isOpenWebSocket: boolean = isOpenWebSocketStream.value
        let reactUserMessagesList = messageListStream.getValue().reactUserMessages
        reactUserMessagesList?.push(message)

        messageListStream.next({
            reactUserMessages: reactUserMessagesList,
            flutterUserMessages: messageListStream.getValue().flutterUserMessages,
        })

        if (isOpenWebSocket) {
            const newChatModel: UserMessageModelType = {
                reactUserMessage: message,
                flutterUserMessage: '',
            }
            const jsonStringify = JSON.stringify(newChatModel)

            this.socket().send(jsonStringify)
        }
    }

    getMessage() {
        let isOpenWebSocket: boolean = isOpenWebSocketStream.value

        if (isOpenWebSocket) {
            this.socket().onmessage = function (event) {
                let data: UserMessageModelType = JSON.parse((event.data))
                let flutterMessagesList = messageListStream.getValue().flutterUserMessages

                if (!data.flutterUserMessage) {
                    return
                }

                flutterMessagesList?.push(data.flutterUserMessage)

                messageListStream.next({
                    reactUserMessages: messageListStream.getValue().reactUserMessages,
                    flutterUserMessages: flutterMessagesList
                })
            }
        }
    }
}