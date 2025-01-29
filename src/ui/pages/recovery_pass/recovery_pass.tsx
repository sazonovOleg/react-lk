import React, {PureComponent} from "react";
import {Button, CircularProgress, Container, IconButton, Input} from "@mui/joy";
import {RecoveryPassVm, RecoveryPassVmType, TRecoveryPassVmState} from "./recovery_pass_vm";
import {useNavigate} from "react-router-dom";

type TRecoveryPassComponentProps = {}

export class RecoveryPassComponent extends PureComponent<TRecoveryPassComponentProps, TRecoveryPassVmState> {
    private vm = new RecoveryPassVm()

    constructor(props: TRecoveryPassComponentProps) {
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

        return <RecoveryPassView vm={this.vm} state={this.state}/>
    }
}

const RecoveryPassView = ({vm, state}: RecoveryPassVmType): JSX.Element => {
    const navigate = useNavigate()

    return <Container
            sx={{
                paddingTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 800,
            }}>

            <Container sx={{position: 'relative', textAlign: 'center'}}>
                <IconButton onClick={() => navigate(-1)} sx={{position: 'absolute', left: 10}}>
                    <p style={{fontSize: 20, fontWeight: "bold"}}>&#8592;</p>
                </IconButton>
                <h2>Регистрация</h2>
            </Container>

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <p>Введите логин</p>
                <Input
                    disabled={state.isDisabled}
                    placeholder={'Логин'}
                    type={'text'}
                    onChange={event => vm.setUserName(event.target.value)}
                />

                {
                    state.isLoading
                        ? <CircularProgress sx={{marginTop: 2}} variant="plain"/> :
                        <Button
                            disabled={state.isShowBtn}
                            sx={{
                                width: 250,
                                marginTop: 3,
                                backgroundColor: 'darkslateblue',
                                opacity: 0.9,
                                transition: '.1s all ease-in',
                                alignSelf: 'center',
                                '&:hover': {
                                    bgcolor: 'darkslateblue',
                                    opacity: 1,
                                },
                            }}
                            onClick={() => vm.recoveryPass()}>
                            Восстановить пароль
                        </Button>
                }
            </Container>
    </Container>
}