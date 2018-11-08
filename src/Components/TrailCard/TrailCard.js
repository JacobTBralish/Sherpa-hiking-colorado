import React from 'react';
import placeholder from '../../Image/placeHolder.png'

import '../TrailsGridwall/Trails.scss';

const TrailCard = (props) => {
    console.log('props: ', props);
    return ( 
        <div className='cardContainer'>
        <div className='cardImageContainer'></div>
            <img className='cardImage' src={props.imgSmallMed.length ? props.imgSmallMed : placeholder} alt=''></img>
            <div className='cardInfo'>
                <p className='cardName'>{props.name}</p>

            </div>
        </div>
     );
}
 
export default TrailCard;