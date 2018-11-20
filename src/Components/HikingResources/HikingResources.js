import React, { Component } from 'react';
import './HikingResources.scss';

class HikingResources extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            randomTrails: []
         }
    }
    render() { 
        return ( 
            <div className='articleContainer'>
                <div className='resourcesTitleContainer'>
                    <h1 className='resourcesTitle'>Useful Hiking Resources</h1>
                </div>
                <div className='articleLinkContainer'>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-tips/'><div>Fundimentals</div></a>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-gear/'><div>Hiking Gear</div></a>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-clothing/'><div>Hiking Clothing</div></a>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-with-kids/'><div>Hiking with Kids</div></a>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-with-dogs/'><div>Hiking with Dogs</div></a>
                    <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/womens-hiking/'><div>Women's Hiking</div></a>
                </div>
            </div>
         );
    }
}
 
export default HikingResources;