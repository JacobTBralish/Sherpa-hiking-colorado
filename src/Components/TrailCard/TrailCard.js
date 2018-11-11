import React from 'react';

import '../TrailsGridwall/Trails.scss';

const TrailCard = (props) => {
    console.log('props: ', props);
    return ( 
        <div className='cardContainer'>
            <div className='cardImageContainer'>
                <img className='cardImage' src={props.imgSmallMed} alt=''></img>
            </div>
            <div className='cardInfo'>
                    <p className='cardName'>{props.name}</p>
            </div>
        </div>
     );
}
 
export default TrailCard;