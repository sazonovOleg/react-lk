import React, {Component} from 'react';
import {Provider} from "react-redux";
import {store} from "../../features/common/redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegistrationPageComponent} from "../pages/registration/registration";
import {MainPageComponent} from "../pages/main/main";

class App extends Component {
    render() {
        return <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPageComponent/>}/>
                        <Route path="/registration" element={<RegistrationPageComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    }
}

export default App;