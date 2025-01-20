import React, {PureComponent} from "react";
import {ProfilePageVm, ProfilePageVmType, TProfilePageVmState} from "./profile_vm";
import {Container} from "@mui/joy";

type TMainPageComponentProps = {}

export class ProfilePageComponent extends PureComponent<TMainPageComponentProps, TProfilePageVmState> {
    private vm = new ProfilePageVm()

    constructor(props: TMainPageComponentProps) {
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

const ProfilePageView = ({vm, state}: ProfilePageVmType): JSX.Element => {
    return <Container>
        <p>Имя пользователя: {state.user.name}</p>
        <p>Ваш токен {state.user.token}</p>
    </Container>
}