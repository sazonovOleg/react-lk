import React, {PureComponent} from "react";
import {ProfilePageVm, ProfilePageVmType, TProfilePageVmState} from "./profile_vm";
import {CircularProgress, Container} from "@mui/joy";

type TMainPageComponentProps = {}

export class ProfilePageComponent extends PureComponent<TMainPageComponentProps, TProfilePageVmState> {
    private vm = new ProfilePageVm()

    constructor(props: TMainPageComponentProps) {
        super(props);
        this.state = this.vm.state()
        this.vm.initState()
    }

    componentDidMount() {
        this.vm.componentDidMount()
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
    return state.isLoading
        ? <CircularProgress sx={{marginTop: 2}} variant="plain"/>
        : <Container sx={{display: 'flex', flexDirection: 'column', width: 1000,}}>
            <p>Имя пользователя: {state.user?.name}</p>
            <p style={{textWrap: 'wrap', maxWidth: 400}}>Ваш токен {state.user?.token}</p>
        </Container>
}