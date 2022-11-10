import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";

const App = () => {
    return (
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
                        </Routes>
                    </div>
                </Fragment>
            </Router>
        </ContactState>
    );
};

export default App;
