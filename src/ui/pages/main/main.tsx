import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {useNavigate} from "react-router-dom";
import {MainPageVm, MainPageVmInterface} from "./main_vm";

export class MainPage extends Component {
    vm = MainPageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <MainPageView vm={this.vm}/>;
    }
}

const MainPageView = ({vm}: MainPageVmInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (<div>
        asdsadsad
    </div>)
}