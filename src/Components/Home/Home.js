import React, { Component } from 'react';
import HomeImage from '../../Image/DaniMaroonBells.jpg'
import MobileHomeImage from '../../Image/HangingLake.jpg'

import './Home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isDesktop: false 
          };
      
          this.updatePredicate = this.updatePredicate.bind(this);
        }
        componentDidMount() {
          this.updatePredicate();
          window.addEventListener("resize", this.updatePredicate);
          window.scrollTo(0,0);
        }
      
        componentWillUnmount() {
          window.removeEventListener("resize", this.updatePredicate);
        }
      
        updatePredicate = () => {
          this.setState({ isDesktop: window.innerWidth > 500 });
        }
    
    render() { 
        const isDesktop = this.state.isDesktop;

        return ( 
        <div className='homeContainer'>
            <div className='homeSubContainer'>
            <div className='welcomeMessageContainer'>
                <h1 className='welcomeMessage'>Welcome to Sherpa Hiking Colorado<img className='welcomeMessagePicture' src='https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/flagofColoradoCO.jpg' /></h1>
            </div>
                <div className='imageContainer'>
                {isDesktop ? (
                    <img className='homeImage' src={HomeImage} alt={HomeImage}></img>
                ) : (
                    <img className='homeImage' src={MobileHomeImage} alt={MobileHomeImage}></img>
                )}
                </div>
            </div>
        </div>
         );
    }
}
 
export default Home;