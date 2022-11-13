import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

//info - This is how to create a private route in react
//info - this route can not be accessed if searched in the browser
const PrivateRoute = ({ component: Component }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    //info - this is what is returned if the user is authenticated
    if (isAuthenticated) return <Component />;
    //info - if user is not authenticated then they get redirected to the login page
    return <Navigate to='/login' />;
};

export default PrivateRoute;
