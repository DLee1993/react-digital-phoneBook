import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            setAlert(error, "danger");
            clearErrors();
        }
    });

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
            ? setAlert("Please enter all fields", "danger")
            : password !== passwordConfirmation
            ? setAlert("Passwords do not match")
            : register({ name, email, password });
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
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        minLength='6'
                        required
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
                    />
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Register;
