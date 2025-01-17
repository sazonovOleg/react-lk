import React, {PureComponent} from "react";
import {MainPageVm, TMainPageVmState} from "./main_vm";
import {GoodsPageComponent} from "../goods/goods";
import {AuthPageComponent} from "../auth/auth";

type TMainPageComponentProps = {}

export class MainPageComponent extends PureComponent<TMainPageComponentProps, TMainPageVmState> {
    private vm = new MainPageVm()

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

        return <div>
            {
                this.state.isLogin
                    ? <GoodsPageComponent/>
                    : <AuthPageComponent/>
            }
        </div>
    }
}