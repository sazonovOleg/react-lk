import {store} from "../../../features/common/redux";
import {BehaviorSubject} from "rxjs";
import {ChatPageVmState} from "./chat_state";
import {ChatService, messageListStream} from "../../../features/chat/domain/chat_service";

export type TChatPageVmState = typeof ChatPageVmState

export type ChatPageVmType = {
    vm: ChatPageVm,
    state: TChatPageVmState
}

export class ChatPageVm {
    private message: string = ''
    private store = () => store
    private chatService: ChatService

    changeStateNotifier = new BehaviorSubject<TChatPageVmState>(ChatPageVmState)

    constructor() {
        this.chatService = new ChatService()
    }

    state(): TChatPageVmState {
        return this.store().getState().chatPageVmReducer
    }

    async initState() {
        this.setState(ChatPageVmState)
        this.chatService.openWebSocket()

        messageListStream.subscribe((value) => {
            this.setState({...this.state(), messageList: value})
        })
    }

    setState(state: TChatPageVmState) {
        this.store().dispatch(chatPageVmAction(state))
        this.changeStateNotifier.next(state)
    }

    setMessage(value: string) {
        this.message = value

        if (value.length >= 1) {
            this.setState({...this.state(), messageValue: value})
        }
    }

    sendMessage() {
        if (this.message.length >= 1) {
            this.chatService.sendMessageInChat(this.message)
            this.setState({...this.state(), messageValue: ''})
        }
    }

    getMessage() {
        console.log(`devv work`)
        this.chatService.getMessage()
    }
}

export const chatPageVmReducer = (
    state: TChatPageVmState = ChatPageVmState,
    action: TAction,
) => {
    return {...action.state, state: action.state};
};

type TAction = {
    type: "set_chat_page_vm_state",
    state: TChatPageVmState,
}

export const chatPageVmAction = (state: TChatPageVmState): TAction => ({
    type: 'set_chat_page_vm_state',
    state: state,
});