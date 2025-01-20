import React, {PureComponent} from "react";
import {Button, Container, Drawer, IconButton, Typography} from "@mui/joy";
import {AppBar, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppbarVm, AppbarVmType, TAppbarVmState} from "./appbar_vm";
import {useNavigate} from "react-router-dom";

type TAppbarPageComponentProps = {}

export class AppbarPageComponent extends PureComponent<TAppbarPageComponentProps, TAppbarVmState> {
    private vm = new AppbarVm()

    constructor(props: TAppbarPageComponentProps) {
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

        return <AppbarView vm={this.vm} state={this.state}/>
    }
}

const AppbarView = ({vm, state}: AppbarVmType): JSX.Element => {
    let navigate = useNavigate()

    return (
        <AppBar position="relative" sx={{backgroundColor: 'darkslateblue'}}>
            <Container sx={{maxWidth: 1000}}>
                <Toolbar>
                    <IconButton
                        size="lg"
                        aria-label="menu"
                        onClick={vm.showMenu()}
                        sx={{mr: 2, color: 'white'}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        anchor={'top'}
                        open={state.isOpenMenu}
                        onClose={vm.showMenu()}
                    >
                        <Container sx={{maxWidth: 1000, marginTop: 5}}>
                            <ul>
                                <li>1. Menu</li>
                                <li>2. Menu</li>
                                <li>3. Menu</li>
                                <li>4. Menu</li>
                            </ul>
                        </Container>
                    </Drawer>
                    <Typography component="div" sx={{flexGrow: 1, color: 'white'}}>
                        lk-react
                    </Typography>
                    {
                        !state.isLogin
                            ? null
                            : <div>
                                <IconButton
                                    size="lg"
                                    aria-label="menu"
                                    onClick={() => navigate('/profile')}
                                    sx={{mr: 2, color: 'white'}}
                                >
                                    <AccountCircleIcon/>
                                </IconButton>
                                <IconButton
                                    size="lg"
                                    aria-label="menu"
                                    onClick={vm.logout()}
                                    sx={{mr: 2, color: 'white'}}
                                >
                                    <LogoutIcon/>
                                </IconButton>
                            </div>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}