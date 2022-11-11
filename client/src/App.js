import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <Router>
                    <Fragment>
                        {/* Once imported you add your component to the app to be rendered */}
                        <Navbar />
                        <div className='container'>
                            <Routes>
                                {/* The below routes lead to a page */}
                                <Route exact path='/' element={<Home />}></Route>
                                <Route exact path='/about' element={<About />}></Route>
                                <Route exact path='/register' element={<Register />}></Route>
                                <Route exact path='/login' element={<Login />}></Route>
                            </Routes>
                        </div>
                    </Fragment>
                </Router>
            </ContactState>
        </AuthState>
    );
};

export default App;
