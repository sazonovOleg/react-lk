import React, {PureComponent, useEffect} from "react";
import {ChatPageVm, ChatPageVmType, TChatPageVmState} from "./chat_vm";
import {Container, IconButton, Input, Typography} from "@mui/joy";
import Send from "@mui/icons-material/Send";

type TChatPageComponentProps = {}

export class ChatPageComponent extends PureComponent<TChatPageComponentProps, TChatPageVmState> {
    private vm = new ChatPageVm()

    constructor(props: TChatPageComponentProps) {
        super(props);
        this.state = this.vm.state()
        this.vm.initState()
    }

    async updateComponentOnRender() {
        setTimeout(() => {
            this.vm.changeStateNotifier.subscribe((value) => {
                if (value) {
                    this.setState(value)
                }
            })
        }, 50)
    }

    render() {
        this.updateComponentOnRender()

        return <ProfilePageView vm={this.vm} state={this.state}/>
    }
}

const ProfilePageView = ({vm, state}: ChatPageVmType): JSX.Element => {

    useEffect(() => vm.getMessage())

    return <Container sx={{
        paddingTop: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
    }}>
        <h2>Чат</h2>
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 500,
            height: '100vh',
            justifyContent: 'space-between',

        }}>
            <Container sx={{
                maxHeight: 500,
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '45%'}}>
                    {
                        state.messageList?.flutterUserMessages?.map(function (item, i) {
                            return <Typography
                                component="p"
                                key={i}
                            >
                                Flutter: {item}
                            </Typography>
                        })
                    }
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '45%',
                }}>
                    {
                        state.messageList?.reactUserMessages?.map(function (item, i) {
                            return <Typography
                                component="p"
                                sx={{textAlign: 'end', color: 'black',}}
                                key={i}
                            >
                                React: {item}
                            </Typography>
                        })
                    }
                </div>
            </Container>
            <Input
                placeholder={'Введите сообщение'}
                type={'text'}
                onChange={event => vm.setMessage(event.target.value)}
                value={state.messageValue ?? ''}
                endDecorator={
                    <IconButton
                        size="lg"
                        aria-label="menu"
                        onClick={() => vm.sendMessage()}
                        sx={{color: 'black'}}
                    >
                        <Send/>
                    </IconButton>}
            />
        </Container>
    </Container>
}