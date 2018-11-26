import React from 'react';
import './Spinner.scss';


const LoadingSpinner = () => {
    return ( 
        <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
        </div>
     );
}
 
export default LoadingSpinner;