import React from 'react';
import './Spinner.scss';


const LoadingSpinner = () => {
    return ( 
        <div className="spinner">
            <div className="spinner-text">Getting Trails</div>
            <div className="spinner-sector spinner-sector-red"></div>
            <div className="spinner-sector spinner-sector-blue"></div>
            <div className="spinner-sector spinner-sector-green"></div>
      </div>
     );
}
 
export default LoadingSpinner;