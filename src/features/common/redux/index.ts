import {combineReducers, createStore} from "redux";
import {authPageVmReducer} from "../../../ui/pages/auth/auth_vm";
import {registrationPageVmReducer} from "../../../ui/pages/registration/registration_vm";
import {mainPageVmReducer} from "../../../ui/pages/main/main_vm";
import {goodsPageVmReducer} from "../../../ui/pages/goods/goods_vm";
import {appbarReducer} from "../../../ui/common/appbar/appbar_vm";
import {profilePageVmReducer} from "../../../ui/pages/profile/profile_vm";

export const rootReducer = combineReducers({
    authPageVmReducer: authPageVmReducer,
    registrationPageVmReducer: registrationPageVmReducer,
    mainPageVmReducer: mainPageVmReducer,
    goodsPageVmReducer: goodsPageVmReducer,
    appbarReducer: appbarReducer,
    profilePageVmReducer: profilePageVmReducer,
})

function saveToLocalStorage(state: any) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("b2bstateapp", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("b2bstateapp");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const store = createStore(rootReducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()))

export type RootState = ReturnType<typeof rootReducer>;