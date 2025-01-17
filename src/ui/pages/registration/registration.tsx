import React, {Component} from "react";
import {RegistrationPageVm, RegistrationPageVmType, TRegistrationPageVmState} from "./registration_vm";
import {Button, CircularProgress, Container, IconButton, Input} from "@mui/joy";
import {useNavigate} from "react-router-dom";

type TRegistrationPageComponentProps = {}

export class RegistrationPageComponent extends Component<TRegistrationPageComponentProps, TRegistrationPageVmState> {
    vm = new RegistrationPageVm()

    constructor(props: TRegistrationPageComponentProps) {
        super(props);
        this.state = this.vm.state()
        this.vm.initState()
    }

    componentWillUnmount = () => this.vm.dispose()

    updateComponentOnRender() {
        this.vm.changeStateNotifier.subscribe((value) => {
            if (value) {
                this.setState(value)
            }
        })
    }

    render() {
        setTimeout(() => {
            this.updateComponentOnRender()
        }, 50)

        return <RegistrationPageView vm={this.vm} state={this.state}/>
    }
}

const RegistrationPageView = ({vm, state}: RegistrationPageVmType): JSX.Element => {
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
            <p>Придумайте логин</p>
            <Input
                disabled={state.isDisabled}
                placeholder={'Логин'}
                type={'text'}
                onChange={event => vm.setUserName(event.target.value)}
            />
            <p>Придумайте пароль</p>
            <Input
                disabled={state.isDisabled}
                placeholder={'Пароль'}
                type={'password'}
                onChange={event => vm.setPasswordName(event.target.value)}
            />
            {
                state.isLoading
                    ? <CircularProgress sx={{marginTop: 2}} variant="plain"/> :
                    <Button
                        disabled={state.isShowRegBtn}
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
                        onClick={() => vm.registration(() => navigate('/'))}>
                        Регистрация
                    </Button>
            }
        </Container>

    </Container>
}