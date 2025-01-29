import {ChatMessageModelType} from "../../../features/chat/models/chat_model";

type TChatPageVmState = {
    isLoading: boolean,
    isLogin: boolean,
    messageValue: string,
    messageList: ChatMessageModelType,
}

export const ChatPageVmState: TChatPageVmState = {
    isLoading: false,
    isLogin: false,
    messageValue: '',
    messageList: {
        reactUserMessages: [],
        flutterUserMessages: [],
    },
}