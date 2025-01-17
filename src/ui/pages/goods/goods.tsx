import React, {PureComponent} from "react";
import {GoodsPageVm, GoodsPageVmType, TGoodsPageVmState} from "./goods_vm";
import {CircularProgress, Container} from "@mui/joy";
import {useNavigate} from "react-router-dom";

type TGoodsPageComponentProps = {}

export class GoodsPageComponent extends PureComponent<TGoodsPageComponentProps, TGoodsPageVmState> {
    vm = new GoodsPageVm()

    constructor(props: TGoodsPageComponentProps) {
        super(props);
        this.state = this.vm.state()
        this.vm.initState()
    }

    componentDidMount() {
        this.vm.componentDidMount()
    }

    updateComponentOnRender() {
        this.vm.changeStateNotifier.subscribe((value) => {
            if (value) {
                this.setState(value)
            }
        })
    }

    componentWillUnmount() {
        this.vm.componentWillUnmount()
    }

    render() {
        setTimeout(() => {
            this.updateComponentOnRender()
        }, 50)

        return <GoodsPageView vm={this.vm} state={this.state}/>
    }
}

const GoodsPageView = ({vm, state}: GoodsPageVmType): JSX.Element => {
    return <Container
        sx={{
            paddingTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 800,
        }}>
        {
            state.isLoading
                ? <CircularProgress sx={{marginTop: 2}} variant="plain"/>
                : <div>
                    <h2>List {state.listString}</h2>
                    <h3>List length {state.listLength}</h3>
                </div>
        }

    </Container>
}