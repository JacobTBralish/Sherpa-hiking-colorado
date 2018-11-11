import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrail } from '../../Redux/reducer';

import '../TrailsGridwall/Trails.scss';

class TrailView extends Component {
    componentDidMount() {
        axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
            this.props.getTrail(res.data.trails);
        }).catch(error => {
            console.log(error, 'Error getting trail.')
        })
    }
    render() { 
        let { chosenTrail } = this.props;

        let mappedChosenTrail = chosenTrail.map((trail, i) => {
            console.log('trail: ', trail);
            return <div className='trailViewContainer'>
                    <div className='trailViewImageContainer'>
                        <img className='trailViewImage' src={trail.imgMedium} alt=''></img>
                    </div>
                    <div className='trailViewInfo'>
                    <div className='trailViewNameContainer'>
                        <h1 className='trailViewName'>{trail.name}</h1>
                    </div>
                    <div className='trailViewLocationContainer'>
                        <label for='trailViewLocation'> Location:</label>
                        <h3 className='trailViewLocation'>{trail.location}</h3>
                    </div>
                    <div className='trailViewSummaryContainer'>
                        <label for='trailViewSummary'> Summary:</label>
                        <h3 className='trailViewSummary'>{trail.summary.length ? trail.summary : "It looks like nobody has left a review on this trail yet! Would you be the first to share your experience?"}</h3>
                    </div>
                </div>
                <div>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>----------------------SPOT FOR MAPBOX-----------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>
                <h1>-----------------------------------------------------------</h1>

                </div>
            </div>
        })
        return ( 
        <div>
            {mappedChosenTrail}
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        chosenTrail: state.chosenTrail,
    }
} 

const mapDispatchToProps = {
    getTrail
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailView);