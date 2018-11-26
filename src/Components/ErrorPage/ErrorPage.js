import React from 'react';

import './ErrorPage.scss'

const ErrorPage = () => {
    return ( 
        <div className='errorMessageContainer'>
            <div className='errorMessageSubContainer'>
                <h1 className='errorMessage'>Oops! It looks like theres nothing here to see! Would you like to view <a href='/all trails'>trails</a>?</h1>
            </div>
        </div>
     );
}
 
export default ErrorPage;