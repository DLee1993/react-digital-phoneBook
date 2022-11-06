import React, { useState, useContext } from "react";
import AlertContext from "../../context/Alert/AlertContext";

const Register = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const { name, email, password, passwordConfirmation } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        name === "" || email === "" || password === ""
            ? setAlert("please enter all fields", "danger")
            : password !== passwordConfirmation
            ? setAlert("Passwords do not match", "danger")
            : console.log("Register User");
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                        minLength={6}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='passwordConfirmation'>Confirm Password</label>
                    <input
                        type='password'
                        name='passwordConfirmation'
                        value={passwordConfirmation}
                        onChange={onChange}
                        required
                        minLength={6}
                    />
                </div>
                <input type='submit' value='Register' className='btn btn-primary bnt-block' />
            </form>
        </div>
    );
};

export default Register;
