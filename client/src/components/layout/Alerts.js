import React, { useContext } from "react";
import AlertContext from "../../context/Alert/AlertContext";

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle' style={{ marginRight: "10px" }}></i>
                {alert.msg}
            </div>
        ))
    );
};

export default Alerts;
