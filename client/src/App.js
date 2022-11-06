import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/Auth/AuthState";
import AlertState from "./context/Alert/AlertState";
import Alerts from "./components/layout/Alerts";
import "./App.css";

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className='container'>
                                <Alerts />
                                <Routes>
                                    <Route exact path='/' element={<Home />}></Route>
                                    <Route exact path='/about' element={<About />}></Route>
                                    <Route exact path='/register' element={<Register />}></Route>
                                    <Route exact path='/login' element={<Login />}></Route>
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
};

export default App;
