import React, { Component } from 'react';
import HomeImage from '../../Image/DaniMaroonBells.jpg'

import './Home.scss';

class Home extends Component {
    render() { 
        return ( 
        <div className='homeContainer'>
            <div className='homeSubContainer'>
            <div className='welcomeMessageContainer'>
                <h1 className='welcomeMessage'>Welcome to Sherpa Hiking Colorado<img className='welcomeMessagePicture' src='https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/flagofColoradoCO.jpg' /></h1>
            </div>
                <div className='imageContainer'>
                    <img className='homeImage' src={HomeImage} alt=''></img>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Home;