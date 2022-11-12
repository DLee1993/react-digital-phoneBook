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
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/SetAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () => {
    return (
        //info - State tags need to be added based on wether other components depend on them for state 
        //info - i.e. contactState relies on AuthState for authentication purposes
        //info - Authstate is the highest priority as other components depend on the outcome of authstate to show components
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            {/* Once imported you add your component to the app to be rendered */}
                            <Navbar />
                            <div className='container'>
                                <Alerts />
                                <Routes>
                                    {/* The below routes lead to a page */}
                                    <Route path='/' element={<PrivateRoute component={Home} />}/>
                                    <Route exact path='/about' element={<About />}/>
                                    <Route exact path='/register' element={<Register />}/>
                                    <Route exact path='/login' element={<Login />}/>
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
