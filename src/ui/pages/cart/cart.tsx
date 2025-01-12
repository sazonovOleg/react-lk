import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../features/common/redux";
import {useNavigate} from "react-router-dom";
import {CartPageVm, CartPageVmInterface} from "./cart_vm";

export class CartPage extends Component {
    vm = CartPageVm.prototype

    componentWillUnmount() {
        this.vm.dispose()
    }

    render() {
        return <CartPageView vm={this.vm}/>;
    }
}

const CartPageView = ({vm}: CartPageVmInterface): JSX.Element => {
    let state = useSelector((state: RootState) => state.authPageVmReducer)
    let navigate = useNavigate()

    return (<div></div>)
}