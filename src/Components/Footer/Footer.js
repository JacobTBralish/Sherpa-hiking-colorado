import React from 'react';
import './Footer.scss';

const Footer = () => {
    return ( 
        <div className='footerContainer'>
            <div className='footerSubContainer'>
                <h1 className='copyRight'>Copyright Jacob Bralish, 2018</h1>
                <h1 className='portfolioLink'><a href='https://www.JacobBralish.com'>Visit my personal porfolio here</a></h1>
            </div>
        </div>
     );
}
 
export default Footer;