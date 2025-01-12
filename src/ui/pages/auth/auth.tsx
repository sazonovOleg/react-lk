import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {AuthPageVM, AuthPageVMInterface} from "./auth_vm";
import {Button, CircularProgress, Container, Input} from "@mui/joy";
import {useNavigate} from "react-router-dom";

export class AuthPageComponent extends Component {
    vm = AuthPageVM.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <AuthPageView vm={this.vm}/>;
    }
}

const AuthPageView = ({vm}: AuthPageVMInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (
        <Container
            sx={{
                paddingTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 800,
            }}>
            <h2>Авторизация</h2>
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
            </Container>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',

            }}>
                <p>Введите пароль</p>
                <Input
                    disabled={state.isDisabled}
                    placeholder={'Пароль'}
                    type={'password'}
                    onChange={event => vm.setPasswordName(event.target.value)}
                />
            </Container>
            {
                state.isLoading
                    ? <CircularProgress sx={{marginTop: 2}} variant="plain"/>
                    : <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Button
                            sx={{
                                width: 250,
                                marginTop: 3,
                                backgroundColor: 'darkslateblue',
                                opacity: 0.9,
                                transition: '.1s all ease-in',
                                '&:hover': {
                                    bgcolor: 'darkslateblue',
                                    opacity: 1,
                                },
                            }}
                            onClick={() => vm.login()}>
                            Войти
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: 'unset',
                                marginTop: 1,
                                color: 'dimgrey',
                                transition: '.1s all ease-in',
                                '&:hover': {
                                    color: 'black',
                                    bgcolor: 'unset',
                                },
                            }}
                            onClick={() => navigate('/registration')}>
                            Регистрация
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: 'unset',
                                marginTop: 1,
                                color: 'indianred',
                                transition: '.1s all ease-in',
                                '&:hover': {
                                    color: 'red',
                                    bgcolor: 'unset',
                                },
                            }}
                            onClick={() => navigate('/registration')}>
                            Забыли пароль?
                        </Button>
                    </Container>
            }
        </Container>
    )
}