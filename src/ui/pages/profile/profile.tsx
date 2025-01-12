import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {useNavigate} from "react-router-dom";
import {ProfilePageVm, ProfilePageVmInterface} from "./profile_vm";

export class ProfilePage extends Component {
    vm = ProfilePageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <ProfilePageView vm={this.vm}/>;
    }
}

const ProfilePageView = ({vm}: ProfilePageVmInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (<div>
        asdsadsad
    </div>)
}