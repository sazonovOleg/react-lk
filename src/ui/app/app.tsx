import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store} from "../../features/common/redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegistrationPageComponent} from "../pages/registration/registration";
import {MainPageComponent} from "../pages/main/main";
import {ProfilePageComponent} from "../pages/profile/profile";
import {LayoutPageComponent} from "../pages/layout/layout";
import {RecoveryPassComponent} from "../pages/recovery_pass/recovery_pass";
import {ChatPageComponent} from "../pages/chat/chat";

class App extends Component {
    render() {
        return <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LayoutPageComponent/>}>
                            <Route index element={<MainPageComponent/>}/>
                            <Route path="/registration" element={<RegistrationPageComponent/>}/>
                            <Route path="/recovery" element={<RecoveryPassComponent/>}/>
                            <Route path="/profile" element={<ProfilePageComponent/>}/>
                            <Route path="/chat" element={<ChatPageComponent/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    }
}

export default App;