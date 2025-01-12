import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {useNavigate} from "react-router-dom";
import {GoodsPageVm, GoodsPageVmInterface} from "./goods_vm";

export class GoodsPage extends Component {
    vm = GoodsPageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <GoodsPageView vm={this.vm}/>;
    }
}

const GoodsPageView = ({vm}: GoodsPageVmInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (<div>

    </div>)
}