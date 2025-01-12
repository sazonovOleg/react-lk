import React, {Component} from "react";
import {RegistrationPageVm, RegistrationPageVmInterface} from "./registration_vm";
import {Button, Container, IconButton, Input} from "@mui/joy";
import {useNavigate} from "react-router-dom";

export class RegistrationPageComponent extends Component {
    vm = RegistrationPageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <AuthPageView vm={this.vm}/>;
    }
}

const AuthPageView = ({vm}: RegistrationPageVmInterface): JSX.Element => {
    let navigate = useNavigate()

    return <Container
        sx={{
            paddingTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 800,
        }}>

        <Container sx={{ position:'relative', textAlign: 'center'}}>
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
            <p>Ваш логин</p>
            <Input
                disabled={false}
                placeholder={'Логин'}
                type={'text'}
            />
            <p>Ваша почта</p>
            <Input
                disabled={false}
                placeholder={'Почта'}
                type={'text'}
            />
            <p>Ваш пароль</p>
            <Input
                disabled={false}
                placeholder={'Пароль'}
                type={'password'}
            />

            <Button
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
                onClick={() => vm.registration()}>
                Регистрация
            </Button>
        </Container>

    </Container>
}