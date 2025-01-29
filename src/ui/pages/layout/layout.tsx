import React, {PureComponent} from "react";
import {AppbarPageComponent} from "../../common/appbar/appbar";
import {Outlet} from "react-router-dom";

export class LayoutPageComponent extends PureComponent {
    render() {
        return <div>
            <AppbarPageComponent/>
            <Outlet/>
        </div>
    }
}