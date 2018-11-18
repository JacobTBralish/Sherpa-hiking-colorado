import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrail, postVisitedTrail, saveForLater} from '../../Redux/reducer';
import LoadingSpinner from '../../LoadingSpinner';
import MapBox from '../MapBox/MapBox';
import Weather from '../Weather/Weather';
import Modal from '../Modal/Modal';
import Reviews from '../Reviews/Reviews';
import trailRatings from '../../Image/trailRatings.png'



import './TrailView.scss';
import ReviewForm from '../ReviewForm/ReviewForm';


class TrailView extends Component {
    state = {
        isLoading: true,
        error: null,
        isModalOpen: false
    }

    componentDidMount() {
        axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${this.props.match.params.id}&key=200356963-c67e8738e2f605aeb5bcc2a5ef5f6375`).then(res => {
            this.props.getTrail(res.data.trails);
            this.setState({ isLoading:false  });
        }).catch(error => {
            console.log(error, 'Error getting trail.')
        })
    }

    
  openModal() {
    this.setState({ isModalOpen: true })
    
  }

closeModal() {
    this.setState({ isModalOpen: false })
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
                            <label id='trailLabelFix' htmlFor='trailDifficulty'>Trail difficulty rating:</label>
                            <div className='trailDifficulty'>{trail.difficulty}
                                <i id='trailRatingQ' className="fas fa-question-circle">
                                    <div className='trailRatingContainer'>
                                        <img src={trailRatings} alt=''></img>
                                    </div>
                                </i>
                            </div>
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
                            <div className='trailsViewButtonCluster'>
                                <button onClick={() => this.openModal()}>See the weather for this week</button>
                            </div>
                        </div>
                    <div className='trailViewLocationContainer'>
                        <label htmlFor='trailViewLocation'> Location:</label>
                        <h3 className='trailViewLocation'>{trail.location}</h3>
                    </div>
                    <div className='trailViewSummaryContainer'>
                        <label htmlFor='trailViewSummary'> Summary:</label>
                        <h3 className='trailViewSummary'>{trail.summary.length ? trail.summary : "It looks like nobody has left a summary on this trail yet!"}</h3>
                        {/* { trail.summary.length > 0 ? '' : <div id='addSummaryButton'><button onClick={() => {}}>Add A Summery</button></div> } */}
                            <div>
                                <h3 className='trailViewSummary'>{trail.high && trail.low ? `The hike has an evelvation that starts at ${trail.low}ft and ends at ${trail.high}ft, which is an elevation change of ${trail.high - trail.low}ft.` : null}</h3>
                            </div>
                        <div className='trailSummarySubContainer'>
                            <div>
                                <label id='trailLabelFix' htmlFor='trailLength'>Length:</label>
                                <h3 className='trailLength'>{`${trail.length} miles`}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    <MapBox lat={trail.latitude} long={trail.longitude} image={trail.imgSqSmall} />
                </>
                <>
                    <ReviewForm />
                    <Reviews trailName={trail.name} image={trail.imgSmallMed} />
                </>
                <>                    
                    <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                        <div>
                            <div>
                                <h1>Weather for {trail.name}</h1>
                            </div>
                            <div className='personalInfoModalContainer'>
                                <Weather lat={trail.latitude} long={trail.longitude} />
                            </div>
                        </div>
                    </Modal>
                
                </>
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