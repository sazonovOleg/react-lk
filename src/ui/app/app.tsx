import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store} from "../../features/common/redux";
import {AuthPageComponent} from "../pages/auth/auth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegistrationPageComponent} from "../pages/registration/registration";

class App extends Component {
    render() {
        return <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AuthPageComponent/>}/>
                        <Route path="/registration" element={<RegistrationPageComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    }
}

export default App;
