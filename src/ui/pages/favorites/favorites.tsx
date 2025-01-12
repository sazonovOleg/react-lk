import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {useNavigate} from "react-router-dom";
import {FavoritesPageVm, FavoritesPageVmInterface} from "./favorites_vm";

export class FavoritesPage extends Component {
    vm = FavoritesPageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <FavoritesPageView vm={this.vm}/>;
    }
}

const FavoritesPageView = ({vm}: FavoritesPageVmInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (<div></div>)
}