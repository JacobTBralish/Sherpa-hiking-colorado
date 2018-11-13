import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrail, postVisitedTrail, saveForLater} from '../../Redux/reducer';
import LoadingSpinner from '../../LoadingSpinner';
import MapBox from '../MapBox/MapBox';

import '../TrailsGridwall/Trails.scss';


class TrailView extends Component {
    state = {
        isLoading: true,
        error: null,
    }

    componentDidMount() {
        axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
            this.props.getTrail(res.data.trails);
            this.setState({ isLoading:false  });
        }).catch(error => {
            console.log(error, 'Error getting trail.')
        })
    }
    render() { 
        let { chosenTrail, user } = this.props;
        console.log('user: ', user);
        let { isLoading, error } = this.state;
        // console.log('this thing', chosenTrail.longitude);
        
        let mappedChosenTrail = chosenTrail.map((trail, i) => {
            console.log('trail: ', trail);
            return <div key={i} className='trailViewContainer'>
                    <div className='trailViewImageContainer'>
                        <img className='trailViewImage' src={trail.imgMedium} alt=''></img>
                    </div>
                    <div className='trailViewInfo'>
                    <div className='trailViewNameContainer'>
                        <h1 className='trailViewName'>{trail.name}</h1>
                        {!user ?
                        <div className='trailsViewButtonCluster'>
                            <button onClick={() => alert('You must be logged in to add this to your visited list!')}>Visited</button>
                            <button onClick={() => alert('You must be logged in to save this for later!')}>Save for later</button>
                        </div>
                            :
                        <div className='trailsViewButtonCluster'>
                            <button onClick={() => this.props.postVisitedTrail(user.id, trail.id, trail.name, trail.imgMedium, trail.location, trail.difficulty)}>Visited</button>
                            <button onClick={() => this.props.saveForLater(user.id, trail.id, trail.name, trail.imgMedium, trail.location, trail.difficulty)}>Save for later</button>
                        </div>
                        }
                    </div>
                    <div className='trailViewLocationContainer'>
                        <label htmlFor='trailViewLocation'> Location:</label>
                        <h3 className='trailViewLocation'>{trail.location}</h3>
                    </div>
                    <div className='trailViewSummaryContainer'>
                        <label htmlFor='trailViewSummary'> Summary:</label>
                        <h3 className='trailViewSummary'>{trail.summary.length ? trail.summary : "It looks like nobody has left a review on this trail yet! Would you be the first to share your experience?"}</h3>
                        { trail.summary.length > 0 ? '' : <div><button onClick={() => {}}>Add A Summery</button></div> }
                    </div>
                </div>
                <div className='mapBoxContainer'>
                    <MapBox lat={trail.latitude} long={trail.longitude} />
                </div>
            </div>
        })
        return ( 
        <div>
            <>
                {error
                ?
                <div> Oh no!There was an error loading the trails.Please try again later. </div>
                    : (isLoading || !chosenTrail.length) ?
                    <LoadingSpinner />
                    : mappedChosenTrail
                    } 
            </>
                
        </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        chosenTrail: state.chosenTrail,
        user: state.user,
    }
} 

const mapDispatchToProps = {
    getTrail,
    postVisitedTrail,
    saveForLater
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailView);