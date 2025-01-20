import React, {PureComponent} from "react";
import {GoodsPageVm, GoodsPageVmType, TGoodsPageVmState} from "./goods_vm";
import {Card, CardContent, CircularProgress, Container, Typography} from "@mui/joy";
import {CardMedia} from "@mui/material";
import {GoodsModelsType} from "../../../features/goods/models/goods_model";

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
            this.setState(value)
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
        <h2>Товары</h2>
        {
            state.isLoading && state.goods != undefined
                ? <CircularProgress sx={{marginTop: 2}} variant="plain"/>
                : <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                    {state.goods?.map((el, key) => {
                        return <GoodsItemView key={key} id={el.id} name={el.name} img={el.img} price={el.price}/>
                    })}
                </Container>
        }
    </Container>
}

const GoodsItemView = ({...item}: GoodsModelsType): JSX.Element => {
    return <Card sx={{
        maxWidth: 300,
        flex: '0 0 40%',
        width: 1,
        marginBottom: 5,
        marginLeft: 1,
        marginRight: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CardMedia
            sx={{width: 200, height: 200,}}
            image={item.img}
            title="green iguana"
        />
        <CardContent>
            <Typography level={'h4'} component="div" sx={{textAlign: 'center'}}>
                {item.name}
            </Typography>
            <Typography sx={{color: 'text.secondary', textAlign: 'center'}}>
                Description
            </Typography>
            <Typography sx={{color: 'text.secondary', textAlign: 'center'}}>
                Цена: {item.price} руб.
            </Typography>
        </CardContent>
    </Card>
}