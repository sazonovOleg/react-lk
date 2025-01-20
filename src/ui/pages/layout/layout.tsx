import React, {PureComponent} from "react";
import {AppbarPageComponent} from "../../common/appbar/appbar";
import {MainPageComponent} from "../main/main";

export class LayoutPageComponent extends PureComponent {
    render() {
        return <div>
            <AppbarPageComponent/>
            <MainPageComponent/>
        </div>
    }
}